import { ButtonA } from '@/components/base/Button';
import { Eyebrow } from '@/components/base/Typography';
import { PageHero } from '@/components/content/PageHero';
import { HowItWorks } from '@/components/content/Graphics';
import { Icon } from '@/components/base/Icon';
import { InquiryForm } from '@/components/conversion/InquiryForm';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { images } from '@/lib/images';
import { FACEBOOK_NAME, FACEBOOK_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/lib/site';

export function VisitaPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.visitaPage;
  return (
    <>
      <PageHero locale={locale} eyebrow={p.eyebrow} title={p.title} intro={p.intro} backWord={locale === 'es' ? 'visita' : 'visit'} photo={images.arboladoFuente} />
      <section className="bg-cal pb-24" aria-labelledby="como-visita">
        <div className="container-lux">
          <h2 id="como-visita" className="t-eyebrow mb-12 text-tabique">
            {c.howItWorks.eyebrow}
          </h2>
          <HowItWorks c={c.howItWorks} />
        </div>
      </section>
      <section className="on-dark grain relative overflow-hidden bg-fronda py-24 text-cal lg:py-32" aria-label={c.form.title}>
        <div className="bricks pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="container-lux grid-lux relative gap-y-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <InquiryForm locale={locale} c={c.form} turnstileSiteKey={process.env.TURNSTILE_SITE_KEY} />
          </div>
          <aside className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <Eyebrow tone="cantera">{c.visit.eyebrow}</Eyebrow>
            <p className="mt-6 text-cal/85">{c.visit.body}</p>
            <div className="mt-8">
              <ButtonA href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener" tone="cal" icon="chat">
                {c.visit.whatsappCta}
              </ButtonA>
            </div>
          </aside>
        </div>
      </section>
      <section className="relative bg-cal py-24 lg:py-32" aria-labelledby="contacto">
        <div className="container-lux grid-lux gap-y-12">
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <h2 id="contacto" className="t-h2">
              {p.contactTitle}
            </h2>
            <dl className="mt-10">
              {[
                [p.addressLabel, p.address],
                [p.hoursLabel, p.hours],
                ['WhatsApp', WHATSAPP_DISPLAY],
                ['Instagram', INSTAGRAM_HANDLE],
                ['Facebook', FACEBOOK_NAME],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-t border-cantera/40 py-4">
                  <dt className="t-data text-tabique">{k}</dt>
                  <dd className="t-data">
                    {k === 'WhatsApp' ? (
                      <a className="link-grow" href={whatsappLink(c.whatsappMessage)} target="_blank" rel="noopener">
                        {v}
                      </a>
                    ) : k === 'Instagram' ? (
                      <a className="link-grow" href={INSTAGRAM_URL} target="_blank" rel="noopener">
                        {v}
                      </a>
                    ) : k === 'Facebook' ? (
                      <a className="link-grow" href={FACEBOOK_URL} target="_blank" rel="noopener">
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7">
            <div className="bricks relative grid aspect-[4/3] place-items-center bg-cal-claro p-8 text-center" style={{ backgroundBlendMode: 'multiply' }}>
              <div>
                <span className="live mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-cal text-tabique">
                  <Icon name="pin" size={32} />
                </span>
                <p className="t-eyebrow text-tabique">{p.mapTitle}</p>
                <p className="measure mt-4 text-piedra/80">{p.mapPlaceholder}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
