import { formatPrice, priceFrom, type Content } from '@/content';

type Offer = Content['offers']['items'][number];

/** Offer with its documented price; inclusions behind a native disclosure. */
export function OfferCard({ offer, c, open = false, anchor, surface = 'claro' }: { offer: Offer; c: Content; open?: boolean; anchor?: boolean; surface?: 'claro' | 'cal' }) {
  const min = Math.min(...offer.variants.map((v) => v.price));
  const shared = 'sharedIncludes' in offer ? offer.sharedIncludes : undefined;
  return (
    <article className={`relative scroll-mt-24 p-6 md:p-8 ${surface === 'cal' ? 'bg-cal' : 'bg-cal-claro'}`} id={anchor ? `paquete-${offer.id}` : undefined}>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="font-serif text-[30px] leading-tight lg:text-[36px]">{offer.name}</h3>
        <p className="t-data text-tabique">{priceFrom(c, min)}</p>
      </div>
      <p className="mt-3 text-piedra/85">{offer.tagline}</p>
      <ul className="mt-6 divide-y divide-cantera/40 border-y border-cantera/40">
        {offer.variants.map((v) => (
          <li key={v.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-4">
            <span className="font-sans font-semibold">{v.name}</span>
            <span className="t-data whitespace-nowrap">
              {formatPrice(v.price)} <span className="text-piedra/70">{c.perGuest}</span>
            </span>
            <span className="t-caption col-span-2 mt-1 text-piedra/70">{v.detail}</span>
          </li>
        ))}
      </ul>
      <p className="t-caption mt-4 text-piedra/70">
        {offer.terms} · {c.pricesNote}
      </p>
      <details className="group mt-6" open={open}>
        <summary className="t-nav flex min-h-[44px] cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="relative h-3 w-3">
            <span className="absolute left-0 top-1/2 h-px w-3 bg-piedra" />
            <span className="absolute left-1/2 top-0 h-3 w-px bg-piedra transition-transform duration-500 group-open:scale-y-0" />
          </span>
          <span className="link-grow">{c.celebraciones.seeOffer}</span>
        </summary>
        <div className="pt-4">
          {offer.variants
            .filter((v) => v.includes.length)
            .map((v) => (
              <div key={v.name} className="mt-4">
                {offer.variants.length > 1 && <p className="t-caption text-tabique">{v.name}</p>}
                <ul className="mt-2 grid gap-x-8 gap-y-1 md:grid-cols-2">
                  {v.includes.map((it) => (
                    <li key={it} className="flex gap-3 text-[15px] leading-snug">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-tabique" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          {shared && (
            <ul className="mt-2 grid gap-x-8 gap-y-1 md:grid-cols-2">
              {shared.map((it) => (
                <li key={it} className="flex gap-3 text-[15px] leading-snug">
                  <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-tabique" />
                  {it}
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>
    </article>
  );
}
