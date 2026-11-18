/** Accordion on native <details>: keyboard-operable with no JS. */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-b border-cantera/40">
      {items.map((it) => (
        <details key={it.q} className="group border-t border-cantera/40">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-[22px] leading-snug lg:text-[26px]">{it.q}</span>
            <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-4 bg-piedra" />
              <span className="absolute left-1/2 top-0 h-4 w-px bg-piedra transition-transform duration-500 ease-lux group-open:scale-y-0" />
            </span>
          </summary>
          <p className="measure pb-6 text-piedra/85">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
