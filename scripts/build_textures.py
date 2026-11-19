"""
Natural background textures for every solid block, written to app/textures.css.

  python3 -I scripts/build_textures.py

Each solid colour gets one layer in a darker and/or lighter tone of itself:
  cal        lime wash: soft mottling, darker and lighter, like an encalado wall
  cal-claro  linen: a faint weave with soft clouding
  fronda     leaf shadows: blurred foliage silhouettes and dappled light
  piedra     volcanic stone: fine speckle and slow mottling
Tiles are SVG files in public/textures (feTurbulence / blurred shapes), seamless.
Colours are written as channel fractions, so no stray hex values reach the CSS.
"""
import math, os, random
from urllib.parse import quote

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'app', 'textures.css')
TILES = os.path.join(ROOT, 'public', 'textures')
os.makedirs(TILES, exist_ok=True)
_count = [0]

def uri(svg, name=None):
    # tiles are files, so they download only when textures are switched on
    _count[0] += 1
    name = name or f'tile-{_count[0]}'
    with open(os.path.join(TILES, name + '.svg'), 'w') as fh:
        fh.write(svg)
    return f"url('/textures/{name}.svg')"

def noise(size, freq, octaves, seed, rgb, k, c, kind='fractalNoise'):
    r, g, b = rgb
    return (
        f"<svg xmlns='http://www.w3.org/2000/svg' width='{size}' height='{size}'>"
        f"<filter id='n' x='0' y='0' width='100%' height='100%'>"
        f"<feTurbulence type='{kind}' baseFrequency='{freq}' numOctaves='{octaves}' seed='{seed}' stitchTiles='stitch'/>"
        f"<feColorMatrix type='matrix' values='0 0 0 0 {r} 0 0 0 0 {g} 0 0 0 0 {b} {k} 0 0 0 {c}'/>"
        f"</filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
    )

DARK = (0.18, 0.17, 0.16)    # piedra
LIGHT = (0.98, 0.97, 0.95)   # cal claro
BLACK = (0, 0, 0)
WHITE = (1, 1, 1)

def leaves(size=900, seed=7):
    rnd = random.Random(seed)
    leaf = 'M0 0 C 18 -16 52 -18 78 0 C 52 18 18 16 0 0 Z'
    parts = []
    # twigs with leaves, wrapped across tile edges so the tile repeats seamlessly
    for _ in range(14):
        cx, cy = rnd.uniform(0, size), rnd.uniform(0, size)
        base = rnd.uniform(0, 360)
        n = rnd.randint(4, 7)
        s = rnd.uniform(0.8, 1.6)
        for j in range(n):
            a = base + rnd.uniform(-70, 70)
            d = j * 26 * s
            x = cx + math.cos(math.radians(base)) * d
            y = cy + math.sin(math.radians(base)) * d
            for dx in (-size, 0, size):
                for dy in (-size, 0, size):
                    if (dx and not (x < 90 or x > size - 90)) or (dy and not (y < 90 or y > size - 90)):
                        continue
                    parts.append(f"<path d='{leaf}' transform='translate({x + dx:.0f} {y + dy:.0f}) rotate({a:.0f}) scale({s:.2f})'/>")
    lights = []
    for _ in range(9):
        x, y, r = rnd.uniform(0, size), rnd.uniform(0, size), rnd.uniform(18, 46)
        for dx in (-size, 0, size):
            for dy in (-size, 0, size):
                if (dx and not (x < 80 or x > size - 80)) or (dy and not (y < 80 or y > size - 80)):
                    continue
                lights.append(f"<circle cx='{x + dx:.0f}' cy='{y + dy:.0f}' r='{r:.0f}'/>")
    return (
        f"<svg xmlns='http://www.w3.org/2000/svg' width='{size}' height='{size}'>"
        f"<filter id='b' x='-10%' y='-10%' width='120%' height='120%'><feGaussianBlur stdDeviation='7'/></filter>"
        f"<filter id='l' x='-50%' y='-50%' width='200%' height='200%'><feGaussianBlur stdDeviation='14'/></filter>"
        f"<g filter='url(#b)' fill='black' fill-opacity='.55'>{''.join(parts)}</g>"
        f"<g filter='url(#l)' fill='white' fill-opacity='.35'>{''.join(lights)}</g></svg>"
    )

def linen(size=6):
    return (
        f"<svg xmlns='http://www.w3.org/2000/svg' width='{size}' height='{size}'>"
        f"<path d='M0 .5H{size}M.5 0V{size}' stroke='black' stroke-opacity='.03' stroke-width='1'/></svg>"
    )

T = {
    'cal': [uri(noise(640, 0.0045, 3, 4, DARK, 0.9, -0.38)), uri(noise(520, 0.006, 3, 11, LIGHT, 1.1, -0.42)), uri(noise(220, 0.85, 2, 2, DARK, 0.18, -0.06))],
    'claro': [uri(linen()), uri(noise(600, 0.005, 3, 21, DARK, 0.5, -0.22))],
    'fronda': [uri(leaves()), uri(noise(560, 0.006, 3, 8, BLACK, 0.9, -0.36)), uri(noise(220, 0.9, 2, 5, WHITE, 0.16, -0.05))],
    'piedra': [uri(noise(240, 0.75, 3, 9, WHITE, 0.28, -0.1)), uri(noise(620, 0.005, 3, 17, WHITE, 0.6, -0.26)), uri(noise(700, 0.0035, 2, 3, BLACK, 0.9, -0.35))],
}
SIZES = {
    'cal': '640px 640px, 520px 520px, 220px 220px',
    'claro': '6px 6px, 600px 600px',
    'fronda': '900px 900px, 560px 560px, 220px 220px',
    'piedra': '240px 240px, 620px 620px, 700px 700px',
}
MOTION = {
    'cal': 'tex-drift 90s ease-in-out infinite alternate',
    'claro': 'tex-drift 120s ease-in-out infinite alternate',
    'fronda': 'tex-foliage 22s ease-in-out infinite alternate',
    'piedra': 'tex-drift 140s ease-in-out infinite alternate',
}

css = ["""/* Generated by scripts/build_textures.py. Do not edit by hand.
   Natural textures for solid blocks. Off unless <html> has .tex-on
   (see the inline script in components/layout/SiteShell.tsx). */
@keyframes tex-drift {
  to { transform: translate3d(-6%, -4%, 0); }
}
@keyframes tex-foliage {
  0% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(-1.5%, 1%, 0) rotate(0.6deg); }
  100% { transform: translate3d(1.2%, -1.2%, 0) rotate(-0.5deg); }
}
.tex-on :is(.tex-cal, .tex-claro, .tex-fronda, .tex-piedra) {
  position: relative;
  isolation: isolate;
  overflow: clip;
}
.tex-on :is(.tex-cal, .tex-claro, .tex-fronda, .tex-piedra)::before {
  content: '';
  position: absolute;
  inset: -12%;
  z-index: -1;
  pointer-events: none;
  will-change: transform;
}
"""]
for k in T:
    css.append(f""".tex-on .tex-{k}::before {{
  background-image: {', '.join(T[k])};
  background-size: {SIZES[k]};
  animation: {MOTION[k]};
}}
""")
css.append(""".tex-on .tex-fronda::before { opacity: 0.55; }
.tex-on .tex-piedra::before { opacity: 0.8; }
/* phones: static, softer, no oversized animated layer */
@media (max-width: 767px) {
  .tex-on :is(.tex-cal, .tex-claro, .tex-fronda, .tex-piedra)::before {
    inset: 0;
    animation: none;
    will-change: auto;
  }
  .tex-on .tex-cal::before { opacity: 0.55; }
  .tex-on .tex-claro::before { opacity: 0.6; }
  .tex-on .tex-fronda::before { opacity: 0.4; }
  .tex-on .tex-piedra::before { opacity: 0.6; }
}
@media (prefers-reduced-motion: reduce) {
  .tex-on :is(.tex-cal, .tex-claro, .tex-fronda, .tex-piedra)::before { animation: none; }
}
""")
open(OUT, 'w').write(''.join(css))
print('wrote', os.path.relpath(OUT), round(os.path.getsize(OUT) / 1024), 'KB')
