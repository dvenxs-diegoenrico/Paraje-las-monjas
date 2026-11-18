import { ButtonA } from '@/components/base/Button';
import { Eyebrow } from '@/components/base/Typography';
import { Valance } from '@/components/base/Valance';
import { Icon } from '@/components/base/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { InquiryForm } from '@/components/conversion/InquiryForm';
import type { Locale } from '@/lib/i18n';
import { WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site';
import type { Content } from '@/content';

/** Private visit invitation + inquiry form, on fronda. */
export function VisitCTA({ locale, c, id = 'visita-privada' }: { locale: Locale; c: Content; id?: string }) {
  const v = c.visit;
  return (
    <section id={id} className="on-dark grain relative overflow-hidden bg-fronda py-28 text-cal lg:py-40" aria-labelledby={`${id}-title`}>
      <Valance color="var(--fronda)" />
      <div className="bricks pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="container-lux grid-lux relative gap-y-16">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <Reveal>
            <Eyebrow tone="cantera" icon="calendario">{v.eyebrow}</Eyebrow>
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
            <ul data-observe="" className="stagger t-data mt-8 grid grid-cols-2 gap-3 text-cal/90">
              {v.slots.map((s, i) => (
                <li key={s} className="group flex flex-col gap-3 border border-cal/20 p-4">
                  <Icon name={i === 0 ? 'calendario' : 'amanecer'} size={28} className="text-cantera" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonA href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener" tone="cal" icon="chat">
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
