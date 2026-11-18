/**
 * Scallop geometry. Every image crop and the section valances share the same
 * bump language: semicircles whose diameter ≈ 2r, laid along the outline.
 * Paths are generated for a w×h box and used as SVG masks (data URIs).
 */
type Pt = [number, number];
const f = (n: number) => Number(n.toFixed(2));

function bumps(a: Pt, b: Pt, r: number) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const n = Math.max(1, Math.round(len / (2 * r)));
  let d = '';
  for (let i = 1; i <= n; i++) {
    const x = a[0] + ((b[0] - a[0]) * i) / n;
    const y = a[1] + ((b[1] - a[1]) * i) / n;
    const half = len / n / 2;
    d += `A${f(half)} ${f(half)} 0 0 1 ${f(x)} ${f(y)}`;
  }
  return d;
}

/** Rectangle with a scalloped perimeter (stamp / doily edge). */
export function scallopRectPath(w: number, h: number, r = 7, sides = { t: true, r: true, b: true, l: true }) {
  const x0 = sides.l ? r : 0;
  const x1 = sides.r ? w - r : w;
  const y0 = sides.t ? r : 0;
  const y1 = sides.b ? h - r : h;
  const TL: Pt = [x0, y0], TR: Pt = [x1, y0], BR: Pt = [x1, y1], BL: Pt = [x0, y1];
  const edge = (a: Pt, b: Pt, on: boolean) => (on ? bumps(a, b, r) : `L${f(b[0])} ${f(b[1])}`);
  return `M${f(TL[0])} ${f(TL[1])}${edge(TL, TR, sides.t)}${edge(TR, BR, sides.r)}${edge(BR, BL, sides.b)}${edge(BL, TL, sides.l)}Z`;
}

/** Arch (semicircular head) with a scalloped outline; flat base by default. */
export function scallopArchPath(w: number, h: number, r = 7, scallopBase = false) {
  const x0 = r, x1 = w - r, y0 = r, y1 = scallopBase ? h - r : h;
  const R = (x1 - x0) / 2;
  const cx = w / 2, cy = y0 + R;
  let d = `M${f(x0)} ${f(y1)}` + bumps([x0, y1], [x0, cy], r);
  const n = Math.max(3, Math.round((Math.PI * R) / (2 * r)));
  for (let i = 1; i <= n; i++) {
    const t = Math.PI + (Math.PI * i) / n;
    const x = cx + R * Math.cos(t), y = cy + R * Math.sin(t);
    const chord = 2 * R * Math.sin(Math.PI / n / 2);
    d += `A${f(chord / 2)} ${f(chord / 2)} 0 0 1 ${f(x)} ${f(y)}`;
  }
  d += bumps([x1, cy], [x1, y1], r);
  d += scallopBase ? bumps([x1, y1], [x0, y1], r) : `L${f(x0)} ${f(y1)}`;
  return d + 'Z';
}

/** Circle with scalloped rim (seal / rosette). */
export function scallopCirclePath(size: number, r = 6) {
  const R = size / 2 - r, c = size / 2;
  const n = Math.max(8, Math.round((2 * Math.PI * R) / (2 * r)));
  let d = `M${f(c + R)} ${f(c)}`;
  for (let i = 1; i <= n; i++) {
    const t = (2 * Math.PI * i) / n;
    const chord = 2 * R * Math.sin(Math.PI / n);
    d += `A${f(chord / 2)} ${f(chord / 2)} 0 0 1 ${f(c + R * Math.cos(t))} ${f(c + R * Math.sin(t))}`;
  }
  return d + 'Z';
}

export function svgMask(w: number, h: number, d: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'><path d='${d}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export type ScallopShape = 'arch' | 'rect' | 'top' | 'circle';

/** CSS mask for a given shape at a given aspect ratio (w/h). */
export function scallopMask(shape: ScallopShape, ratio: number, density = 1) {
  const w = 1000;
  const h = Math.round(w / ratio);
  const r = 13 / density;
  switch (shape) {
    case 'arch':
      return svgMask(w, h, scallopArchPath(w, h, r));
    case 'top':
      return svgMask(w, h, scallopRectPath(w, h, r, { t: true, r: false, b: false, l: false }));
    case 'circle':
      return svgMask(w, w, scallopCirclePath(w, r));
    default:
      return svgMask(w, h, scallopRectPath(w, h, r));
  }
}
