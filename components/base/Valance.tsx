/**
 * Scalloped section edge, like the hem of a garden awning. Sits on the edge
 * of a coloured section and bulges into the neighbouring one.
 */
export function Valance({
  color,
  position = 'top',
  size = 14,
  className = '',
}: {
  color: string;
  position?: 'top' | 'bottom';
  size?: number;
  className?: string;
}) {
  const top = position === 'top';
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-[1] ${className}`}
      style={{
        [top ? 'top' : 'bottom']: -size + 1,
        height: size,
        backgroundImage: `radial-gradient(circle at 50% ${top ? '100%' : '0%'}, ${color} ${size - 0.5}px, transparent ${size}px)`,
        backgroundSize: `${size * 2}px ${size}px`,
        backgroundRepeat: 'round no-repeat',
      }}
    />
  );
}
