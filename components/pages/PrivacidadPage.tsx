import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';

export function PrivacidadPage({ locale }: { locale: Locale }) {
  const c = getContent(locale).privacidad;
  return (
    <section className="bg-cal pb-28 pt-[calc(var(--header-h)+64px)] lg:pb-40">
      <div className="container-lux grid-lux">
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-3">
          <h1 className="t-display">{c.title}</h1>
          <p className="t-caption mt-6 text-tabique">{c.updated}</p>
          {c.sections.map((s) => (
            <div key={s.h} className="mt-12 border-t border-cantera/40 pt-6">
              <h2 className="t-h3">{s.h}</h2>
              <p className="measure mt-3 text-piedra/85">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
