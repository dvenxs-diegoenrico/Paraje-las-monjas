"""
Paraje Las Monjas · brand kit builder.

  python3 -I scripts/brand-kit/build_kit.py <kit_dir> <fonts_dir> <icons.json>
  node scripts/brand-kit/render.mjs <kit_dir>/build/jobs.json

Writes the folder structure, vector SVGs, colour files and HTML layouts; the
Node step prints every layout to vector PDF / high-resolution PNG with Chromium.
"""
import json, os, re, shutil, struct, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
KIT, FONTS, ICONS_JSON = sys.argv[1], sys.argv[2], sys.argv[3]
OUT = os.path.join(KIT, 'Paraje-Las-Monjas_Kit-de-Marca')
BUILD = os.path.join(KIT, 'build')
BRAND = os.path.join(ROOT, 'public', 'brand')
IMAGES = os.path.join(ROOT, 'public', 'images')
TEX = os.path.join(ROOT, 'public', 'textures')
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(BUILD, exist_ok=True)
jobs = []


def d(*p):
    path = os.path.join(OUT, *p)
    os.makedirs(path, exist_ok=True)
    return path


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(text)


# ---------------------------------------------------------------- colour
PALETTE = [
    # key, name, hex, role, share
    ('cal', 'Cal', '#EEE8DD', 'Fondo principal, alabastro cálido', '55%'),
    ('piedra', 'Piedra', '#2E2B28', 'Texto y bloques oscuros', '25%'),
    ('fronda', 'Fronda', '#33493A', 'Bloques de énfasis y formularios', '12%'),
    ('tabique', 'Tabique', '#9A4F35', 'Etiquetas, enlaces, cifras; ladrillos del símbolo', '6%'),
    ('catarina', 'Catarina', '#C23A2B', 'Sólo señales mínimas: punto activo', '<2%'),
    ('viga', 'Viga', '#5B3E2E', 'Hilada superior del símbolo', 'símbolo'),
    ('cantera', 'Cantera', '#C9BBA5', 'Filetes, líneas, rellenos sutiles', 'detalle'),
    ('cal-claro', 'Cal claro', '#FBF8F2', 'Tarjetas sobre cal', 'detalle'),
]
LOGO_ONLY = [
    ('tabique-claro', 'Tabique claro', '#C4694A', 'Ladrillos del logo sobre fondo oscuro'),
    ('fronda-claro', 'Fronda claro', '#7C9A83', 'Hojas del logo sobre fondo oscuro'),
]


def rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def cmyk(h):
    r, g, b = (v / 255 for v in rgb(h))
    k = 1 - max(r, g, b)
    if k >= 1:
        return (0, 0, 0, 100)
    c, m, y = ((1 - x - k) / (1 - k) for x in (r, g, b))
    return tuple(round(v * 100) for v in (c, m, y, k))


def ase(colors):
    """Adobe Swatch Exchange (Illustrator, InDesign, Photoshop)."""
    blocks = []
    for name, hx in colors:
        nm = (name + '\0').encode('utf-16-be')
        body = struct.pack('>H', len(name) + 1) + nm + b'RGB ' + struct.pack('>fff', *(v / 255 for v in rgb(hx))) + struct.pack('>H', 2)
        blocks.append(struct.pack('>HI', 0x0001, len(body)) + body)
    return b'ASEF' + struct.pack('>HHI', 1, 0, len(blocks)) + b''.join(blocks)


cdir = d('02_Color')
allc = [(n, h) for _, n, h, *_ in PALETTE] + [(n, h) for _, n, h, _ in LOGO_ONLY]
with open(os.path.join(cdir, 'Paraje-Las-Monjas_Paleta.ase'), 'wb') as fh:
    fh.write(ase(allc))
lines = ['PARAJE LAS MONJAS · PALETA DE COLOR', '', 'CMYK aproximado (conversión directa). Validar con prueba de imprenta.', '']
for _, n, h, role, share in PALETTE:
    r, g, b = rgb(h); c, m, y, k = cmyk(h)
    lines.append(f'{n:<10} {h}   RGB {r:>3} {g:>3} {b:>3}   CMYK {c:>3} {m:>3} {y:>3} {k:>3}   {share:<8} {role}')
lines += ['', 'Sólo para el logotipo sobre fondos oscuros:']
for _, n, h, role in LOGO_ONLY:
    r, g, b = rgb(h); c, m, y, k = cmyk(h)
    lines.append(f'{n:<14} {h}   RGB {r:>3} {g:>3} {b:>3}   CMYK {c:>3} {m:>3} {y:>3} {k:>3}   {role}')
write(os.path.join(cdir, 'Paraje-Las-Monjas_Paleta.txt'), '\n'.join(lines) + '\n')
write(os.path.join(cdir, 'Paraje-Las-Monjas_Paleta.css'), ':root {\n' + ''.join(f'  --{k}: {h};\n' for k, _, h, *_ in PALETTE) + ''.join(f'  --{k}: {h};\n' for k, _, h, _ in LOGO_ONLY) + '}\n')
write(os.path.join(cdir, 'Paraje-Las-Monjas_Paleta.json'), json.dumps({k: {'nombre': n, 'hex': h, 'rgb': rgb(h), 'cmyk_aprox': cmyk(h), 'uso': role} for k, n, h, role, *_ in PALETTE + [(*x, '') for x in LOGO_ONLY]}, ensure_ascii=False, indent=2))

# ---------------------------------------------------------------- logos
LOGOS = {
    'Vertical': 'logo-vertical', 'Horizontal': 'logo-horizontal', 'Simbolo': 'mark',
}
VARIANTS = {
    'Color': ('', None),
    'Inverso': ('-light', None),  # for dark backgrounds
    'Monocromo-Piedra': ('-mono', None),
    'Monocromo-Cal': ('-mono', ('#2E2B28', '#EEE8DD')),
}
MONO_NAME = {'logo-vertical': 'logo-mono', 'logo-horizontal': 'logo-horizontal-mono', 'mark': 'mark-mono'}
logo_svgs = {}
for lname, base in LOGOS.items():
    for vname, (suffix, swap) in VARIANTS.items():
        src = MONO_NAME[base] if suffix == '-mono' else base + suffix
        svg = open(os.path.join(BRAND, src + '.svg'), encoding='utf-8').read()
        if swap:
            svg = svg.replace(swap[0], swap[1])
        m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
        w, h = float(m.group(1)), float(m.group(2))
        svg = svg.replace('<svg ', f'<svg width="{w:.0f}" height="{h:.0f}" ', 1) if 'width=' not in svg.split('>')[0] else svg
        fname = f'PLM_Logo-{lname}_{vname}'
        logo_svgs[(lname, vname)] = (svg, w, h)
        write(os.path.join(d('01_Logotipo', 'SVG_vector'), fname + '.svg'), svg)
        page = f"<!doctype html><html><head><meta charset='utf-8'><style>@page{{margin:0}}html,body{{margin:0;padding:0;background:transparent;width:{w:.0f}px;height:{h:.0f}px;overflow:hidden}}svg{{display:block;width:100%;height:100%}}</style></head><body>{svg}</body></html>"
        hp = os.path.join(BUILD, fname + '.html'); write(hp, page)
        # vector PDF at real proportions (points), transparent page
        jobs.append({'html': hp, 'out': os.path.join(d('01_Logotipo', 'PDF_vector'), fname + '.pdf'), 'type': 'pdf', 'w': f'{w:.0f}px', 'h': f'{h:.0f}px', 'vw': w, 'vh': h, 'pages': '1'})
        # PNG 4000 px on the long side, transparent
        scale = 4000 / max(w, h)
        jobs.append({'html': hp, 'out': os.path.join(d('01_Logotipo', 'PNG_alta-resolucion'), fname + '_4000px.png'), 'type': 'png', 'w': round(w), 'h': round(h), 'scale': scale, 'transparent': True})
        jobs.append({'html': hp, 'out': os.path.join(d('01_Logotipo', 'PNG_web'), fname + '_1000px.png'), 'type': 'png', 'w': round(w), 'h': round(h), 'scale': 1000 / max(w, h), 'transparent': True})

# favicon / social set
for f in ['icon-512.png', 'icon-192.png', 'og.png']:
    shutil.copy(os.path.join(ROOT, 'public', f), os.path.join(d('01_Logotipo', 'Iconos-de-app'), 'PLM_' + f))
shutil.copy(os.path.join(ROOT, 'app', 'apple-icon.png'), os.path.join(d('01_Logotipo', 'Iconos-de-app'), 'PLM_apple-icon-180.png'))
shutil.copy(os.path.join(ROOT, 'app', 'favicon.ico'), os.path.join(d('01_Logotipo', 'Iconos-de-app'), 'PLM_favicon.ico'))

# ---------------------------------------------------------------- fonts
fd = d('03_Tipografia')
for sub in ['Variable', 'Estaticas']:
    d('03_Tipografia', sub)
for f in os.listdir(FONTS):
    p = os.path.join(FONTS, f)
    if f.endswith('.ttf'):
        shutil.copy(p, os.path.join(fd, 'Variable' if 'Variable' in f else 'Estaticas', f))
    elif f.endswith('.txt'):
        shutil.copy(p, os.path.join(fd, f))
for f in os.listdir(os.path.join(FONTS, 'static')):
    shutil.copy(os.path.join(FONTS, 'static', f), os.path.join(fd, 'Estaticas', f))
write(os.path.join(fd, 'LEEME.txt'), """TIPOGRAFÍAS · PARAJE LAS MONJAS

Newsreader       Titulares, citas, logotipo "Paraje"
Hanken Grotesk   Textos, navegación, botones, "LAS MONJAS"
DM Mono          Datos, precios, horarios, etiquetas, "JARDÍN"

Las tres tienen licencia SIL Open Font License 1.1 (ver archivos OFL-*.txt):
se pueden instalar, usar en impresos, web y video, y compartir libremente.

Estaticas/   Un archivo por peso. Úsalas en Word, PowerPoint, Canva (subir fuente)
             y cualquier programa. Instala todos los archivos de la carpeta.
Variable/    Un archivo con todos los pesos. Para Illustrator, InDesign, Figma y web.
""")

# ---------------------------------------------------------------- icons
icons = json.load(open(ICONS_JSON))
ICON_COLORS = {'Piedra': '#2E2B28', 'Fronda': '#33493A', 'Cal': '#EEE8DD'}
icon_svgs = {}
for name, raw in icons.items():
    svg = raw.replace('class="fill-[currentColor] icon-fill"', 'fill="currentColor"')
    svg = re.sub(r'\s(class|aria-hidden|focusable)="[^"]*"', '', svg)
    svg = svg.replace('<svg ', "<svg xmlns='http://www.w3.org/2000/svg' ", 1).replace('pathLength="1"', '')
    icon_svgs[name] = svg
    for cname, hx in ICON_COLORS.items():
        s = svg.replace('currentColor', hx)
        write(os.path.join(d('04_Iconografia', 'SVG', cname), f'PLM_icono-{name}.svg'), s)
    hp = os.path.join(BUILD, f'icon-{name}.html')
    write(hp, f"<!doctype html><html><head><meta charset='utf-8'><style>html,body{{margin:0;background:transparent}}svg{{display:block;width:96px;height:96px;overflow:visible}}</style></head><body>{svg.replace('currentColor', '#2E2B28')}</body></html>")
    jobs.append({'html': hp, 'out': os.path.join(d('04_Iconografia', 'PNG_Piedra_1024px'), f'PLM_icono-{name}.png'), 'type': 'png', 'w': 96, 'h': 96, 'scale': 1024 / 96, 'transparent': True})
# ---------------------------------------------------------------- textures
tex_css = open(os.path.join(ROOT, 'app', 'textures.css')).read()
TEX_BASE = {'cal': '#EEE8DD', 'claro': '#FBF8F2', 'fronda': '#33493A', 'piedra': '#2E2B28'}
TEX_NAME = {'cal': 'Cal-encalado', 'claro': 'Cal-claro-lino', 'fronda': 'Fronda-sombra-de-hojas', 'piedra': 'Piedra-volcanica'}
TEX_OPACITY = {'cal': 1, 'claro': 1, 'fronda': 0.55, 'piedra': 0.8}
td = d('05_Texturas')
import math, random
S = 2400


def noise(freq, octaves, seed, rgb_, k, c):
    r, g, b = rgb_
    return (f"<filter id='n{seed}' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='{freq}' numOctaves='{octaves}' seed='{seed}'/>"
            f"<feColorMatrix type='matrix' values='0 0 0 0 {r} 0 0 0 0 {g} 0 0 0 0 {b} {k} 0 0 0 {c}'/></filter><rect width='100%' height='100%' filter='url(#n{seed})'/>")


def leaves(seed=7, n=110):
    rnd = random.Random(seed)
    leaf = 'M0 0 C 18 -16 52 -18 78 0 C 52 18 18 16 0 0 Z'
    parts, lights = [], []
    for _ in range(n):
        cx, cy = rnd.uniform(-60, S), rnd.uniform(-60, S)
        base, s_ = rnd.uniform(0, 360), rnd.uniform(0.8, 1.6)
        for j in range(rnd.randint(4, 7)):
            a = base + rnd.uniform(-70, 70)
            x = cx + math.cos(math.radians(base)) * j * 26 * s_
            y = cy + math.sin(math.radians(base)) * j * 26 * s_
            parts.append(f"<path d='{leaf}' transform='translate({x:.0f} {y:.0f}) rotate({a:.0f}) scale({s_:.2f})'/>")
    for _ in range(70):
        lights.append(f"<circle cx='{rnd.uniform(0, S):.0f}' cy='{rnd.uniform(0, S):.0f}' r='{rnd.uniform(18, 46):.0f}'/>")
    return (f"<filter id='lb' x='-10%' y='-10%' width='120%' height='120%'><feGaussianBlur stdDeviation='7'/></filter>"
            f"<filter id='ll' x='-50%' y='-50%' width='200%' height='200%'><feGaussianBlur stdDeviation='14'/></filter>"
            f"<g filter='url(#lb)' fill='black' fill-opacity='.55'>{''.join(parts)}</g><g filter='url(#ll)' fill='white' fill-opacity='.35'>{''.join(lights)}</g>")


DARK, LIGHT = (0.18, 0.17, 0.16), (0.98, 0.97, 0.95)
LAYERS = {
    'cal': noise(0.0045, 3, 4, DARK, 0.9, -0.38) + noise(0.006, 3, 11, LIGHT, 1.1, -0.42) + noise(0.85, 2, 2, DARK, 0.18, -0.06),
    'claro': "<pattern id='ln' width='6' height='6' patternUnits='userSpaceOnUse'><path d='M0 .5H6M.5 0V6' stroke='black' stroke-opacity='.03'/></pattern><rect width='100%' height='100%' fill='url(#ln)'/>" + noise(0.005, 3, 21, DARK, 0.5, -0.22),
    'fronda': leaves() + noise(0.006, 3, 8, (0, 0, 0), 0.9, -0.36) + noise(0.9, 2, 5, (1, 1, 1), 0.16, -0.05),
    'piedra': noise(0.75, 3, 9, (1, 1, 1), 0.28, -0.1) + noise(0.005, 3, 17, (1, 1, 1), 0.6, -0.26) + noise(0.0035, 2, 3, (0, 0, 0), 0.9, -0.35),
}
for k in TEX_BASE:
    svg = f"<svg xmlns='http://www.w3.org/2000/svg' width='{S}' height='{S}'><rect width='100%' height='100%' fill='{TEX_BASE[k]}'/><g opacity='{TEX_OPACITY[k]}'>{LAYERS[k]}</g></svg>"
    write(os.path.join(d('05_Texturas', 'SVG_editable'), f'PLM_textura-{TEX_NAME[k]}.svg'), svg)
    hp = os.path.join(BUILD, f'tex-{k}.html')
    write(hp, f"<!doctype html><html><head><meta charset='utf-8'><style>html,body{{margin:0}}svg{{display:block}}</style></head><body>{svg}</body></html>")
    jobs.append({'html': hp, 'out': os.path.join(td, f'PLM_textura-{TEX_NAME[k]}_2400px.png'), 'type': 'png', 'w': S, 'h': S, 'scale': 1, 'transparent': False})
for f in os.listdir(TEX):
    shutil.copy(os.path.join(TEX, f), os.path.join(d('05_Texturas', 'Mosaicos-SVG_repetibles'), f))

# ---------------------------------------------------------------- photography
pd = d('06_Fotografia')
for f in sorted(os.listdir(IMAGES)):
    if f.endswith('.jpg') or f.endswith('.png'):
        shutil.copy(os.path.join(IMAGES, f), os.path.join(pd, 'PLM_' + f))
shutil.copy(os.path.join(ROOT, 'public', 'video', 'hero-loop.mp4'), os.path.join(d('06_Fotografia', 'Video'), 'PLM_loop-ambiental_1280x720.mp4'))

json.dump({'jobs': jobs}, open(os.path.join(BUILD, 'jobs-assets.json'), 'w'))
json.dump({'out': OUT, 'build': BUILD, 'fonts': os.path.join(FONTS, 'static'), 'palette': PALETTE, 'logo_only': LOGO_ONLY,
           'logos': {f'{a}|{b}': v for (a, b), v in logo_svgs.items()}, 'icons': icon_svgs, 'images': IMAGES, 'textures': {k: os.path.join(td, f'PLM_textura-{TEX_NAME[k]}_2400px.png') for k in TEX_BASE}},
          open(os.path.join(BUILD, 'context.json'), 'w'), ensure_ascii=False)
print('assets:', len(jobs), 'render jobs →', OUT)
