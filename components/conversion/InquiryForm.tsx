'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useActionState, useEffect, useId, useRef, type ReactNode } from 'react';
import { submitInquiry } from '@/app/actions/inquiry';
import { Button } from '@/components/base/Button';
import type { Content } from '@/content';
import type { InquiryState } from '@/lib/validators';
import { href, type Locale } from '@/lib/i18n';

const initial: InquiryState = { status: 'idle' };

/** Invitation-toned inquiry form. Server Action → Resend. Saves nothing client-side. */
export function InquiryForm({ locale, c, turnstileSiteKey, tone = 'dark' }: { locale: Locale; c: Content['form']; turnstileSiteKey?: string; tone?: 'dark' | 'light' }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const uid = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const v = state.values ?? {};
  const err = state.errors ?? {};
  const onDark = tone === 'dark';

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset();
    if (state.status === 'error' && state.errors) {
      const first = Object.keys(state.errors)[0];
      const target = first === 'contact' ? 'email' : first;
      formRef.current?.querySelector<HTMLElement>(`[name="${target}"]`)?.focus();
    } else if (state.status !== 'idle') {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="py-16 outline-none">
        <span aria-hidden="true" className="block h-2 w-2 rounded-full bg-catarina" />
        <p className="mt-6 font-serif text-[36px] font-light italic leading-tight lg:text-[48px]">{c.success}</p>
      </div>
    );
  }

  const msg = (k?: string) => (k ? (c.errors as Record<string, string>)[k] : undefined);
  const ink = onDark ? 'text-cal' : 'text-piedra';

  return (
    <form ref={formRef} action={action} noValidate className={`${ink}`} aria-describedby={`${uid}-intro`}>
      <h2 className="t-h2">{c.title}</h2>
      <p id={`${uid}-intro`} className={`mt-4 ${onDark ? 'text-cal/80' : 'text-piedra/80'}`}>
        {c.intro}
      </p>

      <input type="hidden" name="locale" value={locale} />
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-8 md:grid-cols-2">
        <Field id={`${uid}-name`} label={c.name} required error={msg(err.name)} dark={onDark}>
          <input id={`${uid}-name`} name="name" autoComplete="name" required defaultValue={v.name} aria-invalid={!!err.name} aria-describedby={err.name ? `${uid}-name-err` : undefined} placeholder=" " className={inputCls(onDark)} />
        </Field>
        <Field id={`${uid}-date`} label={c.date} required error={msg(err.date)} dark={onDark} float={false}>
          <input id={`${uid}-date`} name="date" type="date" required defaultValue={v.date} aria-invalid={!!err.date} aria-describedby={err.date ? `${uid}-date-err` : undefined} className={inputCls(onDark)} />
        </Field>
        <Field id={`${uid}-email`} label={c.email} error={msg(err.email) ?? msg(err.contact)} dark={onDark} hint={c.contactHint}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={v.email}
            aria-invalid={!!(err.email || err.contact)}
            aria-describedby={`${uid}-email-hint${err.email || err.contact ? ` ${uid}-email-err` : ''}`}
            placeholder=" "
            className={inputCls(onDark)}
          />
        </Field>
        <Field id={`${uid}-phone`} label={c.phone} error={msg(err.phone)} dark={onDark}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            defaultValue={v.phone}
            aria-invalid={!!(err.phone || err.contact)}
            aria-describedby={err.phone ? `${uid}-phone-err` : `${uid}-email-hint`}
            placeholder=" "
            className={inputCls(onDark)}
          />
        </Field>
        <Field id={`${uid}-type`} label={c.type} dark={onDark} float={false}>
          <select id={`${uid}-type`} name="type" defaultValue={v.type ?? ''} className={`${inputCls(onDark)} appearance-none`}>
            <option value="" disabled>
              —
            </option>
            {c.types.map(([val, label]) => (
              <option key={val} value={val} className="text-piedra">
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${uid}-guests`} label={c.guests} error={msg(err.guests)} dark={onDark}>
          <input id={`${uid}-guests`} name="guests" type="number" min={1} max={2000} inputMode="numeric" defaultValue={v.guests} aria-invalid={!!err.guests} aria-describedby={err.guests ? `${uid}-guests-err` : undefined} placeholder=" " className={inputCls(onDark)} />
        </Field>
        <fieldset className="md:col-span-2">
          <legend className={`t-caption ${onDark ? 'text-cantera' : 'text-tabique'}`}>{c.visit}</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {c.visits.map(([val, label]) => (
              <label key={val} className="relative inline-flex min-h-[44px] cursor-pointer items-center">
                <input type="radio" name="visit" value={val} defaultChecked={v.visit === val} className="peer absolute opacity-0" />
                <span
                  className={`shadow-lux transition-shadow duration-700 hover:shadow-lux-lg inline-flex h-[44px] items-center gap-2 px-6 text-[14px] transition-colors duration-500 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ${
                    onDark ? 'bg-cal/10 peer-checked:bg-cal peer-checked:text-piedra peer-focus-visible:outline-cantera' : 'bg-cantera/30 peer-checked:bg-piedra peer-checked:text-cal peer-focus-visible:outline-tabique'
                  }`}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <Field id={`${uid}-message`} label={c.message} dark={onDark} className="md:col-span-2">
          <textarea id={`${uid}-message`} name="message" rows={3} defaultValue={v.message} placeholder=" " className={`${inputCls(onDark)} resize-y`} />
        </Field>
      </div>

      {turnstileSiteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile mt-8" data-sitekey={turnstileSiteKey} data-theme={onDark ? 'dark' : 'light'} data-language={locale} />
        </>
      )}

      <div ref={statusRef} tabIndex={-1} aria-live="polite" role="status" className="mt-6 min-h-[1.5em] outline-none">
        {state.formError && <p className={onDark ? 'text-cal' : 'text-tabique'}>⚠ {msg(state.formError)}</p>}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <Button type="submit" tone={onDark ? 'cal' : 'piedra'} disabled={pending} aria-disabled={pending} icon="sobre">
          {pending ? c.sending : c.submit}
        </Button>
        <p className={`t-caption max-w-[34ch] ${onDark ? 'text-cal/70' : 'text-piedra/70'}`}>
          <Link href={href(locale, 'privacidad')} className="link-grow">
            {c.privacy}
          </Link>
        </p>
      </div>
    </form>
  );
}

const inputCls = (dark: boolean) =>
  `peer block w-full rounded-none border-0 border-b bg-transparent px-0 pb-2 pt-6 text-[17px] outline-none transition-colors duration-500 focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-4 ${
    dark ? 'border-cal/40 text-cal focus:border-cal focus-visible:outline-cantera [color-scheme:dark]' : 'border-piedra/40 text-piedra focus:border-piedra focus-visible:outline-tabique'
  } aria-[invalid=true]:border-catarina`;

function Field({
  id,
  label,
  required,
  error,
  hint,
  dark,
  float = true,
  className = '',
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  dark: boolean;
  float?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const base = dark ? 'text-cal/70' : 'text-piedra/70';
  return (
    <div className={`relative ${className}`}>
      {children}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 top-0 origin-left transition-all duration-500 ease-lux ${base} ${
          float ? 'translate-y-6 text-[17px] peer-focus:translate-y-0 peer-focus:text-[12px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[12px]' : 'text-[12px]'
        }`}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-tabique">
            {' '}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className={`t-caption mt-2 ${base}`}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className={`t-caption mt-2 ${dark ? 'text-cal' : 'text-catarina'}`}>
          <span aria-hidden="true">● </span>
          {error}
        </p>
      )}
    </div>
  );
}
