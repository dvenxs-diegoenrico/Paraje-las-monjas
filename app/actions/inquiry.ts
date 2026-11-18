'use server';

import { headers } from 'next/headers';
import { inquirySchema, type FieldErrorKey, type InquiryState } from '@/lib/validators';

/* ------------------------------------------------------------------
   Rate limit: 5 submissions per IP per 10 minutes. In-memory per server
   instance — good enough against casual abuse on Vercel functions; move to
   Upstash/Vercel KV if spam becomes a problem.
   ------------------------------------------------------------------ */
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

async function verifyTurnstile(token: string | null, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: honeypot + rate limit only
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      cache: 'no-store',
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const raw = Object.fromEntries(['locale', 'name', 'email', 'phone', 'type', 'guests', 'date', 'visit', 'message'].map((k) => [k, String(formData.get(k) ?? '')]));

  // honeypot: humans never see or fill this field
  if (String(formData.get('company') ?? '').trim() !== '') return { status: 'success' };

  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || h.get('x-real-ip') || 'unknown';
  if (limited(ip)) return { status: 'error', formError: 'rate', values: raw };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: InquiryState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const key = (issue.path[0] === 'contact' ? 'contact' : issue.path[0]) as FieldErrorKey;
      if (key && !errors[key]) errors[key] = (['name', 'contact', 'email', 'phone', 'date', 'guests'].includes(issue.message) ? issue.message : key) as FieldErrorKey;
    }
    return { status: 'error', errors, values: raw };
  }

  if (!(await verifyTurnstile(formData.get('cf-turnstile-response') as string | null, ip))) {
    return { status: 'error', formError: 'captcha', values: raw };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!key || !to || !from) {
    console.error('[inquiry] RESEND_API_KEY / INQUIRY_TO_EMAIL / INQUIRY_FROM_EMAIL not configured');
    return { status: 'error', formError: 'unavailable', values: raw };
  }

  const d = parsed.data;
  const rows: [string, string][] = [
    ['Nombre', d.name],
    ['Correo', d.email || '—'],
    ['Teléfono / WhatsApp', d.phone || '—'],
    ['Tipo de celebración', d.type ?? '—'],
    ['Invitados aproximados', d.guests === '' ? '—' : String(d.guests)],
    ['Fecha tentativa', d.date],
    ['Preferencia de visita', d.visit ?? '—'],
    ['Idioma del sitio', d.locale],
    ['Mensaje', d.message || '—'],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#9A4F35;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()),
        reply_to: d.email || undefined,
        subject: `Nueva solicitud · ${d.name} · ${d.date}`,
        text,
        html,
      }),
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[inquiry] resend error', res.status, await res.text().catch(() => ''));
      return { status: 'error', formError: 'generic', values: raw };
    }
  } catch (e) {
    console.error('[inquiry] network error', e);
    return { status: 'error', formError: 'generic', values: raw };
  }
  return { status: 'success' };
}
