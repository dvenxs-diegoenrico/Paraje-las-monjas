import { formatPrice, priceFrom, type Content } from '@/content';
import { Icon, type IconName } from '@/components/base/Icon';
import { IconList, iconFor } from '@/components/content/Graphics';

const OFFER_ICON: Record<string, IconName> = { 'renta-del-jardin': 'arbol', 'jardin-servido': 'plato', 'mesa-larga-ironico': 'mezcal', 'bodas-intimas': 'brindis', jornadas: 'cafe' };

type Offer = Content['offers']['items'][number];

/** Offer with its documented price; inclusions behind a native disclosure. */
export function OfferCard({ offer, c, open = false, anchor, surface = 'claro' }: { offer: Offer; c: Content; open?: boolean; anchor?: boolean; surface?: 'claro' | 'cal' }) {
  const min = Math.min(...offer.variants.map((v) => v.price));
  const shared = 'sharedIncludes' in offer ? offer.sharedIncludes : undefined;
  return (
    <article className={`relative scroll-mt-24 p-6 md:p-8 ${surface === 'cal' ? 'bg-cal' : 'bg-cal-claro'}`} id={anchor ? `paquete-${offer.id}` : undefined}>
      <div className="group flex flex-wrap items-center justify-between gap-4">
        <h3 className="flex items-center gap-4 font-serif text-[30px] leading-tight lg:text-[36px]">
          <span className="live grid h-12 w-12 shrink-0 place-items-center rounded-full bg-fronda text-cal">
            <Icon name={OFFER_ICON[offer.id] ?? 'hoja'} size={26} />
          </span>
          {offer.name}
        </h3>
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
      {/* at-a-glance: what the package brings, as icons */}
      <ul aria-hidden="true" data-observe="" className="stagger mt-5 flex flex-wrap gap-2">
        {Array.from(new Set([...offer.variants.flatMap((v) => v.includes), ...(shared ?? [])].map(iconFor))).slice(0, 9).map((n) => (
          <li key={n} className="group grid h-10 w-10 place-items-center rounded-full bg-cal text-fronda ring-1 ring-cantera/50">
            <Icon name={n} size={20} />
          </li>
        ))}
      </ul>
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
                <div className="mt-3">
                  <IconList items={v.includes} />
                </div>
              </div>
            ))}
          {shared && (
            <div className="mt-3">
              <IconList items={shared} />
            </div>
          )}
        </div>
      </details>
    </article>
  );
}
