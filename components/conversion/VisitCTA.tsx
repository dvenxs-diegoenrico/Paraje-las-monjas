import { ButtonA } from '@/components/base/Button';
import { Eyebrow } from '@/components/base/Typography';
import { Valance } from '@/components/base/Valance';
import { Reveal } from '@/components/motion/Reveal';
import { InquiryForm } from '@/components/conversion/InquiryForm';
import type { Locale } from '@/lib/i18n';
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site';
import type { Content } from '@/content';

/** Private visit invitation + inquiry form, on fronda. */
export function VisitCTA({ locale, c, id = 'visita-privada' }: { locale: Locale; c: Content; id?: string }) {
  const v = c.visit;
  return (
    <section id={id} className="on-dark relative bg-fronda py-28 text-cal lg:py-40" aria-labelledby={`${id}-title`}>
      <Valance color="var(--fronda)" />
      <div className="bricks pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="container-lux grid-lux relative gap-y-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <Reveal>
            <Eyebrow tone="cantera">{v.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <p id={`${id}-title`} className="t-display mt-6 italic">
              {v.title}
            </p>
          </Reveal>
          <Reveal delay={0.2} as="p" className="mt-8 text-cal/85">
            {v.body}
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="t-data mt-8 flex flex-col gap-2 text-cal/90">
              {v.slots.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-6 bg-cantera/60" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonA href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener" tone="cal" dot={false}>
                {v.whatsappCta}
              </ButtonA>
              <p className="t-caption mt-3 text-cal/70">{WHATSAPP_DISPLAY}</p>
            </div>
          </Reveal>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
          <p className="t-caption mb-6 text-cantera">{v.or}</p>
          <InquiryForm locale={locale} c={c.form} turnstileSiteKey={process.env.TURNSTILE_SITE_KEY} />
        </div>
      </div>
    </section>
  );
}
