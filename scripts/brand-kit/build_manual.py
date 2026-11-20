"""
Brand manual + application templates for Paraje Las Monjas.

  python3 -I scripts/brand-kit/build_manual.py <kit_dir>
  node scripts/brand-kit/render.mjs <kit_dir>/build/jobs-manual.json

Pages are HTML printed by Chromium to PDF: text stays live (fonts embedded),
logos, icons and diagrams stay vector. Photos and texture fills are images.
"""
import json, os, sys

KIT = sys.argv[1]
BUILD = os.path.join(KIT, 'build')
ctx = json.load(open(os.path.join(BUILD, 'context.json')))
OUT = ctx['out']
FONTS = ctx['fonts']
IMG = ctx['images']
TEXF_PNG = ctx['textures']
from PIL import Image
TEXF = {}
for k, p in TEXF_PNG.items():
    j = os.path.join(BUILD, f'tex-bg-{k}.jpg')
    Image.open(p).convert('RGB').resize((1600, 1600), Image.LANCZOS).save(j, quality=82, optimize=True)
    TEXF[k] = j
LOGO = {tuple(k.split('|')): v[0] for k, v in ctx['logos'].items()}
ICONS = ctx['icons']
PAL = ctx['palette']
LOGO_ONLY = ctx['logo_only']
jobs = []

u = lambda p: 'file://' + p


def logo(kind, variant, width=None, height=None):
    svg = LOGO[(kind, variant)]
    style = f"display:block;{'width:%dpx;' % width if width else ''}{'height:%dpx;' % height if height else ''}{'' if (width and height) else 'height:auto;' if width else 'width:auto;'}"
    return svg.replace('<svg ', f'<svg style="{style}" ', 1)


def icon(name, size=40, color='#2E2B28'):
    return ICONS[name].replace('currentColor', color).replace('width="96" height="96"', f'width="{size}" height="{size}"')


def rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def cmyk(h):
    r, g, b = (v / 255 for v in rgb(h)); k = 1 - max(r, g, b)
    c, m, y = ((1 - x - k) / (1 - k) for x in (r, g, b))
    return tuple(round(v * 100) for v in (c, m, y, k))


FACES = ''.join(
    f"@font-face{{font-family:'{fam}';src:url('{u(os.path.join(FONTS, f))}');font-weight:{w};font-style:{st}}}"
    for fam, f, w, st in [
        ('Newsreader', 'Newsreader-Light.ttf', 300, 'normal'), ('Newsreader', 'Newsreader-Regular.ttf', 400, 'normal'), ('Newsreader', 'Newsreader-Medium.ttf', 500, 'normal'),
        ('Newsreader', 'Newsreader-LightItalic.ttf', 300, 'italic'), ('Newsreader', 'Newsreader-Italic.ttf', 400, 'italic'),
        ('Hanken Grotesk', 'HankenGrotesk-Regular.ttf', 400, 'normal'), ('Hanken Grotesk', 'HankenGrotesk-Medium.ttf', 500, 'normal'), ('Hanken Grotesk', 'HankenGrotesk-SemiBold.ttf', 600, 'normal'),
        ('Hanken Grotesk', 'HankenGrotesk-Italic.ttf', 400, 'italic'),
    ]
) + ''.join(f"@font-face{{font-family:'DM Mono';src:url('{u(os.path.join(os.path.dirname(FONTS), f))}');font-weight:{w}}}" for f, w in [('DMMono-Regular.ttf', 400), ('DMMono-Medium.ttf', 500)])

SHADOW = ('0 1px 2px rgba(46,43,40,.14),0 4px 8px rgba(46,43,40,.12),0 14px 28px rgba(46,43,40,.12),0 32px 64px rgba(46,43,40,.14)')
SHADOW_DARK = ('0 1px 2px rgba(0,0,0,.3),0 4px 8px rgba(0,0,0,.26),0 14px 28px rgba(0,0,0,.24),0 32px 64px rgba(0,0,0,.28)')

CSS = FACES + f"""
@page {{ size: 1920px 1080px; margin: 0 }}
* {{ box-sizing: border-box }}
html, body {{ margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact }}
body {{ font-family: 'Hanken Grotesk'; color: #2E2B28; font-size: 22px; line-height: 1.55 }}
.page {{ width: 1920px; height: 1080px; position: relative; overflow: hidden; break-after: page; background: #EEE8DD; padding: 150px 150px 110px }}
.page.dark {{ background: #2E2B28; color: #EEE8DD }}
.page.green {{ background: #33493A; color: #EEE8DD }}
.tex::before {{ content: ''; position: absolute; inset: 0; background-size: cover; z-index: 0 }}
.tex-cal::before {{ background-image: url('{u(TEXF['cal'])}') }}
.tex-piedra::before {{ background-image: url('{u(TEXF['piedra'])}') }}
.tex-fronda::before {{ background-image: url('{u(TEXF['fronda'])}') }}
.tex-claro::before {{ background-image: url('{u(TEXF['claro'])}') }}
.page > *, .tex > * {{ position: relative; z-index: 1 }}
.tex-cal::before {{ opacity: .5 }}
.tex-piedra::before {{ opacity: .7 }}
.card.tex-claro::before {{ opacity: .7 }}
.run {{ position: absolute; top: 56px; left: 150px; right: 150px; display: flex; justify-content: space-between; font-family: 'DM Mono'; font-size: 15px; letter-spacing: .16em; text-transform: uppercase; color: #9A4F35 }}
.dark .run, .green .run {{ color: #C9BBA5 }}
.run .dot {{ display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #C23A2B; margin-right: 14px; vertical-align: middle }}
.foot {{ position: absolute; bottom: 48px; left: 150px; right: 150px; display: flex; justify-content: space-between; font-family: 'DM Mono'; font-size: 14px; letter-spacing: .08em; color: rgba(46,43,40,.6) }}
.dark .foot, .green .foot {{ color: rgba(238,232,221,.6) }}
h1 {{ font-family: 'Newsreader'; font-weight: 300; font-size: 128px; line-height: .98; letter-spacing: -.02em; margin: 0 }}
h2 {{ font-family: 'Newsreader'; font-weight: 300; font-size: 84px; line-height: 1.02; letter-spacing: -.015em; margin: 0 0 36px }}
h3 {{ font-family: 'Newsreader'; font-weight: 400; font-size: 36px; line-height: 1.1; margin: 0 0 12px }}
.eyebrow {{ font-family: 'DM Mono'; font-size: 16px; letter-spacing: .16em; text-transform: uppercase; color: #9A4F35; margin: 0 0 18px }}
.dark .eyebrow, .green .eyebrow {{ color: #C9BBA5 }}
.mono {{ font-family: 'DM Mono'; font-size: 17px; letter-spacing: .04em }}
.lede {{ font-size: 28px; line-height: 1.5; max-width: 900px; color: rgba(46,43,40,.85) }}
.dark .lede, .green .lede {{ color: rgba(238,232,221,.88) }}
.grid {{ display: grid; gap: 40px }}
.card {{ background: #FBF8F2; box-shadow: {SHADOW}; padding: 36px }}
.rule {{ height: 1px; background: rgba(201,187,165,.6); border: 0; margin: 28px 0 }}
.dark .card {{ background: #3a3633 }}
.chip {{ display: inline-flex; align-items: center; gap: 12px; padding: 0 28px; height: 56px; font-weight: 600; font-size: 15px; letter-spacing: .08em; text-transform: uppercase }}
.small {{ font-size: 17px; line-height: 1.5 }}
.muted {{ color: rgba(46,43,40,.7) }}
.x {{ position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; border-radius: 50%; background: #C23A2B; color: #FBF8F2; display: grid; place-items: center; font-weight: 600; font-size: 20px }}
"""

pages = []


def page(section, body, cls='', num=None):
    n = num or len(pages) + 1
    pages.append(f"""<section class="page {cls}">
  <div class="run"><span><span class="dot"></span>Paraje Las Monjas · Manual de marca</span><span>{section}</span></div>
  {body}
  <div class="foot"><span>Jardín · Atlixco, Puebla · 2026</span><span>{n:02d}</span></div>
</section>""")


# ---------------------------------------------------------------- 1 cover
pages.append(f"""<section class="page tex tex-cal" style="padding:0">
  <div style="position:absolute;left:150px;top:150px;width:560px">{logo('Vertical', 'Color', width=470)}</div>
  <div style="position:absolute;left:820px;top:0;bottom:0;right:0;overflow:hidden">
    <img src="{u(os.path.join(IMG, 'pabellon-cristal.jpg'))}" style="width:100%;height:100%;object-fit:cover;object-position:50% 58%">
    <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(46,43,40,.85), rgba(46,43,40,.15) 60%)"></div>
    <div style="position:absolute;left:90px;bottom:120px;color:#EEE8DD">
      <p class="eyebrow" style="color:#EEE8DD">Manual de marca · 2026</p>
      <h1 style="font-size:150px">Un jardín<br><i>cuidado.</i></h1>
    </div>
  </div>
  <div class="foot" style="right:auto;width:600px"><span>Paraje Las Monjas · Jardín · Atlixco, Puebla</span></div>
</section>""")

# ---------------------------------------------------------------- 2 contents
toc = ['La marca', 'Logotipo', 'Versiones de color', 'Área de respeto y tamaños', 'Usos incorrectos', 'Paleta de color', 'Tipografía', 'Jerarquía tipográfica',
       'Elementos gráficos', 'Texturas', 'Iconografía', 'Fotografía', 'Voz y tono', 'Aplicaciones', 'Recursos incluidos']
items = ''.join(f"<div style='display:flex;gap:28px;align-items:baseline;border-top:1px solid rgba(201,187,165,.7);padding:16px 0'><span class='mono' style='color:#9A4F35;width:50px'>{i + 3:02d}</span><span style='font-family:Newsreader;font-size:34px'>{t}</span></div>" for i, t in enumerate(toc))
page('Índice', f"""<div class="grid" style="grid-template-columns:1fr 1.25fr;align-items:start">
  <div><p class="eyebrow">Contenido</p><h2>Todo lo que hace<br>reconocible a<br><i>Paraje Las Monjas.</i></h2>
  <p class="lede small" style="max-width:560px">Este manual acompaña la carpeta de recursos. Cada sección indica qué archivo usar y cómo.</p></div>
  <div style="columns:2;column-gap:60px">{items}</div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 3 brand
traits = ['Serena', 'Atenta', 'Arraigada', 'Precisa', 'Generosa']
page('01 · La marca', f"""<div class="grid" style="grid-template-columns:1.1fr 1fr;gap:110px">
  <div><p class="eyebrow">Idea central</p><h1 style="font-size:150px">Un jardín<br><i>cuidado.</i></h1>
  <p class="lede" style="margin-top:44px">El jardín contemporáneo de Atlixco donde la arquitectura poblana —tabique aparente, piedra volcánica y muros encalados—, un pabellón de cristal y dos jardines reciben celebraciones con atención.</p></div>
  <div>
    <p class="eyebrow">El nombre</p><p class="small" style="margin-top:0">En Atlixco a las catarinas se les dice <i>monjas</i>, y Las Monjas es también el nombre del barrio. Se quedan porque el jardín está cuidado.</p>
    <hr class="rule"><p class="eyebrow">Personalidad</p>
    <div style="display:flex;flex-wrap:wrap;gap:14px">{''.join(f"<span class='chip' style='background:#FBF8F2;box-shadow:{SHADOW};font-weight:500;text-transform:none;letter-spacing:0;font-size:22px;font-family:Newsreader'>{t}</span>" for t in traits)}</div>
    <hr class="rule"><p class="eyebrow">Los cuatro espacios</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px 30px">{''.join(f"<div style='display:flex;gap:14px;align-items:center'>{icon(i, 36, '#33493A')}<span style='font-family:Newsreader;font-size:28px'>{n}</span></div>" for i, n in [('arco', 'Salón de Pilares'), ('pabellon', 'Pabellón de Cristal'), ('arbol', 'El Arbolado'), ('cipres', 'La Pradera')])}</div>
  </div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 4 logo anatomy
page('02 · Logotipo', f"""<div class="grid" style="grid-template-columns:900px 1fr;gap:100px;align-items:center">
  <div class="card tex tex-claro" style="height:760px;display:grid;place-items:center;position:relative">{logo('Vertical', 'Color', width=480)}</div>
  <div><p class="eyebrow">Anatomía</p><h2>Un pilar de tabique<br>con hojas que<br><i>lo trepan.</i></h2>
    <div class="small" style="display:grid;gap:22px;margin-top:20px">
      <div><b>Símbolo.</b> Hiladas de tabique que forman un pilar con capitel; la hilada superior en Viga, el resto en Tabique y las hojas en Fronda. Colores planos, sin degradados.</div>
      <div><b>Paraje.</b> Newsreader Regular, color Piedra.</div>
      <div><b>LAS MONJAS.</b> Hanken Grotesk Medium, mayúsculas, interletrado +42 %, color Fronda.</div>
      <div><b>Filete.</b> Línea de 1 px en Cantera entre LAS MONJAS y JARDÍN.</div>
      <div><b>JARDÍN.</b> DM Mono Regular, mayúsculas, interletrado +24 %, color Piedra.</div>
    </div>
    <p class="mono muted" style="margin-top:34px">Archivos: 01_Logotipo / SVG_vector · PDF_vector · PNG</p></div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 5 versions
def tile(kind, variant, bg, w, label, dark=False, tex=''):
    return f"""<div style="display:flex;flex-direction:column;gap:12px"><div class="{tex}" style="position:relative;background:{bg};height:330px;display:grid;place-items:center;box-shadow:{SHADOW if not dark else SHADOW_DARK}"><div style="position:relative;z-index:1">{logo(kind, variant, width=w)}</div></div><span class="mono" style="font-size:15px">{label}</span></div>"""
page('03 · Versiones de color', f"""<p class="eyebrow">Versiones</p><h2 style="font-size:64px">Color sobre claro, inverso sobre oscuro y monocromo.</h2>
<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:28px;margin-top:20px">
  {tile('Vertical', 'Color', '#EEE8DD', 210, 'Color · sobre Cal (principal)')}
  {tile('Vertical', 'Inverso', '#2E2B28', 210, 'Inverso · sobre Piedra', True)}
  {tile('Vertical', 'Inverso', '#33493A', 210, 'Inverso · sobre Fronda', True)}
  {tile('Vertical', 'Monocromo-Piedra', '#FBF8F2', 210, 'Monocromo Piedra · una tinta')}
  {tile('Horizontal', 'Color', '#FBF8F2', 330, 'Horizontal · encabezados')}
  {tile('Horizontal', 'Inverso', '#2E2B28', 330, 'Horizontal inverso', True)}
  {tile('Simbolo', 'Color', '#EEE8DD', 170, 'Símbolo · avatar, sello, favicon')}
  {tile('Vertical', 'Monocromo-Cal', '#9A4F35', 210, 'Monocromo Cal · grabado, sobre foto', True)}
</div>""")

# ---------------------------------------------------------------- 6 clear space
page('04 · Área de respeto y tamaños', f"""<div class="grid" style="grid-template-columns:1fr 1fr;gap:100px;align-items:center">
  <div style="position:relative;display:grid;place-items:center;height:740px">
    <div style="position:relative;padding:64px;outline:2px dashed #9A4F35;outline-offset:0">
      <div style="position:absolute;inset:64px;outline:1px solid rgba(46,43,40,.25)"></div>
      {logo('Vertical', 'Color', width=360)}
      <span class="mono" style="position:absolute;top:18px;left:50%;transform:translateX(-50%);color:#9A4F35;font-size:15px">X</span>
      <span class="mono" style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);color:#9A4F35;font-size:15px">X</span>
      <span class="mono" style="position:absolute;left:22px;top:50%;color:#9A4F35;font-size:15px">X</span>
      <span class="mono" style="position:absolute;right:22px;top:50%;color:#9A4F35;font-size:15px">X</span>
    </div>
  </div>
  <div><p class="eyebrow">Área de respeto</p><h2 style="font-size:64px">X = alto de la hilada superior de tabique.</h2>
    <p class="lede small">Deja libre ese espacio alrededor del logotipo. Ningún texto, borde o imagen debe entrar en él.</p>
    <hr class="rule"><p class="eyebrow">Tamaños mínimos</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:30px;align-items:end">
      <div>{logo('Simbolo', 'Color', width=48)}<p class="mono" style="margin:12px 0 0">Símbolo<br>24 px · 7 mm</p></div>
      <div>{logo('Horizontal', 'Color', width=200)}<p class="mono" style="margin:12px 0 0">Horizontal<br>140 px · 37 mm</p></div>
      <div>{logo('Vertical', 'Color', width=110)}<p class="mono" style="margin:12px 0 0">Vertical<br>96 px · 25 mm</p></div>
    </div>
  </div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 7 don'ts
def dont(style, label, bg='#FBF8F2', variant='Color'):
    return f"""<div style="display:flex;flex-direction:column;gap:12px"><div style="position:relative;background:{bg};height:300px;display:grid;place-items:center;overflow:hidden;box-shadow:{SHADOW}"><div style="{style}">{logo('Vertical', variant, width=170)}</div><span class="x"><svg width='16' height='16' viewBox='0 0 16 16'><path d='M3 3l10 10M13 3L3 13' stroke='#FBF8F2' stroke-width='2' stroke-linecap='round'/></svg></span></div><span class="small">{label}</span></div>"""
page('05 · Usos incorrectos', f"""<p class="eyebrow">No hacer</p><h2 style="font-size:64px">El logotipo no se deforma, no se decora y no cambia de color.</h2>
<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:28px">
  {dont('transform:scaleX(1.45)', 'Estirarlo o comprimirlo')}
  {dont('transform:rotate(-14deg)', 'Rotarlo')}
  {dont('filter:drop-shadow(8px 10px 4px rgba(0,0,0,.6))', 'Agregar sombras o efectos')}
  {dont('filter:hue-rotate(80deg) saturate(2)', 'Cambiar sus colores (p. ej. el verde lima original)')}
  {dont('', 'Color sobre fondos sin contraste', '#9A4F35')}
  {dont('', 'Sobre fotografías saturadas sin velo', f"url('{u(os.path.join(IMG, 'jardin-arboles-2.jpg'))}') center/cover")}
  {dont('opacity:.35', 'Usarlo transparente o desvanecido')}
  {dont('-webkit-text-stroke:2px;outline:6px solid #C23A2B;outline-offset:14px', 'Encerrarlo en marcos o contornos')}
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 8 palette
sw = ''
for key, name, hx, role, share in PAL:
    r, g, b = rgb(hx); c, m, y, k = cmyk(hx)
    light = sum(rgb(hx)) > 500
    sw += f"""<div style="display:flex;flex-direction:column;box-shadow:{SHADOW};background:#FBF8F2">
      <div style="background:{hx};height:250px;padding:22px;color:{'#2E2B28' if light else '#EEE8DD'};display:flex;flex-direction:column;justify-content:space-between">
        <span class="mono" style="font-size:15px">{share}</span><span style="font-family:Newsreader;font-size:40px">{name}</span></div>
      <div style="padding:20px 22px" class="mono"><div style="font-size:20px;font-weight:500">{hx}</div><div style="font-size:15px;margin-top:6px">RGB {r} {g} {b}<br>CMYK {c} {m} {y} {k}</div><div class="small" style="font-family:'Hanken Grotesk';margin-top:10px;letter-spacing:0">{role}</div></div></div>"""
extra = ' · '.join(f"{n} {h}" for _, n, h, _ in LOGO_ONLY)
page('06 · Paleta de color', f"""<p class="eyebrow">Paleta</p><h2 style="font-size:64px">Cal, piedra y fronda; el tabique como acento.</h2>
<div class="grid" style="grid-template-columns:repeat(8,1fr);gap:20px">{sw}</div>
<div style="display:flex;height:22px;margin-top:40px;box-shadow:{SHADOW}">{''.join(f"<div style='background:{h};flex:{w}'></div>" for h, w in [('#EEE8DD', 55), ('#2E2B28', 25), ('#33493A', 12), ('#9A4F35', 6), ('#C23A2B', 2)])}</div>
<p class="mono muted" style="margin-top:14px;font-size:15px">Proporción de uso aproximada · Sólo para el logo sobre fondo oscuro: {extra} · CMYK aproximado: validar con prueba de imprenta · Archivos: 02_Color (.ase para Adobe, .css, .json, .txt)</p>""", 'tex tex-cal')

# ---------------------------------------------------------------- 9 typography
def face(name, use, sample, css, weights):
    return f"""<div class="card tex tex-claro" style="position:relative">
      <p class="eyebrow">{use}</p><div style="{css};font-size:110px;line-height:1">Aa</div>
      <h3 style="margin-top:22px">{name}</h3><p class="small muted" style="margin:0 0 18px">{weights}</p>
      <div style="{css};font-size:30px;line-height:1.3">{sample}</div></div>"""
page('07 · Tipografía', f"""<p class="eyebrow">Tipografía</p><h2 style="font-size:64px">Una serif clásica, una sans precisa y una mono para los datos.</h2>
<div class="grid" style="grid-template-columns:1.2fr 1fr 1fr;gap:36px">
  {face('Newsreader', 'Titulares · citas · “Paraje”', 'Hay lugares que se rentan y lugares que se <i>eligen.</i>', "font-family:Newsreader;font-weight:300", 'Light 300 · Regular 400 · Medium 500 · cursivas')}
  {face('Hanken Grotesk', 'Textos · botones · navegación', 'Ceremonia en el jardín y banquete en el salón.', "font-family:'Hanken Grotesk';font-weight:400", 'Regular 400 · Medium 500 · SemiBold 600')}
  {face('DM Mono', 'Datos · precios · etiquetas', 'DESDE $709 POR INVITADO · 7 H', "font-family:'DM Mono';letter-spacing:.04em", 'Regular 400 · Medium 500')}
</div>
<p class="mono muted" style="margin-top:28px;font-size:15px">Licencia SIL Open Font License: uso libre en impresos, web y video · Archivos: 03_Tipografia (Estáticas para Word/Canva, Variable para Adobe/Figma)</p>""", 'tex tex-cal')

# ---------------------------------------------------------------- 10 hierarchy
rows = [('Display', 'Newsreader Light', '112 / 48 px', "font-family:Newsreader;font-weight:300;font-size:84px;line-height:1", 'Un jardín cuidado'),
        ('Título', 'Newsreader Regular', '56 / 36 px', "font-family:Newsreader;font-size:56px;line-height:1.1", 'Cuatro espacios, un mismo cuidado.'),
        ('Subtítulo', 'Hanken Grotesk SemiBold', '24 / 20 px', "font-family:'Hanken Grotesk';font-weight:600;font-size:26px", 'Bodas petite · De 30 a 50 invitados'),
        ('Texto', 'Hanken Grotesk Regular', '18 / 17 px · 1.6', "font-family:'Hanken Grotesk';font-size:22px", 'Recorre el jardín con la coordinación, a tu ritmo.'),
        ('Navegación', 'Hanken Grotesk Medium · MAYÚS +12 %', '14 / 16 px', "font-family:'Hanken Grotesk';font-weight:500;font-size:18px;letter-spacing:.12em;text-transform:uppercase", 'El lugar · Celebraciones · Planear'),
        ('Datos', 'DM Mono Regular +4 %', '14 / 13 px', "font-family:'DM Mono';font-size:20px;letter-spacing:.04em", 'Desde $120 por invitado · 7 horas'),
        ('Etiqueta', 'DM Mono · MAYÚS +16 %', '13 px', "font-family:'DM Mono';font-size:17px;letter-spacing:.16em;text-transform:uppercase;color:#9A4F35", "<span style='display:inline-block;width:8px;height:8px;border-radius:50%;background:#C23A2B;margin-right:12px;vertical-align:middle'></span>Visita privada")]
page('08 · Jerarquía tipográfica', f"""<p class="eyebrow">Jerarquía</p>
<div>{''.join(f"<div style='display:grid;grid-template-columns:260px 1fr;gap:40px;align-items:baseline;border-top:1px solid rgba(201,187,165,.7);padding:12px 0'><div class='mono' style='font-size:14px;line-height:1.45'><span style='color:#9A4F35;font-weight:500'>{a}</span><br>{b}<br>{c}</div><div style=\"{css}\">{s}</div></div>" for a, b, c, css, s in rows)}</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 11 graphic elements
page('09 · Elementos gráficos', f"""<p class="eyebrow">Elementos gráficos</p><h2 style="font-size:64px">Pocos elementos, siempre los mismos.</h2>
<div class="grid" style="grid-template-columns:repeat(3,1fr);gap:40px">
  <div class="card tex tex-claro" style="position:relative"><h3>Sombra de cuatro capas</h3><p class="small muted">Botones y bloques usan siempre cuatro sombras apiladas (contacto, cercana, media, lejana). Nunca una sola ni dos.</p>
    <div style="display:flex;gap:26px;margin-top:30px;align-items:center"><div style="width:150px;height:110px;background:#FBF8F2;box-shadow:{SHADOW}"></div>
    <div class="mono" style="font-size:13px;line-height:1.7">0 1 2 · 14 %<br>0 4 8 · 12 %<br>0 14 28 · 12 %<br>0 32 64 · 14 %</div></div></div>
  <div class="card tex tex-claro" style="position:relative"><h3>Botones</h3><p class="small muted">Rectos, en mayúsculas con interletrado. Al pasar el cursor, un relleno sube desde la base.</p>
    <div style="display:flex;flex-direction:column;gap:20px;margin-top:26px;align-items:flex-start">
      <span class="chip" style="background:#2E2B28;color:#EEE8DD;box-shadow:{SHADOW}">{icon('calendario', 22, '#EEE8DD')} Solicitar una visita privada</span>
      <span class="chip" style="background:#33493A;color:#EEE8DD;box-shadow:{SHADOW}">{icon('chat', 22, '#EEE8DD')} WhatsApp</span>
      <span class="chip" style="height:44px;padding:0;color:#2E2B28;border-bottom:1px solid #2E2B28">Recorrer el lugar {icon('flecha', 22, '#2E2B28')}</span></div></div>
  <div class="card tex tex-claro" style="position:relative"><h3>La junta y el punto</h3><p class="small muted">Una línea de 1 px en Cantera es el único divisor. El punto Catarina marca lo activo o el paso actual, nunca decora.</p>
    <hr class="rule" style="margin:40px 0"><div style="display:flex;align-items:center;gap:16px"><span style="width:12px;height:12px;border-radius:50%;background:#C23A2B"></span><span class="eyebrow" style="margin:0">Visita privada</span></div></div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 12 textures
tx = [('cal', 'Cal · encalado', 'Fondos claros: manchas suaves de muro encalado.'), ('claro', 'Cal claro · lino', 'Tarjetas: trama de lino casi invisible.'),
      ('fronda', 'Fronda · sombra de hojas', 'Bloques verdes: sombras de follaje y luz moteada.'), ('piedra', 'Piedra · volcánica', 'Bloques oscuros: jaspeado de piedra.')]
page('10 · Texturas', f"""<p class="eyebrow">Texturas</p><h2 style="font-size:64px">Un tono más claro u oscuro del mismo color, para que el fondo respire.</h2>
<div class="grid" style="grid-template-columns:repeat(4,1fr);gap:28px">{''.join(f"<div><div style='height:440px;background:url({u(TEXF[k])}) center/cover;box-shadow:{SHADOW}'></div><h3 style='margin-top:20px'>{n}</h3><p class='small muted' style='margin:0'>{t}</p></div>" for k, n, t in tx)}</div>
<p class="mono muted" style="margin-top:26px;font-size:15px">En web se mueven muy despacio; en impresos se usan fijas. Archivos: 05_Texturas (PNG 2400 px y SVG editable)</p>""", 'tex tex-cal')

# ---------------------------------------------------------------- 13 icons
ig = ''.join(f"<div style='display:flex;flex-direction:column;align-items:center;gap:10px'><div style='width:84px;height:84px;border-radius:50%;background:#FBF8F2;box-shadow:{SHADOW};display:grid;place-items:center'>{icon(n, 44, '#33493A')}</div><span class='mono' style='font-size:12px'>{n}</span></div>" for n in ICONS)
page('11 · Iconografía', f"""<div class="grid" style="grid-template-columns:520px 1fr;gap:80px">
  <div><p class="eyebrow">Iconografía</p><h2 style="font-size:64px">Línea fina, puntas redondas, dibujada como la junta.</h2>
  <p class="small muted">Retícula de 24 × 24, trazo de 1.25. Se usan en Fronda o Piedra sobre claro y en Cal sobre oscuro, dentro de un círculo Cal claro cuando acompañan un dato.</p>
  <p class="mono muted" style="font-size:15px">Archivos: 04_Iconografia (SVG en Piedra, Fronda y Cal; PNG 1024 px)</p></div>
  <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:22px 10px">{ig}</div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 14 photography
ph = ['pabellon-cristal.jpg', 'salon-pilares.jpg', 'jardin-arboles-1.jpg', 'mesa-madera.jpg', 'jardin-multiusos-1.jpg', 'ave-paraiso.jpg']
page('12 · Fotografía', f"""<div class="grid" style="grid-template-columns:520px 1fr;gap:70px">
  <div><p class="eyebrow">Fotografía</p><h2 style="font-size:64px">El lugar como es, con luz natural.</h2>
  <div class="small" style="display:grid;gap:14px">
    <div><span style='display:inline-block;width:9px;height:9px;border-radius:50%;background:#C23A2B;margin-right:14px;vertical-align:middle'></span>Luz natural, sin HDR ni filtros fuertes.</div><div><span style='display:inline-block;width:9px;height:9px;border-radius:50%;background:#C23A2B;margin-right:14px;vertical-align:middle'></span>Verdes contenidos, no saturados.</div><div><span style='display:inline-block;width:9px;height:9px;border-radius:50%;background:#C23A2B;margin-right:14px;vertical-align:middle'></span>Arquitectura a la vista: tabique, piedra, cal y cristal.</div>
    <div><span style='display:inline-block;width:9px;height:9px;border-radius:50%;background:#C23A2B;margin-right:14px;vertical-align:middle'></span>Personas reales en movimiento, sin poses.</div><div><span style='display:inline-block;width:9px;height:9px;border-radius:50%;background:#C23A2B;margin-right:14px;vertical-align:middle'></span>Evitar globos, techos de tela, letreros y escenografía.</div></div>
  <p class="mono muted" style="font-size:15px;margin-top:26px">Las fotos incluidas son las de muestra del jardín, ampliadas 2× sin alterar su contenido. Archivos: 06_Fotografia</p></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px">{''.join(f"<div style='height:350px;box-shadow:{SHADOW};background:url({u(os.path.join(IMG, f))}) center/cover'></div>" for f in ph)}</div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 15 voice
do = ['Solicitar una visita privada', 'Consultar fechas por WhatsApp', 'Un jardín cuidado.', 'Desde $709 por invitado', 'Te escribimos en menos de 24 horas.']
dont_ = ['El día más especial de tu vida', 'Exclusivo · de ensueño · mágico', '¡Cotiza gratis ya!', 'Salón de eventos con todo incluido', 'Castillo europeo en Puebla']
page('13 · Voz y tono', f"""<p class="eyebrow">Voz y tono</p><h2 style="font-size:64px">Frases cortas, datos exactos y un “tú” cálido.</h2>
<div class="grid" style="grid-template-columns:1fr 1fr;gap:40px">
  <div class="card tex tex-claro" style="position:relative"><h3>Sí</h3>{''.join(f"<div style='font-family:Newsreader;font-size:34px;border-top:1px solid rgba(201,187,165,.7);padding:14px 0'>{t}</div>" for t in do)}</div>
  <div class="card tex tex-claro" style="position:relative"><h3>No</h3>{''.join(f"<div style='font-family:Newsreader;font-size:34px;border-top:1px solid rgba(201,187,165,.7);padding:14px 0;color:rgba(46,43,40,.55);text-decoration:line-through'>{t}</div>" for t in dont_)}</div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- applications (templates rendered separately and previewed here)
APP = os.path.join(OUT, '07_Aplicaciones')
os.makedirs(APP, exist_ok=True)

card_front = f"""<div class="tex tex-cal" style="position:relative;width:96mm;height:56mm;background:#EEE8DD;display:grid;place-items:center"><div style="position:relative;z-index:1">{logo('Vertical', 'Color', height=150)}</div></div>"""
card_back = f"""<div class="tex tex-piedra" style="position:relative;width:96mm;height:56mm;background:#2E2B28;color:#EEE8DD;padding:9mm 9mm">
  <div style="position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;height:100%">
    {logo('Horizontal', 'Inverso', width=200)}
    <div><div style="font-family:Newsreader;font-size:17px">Nombre Apellido</div><div style="font-family:'DM Mono';font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:#C9BBA5;margin-top:2px">Coordinación</div>
    <div style="font-family:'DM Mono';font-size:9px;line-height:1.7;margin-top:7px">WhatsApp +52 244 785 5365<br>@paraje_las_monjas · Atlixco, Puebla</div></div></div></div>"""
for name, body in [('Tarjeta_frente', card_front), ('Tarjeta_reverso', card_back)]:
    hp = os.path.join(BUILD, f'app-{name}.html')
    open(hp, 'w').write(f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS} @page{{size:96mm 56mm;margin:0}} body{{margin:0}} .tex::before{{background-size:cover}}</style></head><body>{body}</body></html>")
    jobs.append({'html': hp, 'out': os.path.join(APP, f'PLM_{name}_90x50mm_con-rebase-3mm.pdf'), 'type': 'pdf', 'w': '96mm', 'h': '56mm', 'vw': 363, 'vh': 212, 'pages': '1'})
    jobs.append({'html': hp, 'out': os.path.join(APP, f'PLM_{name}_preview.png'), 'type': 'png', 'w': 363, 'h': 212, 'scale': 5, 'transparent': False})

post = f"""<div style="position:relative;width:1080px;height:1350px;overflow:hidden;color:#EEE8DD">
  <img src="{u(os.path.join(IMG, 'pabellon-cristal.jpg'))}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 58%">
  <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(46,43,40,.92), rgba(46,43,40,.25) 55%, rgba(46,43,40,.35))"></div>
  <div style="position:absolute;left:80px;top:80px">{logo('Horizontal', 'Inverso', width=330)}</div>
  <div style="position:absolute;left:80px;right:80px;bottom:90px">
    <p class="eyebrow" style="color:#EEE8DD;font-size:20px">Jardín · Atlixco, Puebla</p>
    <h1 style="font-size:150px">Un jardín<br><i>cuidado.</i></h1>
    <p style="font-size:30px;margin-top:30px;max-width:780px">Tabique, piedra y cal; un pabellón de cristal y dos jardines.</p></div></div>"""
story = f"""<div class="tex tex-fronda" style="position:relative;width:1080px;height:1920px;overflow:hidden;background:#33493A;color:#EEE8DD">
  <div style="position:absolute;left:90px;right:90px;top:150px;height:1050px;box-shadow:{SHADOW_DARK};background:url('{u(os.path.join(IMG, 'jardin-arboles-1.jpg'))}') center/cover;z-index:1"></div>
  <div style="position:absolute;left:90px;top:1110px;z-index:2"><h1 style="font-size:132px;text-shadow:0 2px 4px rgba(0,0,0,.25),0 8px 24px rgba(0,0,0,.25)">Ven a<br><i>conocerlo.</i></h1></div>
  <div style="position:absolute;left:90px;right:90px;bottom:150px;z-index:2">
    <p style="font-size:34px;line-height:1.4;margin:0 0 36px">Visitas privadas entre semana o el sábado por la mañana.</p>
    <span class="chip" style="height:84px;font-size:24px;background:#EEE8DD;color:#2E2B28;box-shadow:{SHADOW_DARK}">{icon('chat', 34, '#2E2B28')} WhatsApp 244 785 5365</span>
    <div style="margin-top:70px">{logo('Horizontal', 'Inverso', width=360)}</div></div></div>"""
for name, body, w, h in [('Instagram-post_1080x1350', post, 1080, 1350), ('Instagram-historia_1080x1920', story, 1080, 1920)]:
    hp = os.path.join(BUILD, f'app-{name}.html')
    open(hp, 'w').write(f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS} @page{{size:{w}px {h}px;margin:0}} body{{margin:0}}</style></head><body>{body}</body></html>")
    jobs.append({'html': hp, 'out': os.path.join(APP, f'PLM_{name}.pdf'), 'type': 'pdf', 'w': f'{w}px', 'h': f'{h}px', 'vw': w, 'vh': h, 'pages': '1'})
    jobs.append({'html': hp, 'out': os.path.join(APP, f'PLM_{name}.png'), 'type': 'png', 'w': w, 'h': h, 'scale': 1, 'transparent': False})

prev = lambda f, w: f"<img src='{u(os.path.join(APP, f))}' style='width:{w}px;display:block;box-shadow:{SHADOW}'>"
page('14 · Aplicaciones', f"""<p class="eyebrow">Aplicaciones</p><h2 style="font-size:64px">Plantillas listas para editar.</h2>
<div style="display:flex;gap:56px;align-items:flex-start">
  <div style="display:flex;flex-direction:column;gap:22px">{prev('PLM_Tarjeta_frente_preview.png', 470)}{prev('PLM_Tarjeta_reverso_preview.png', 470)}<span class="mono" style="font-size:15px">Tarjeta 90 × 50 mm · frente y reverso · PDF con rebase de 3 mm</span></div>
  <div style="display:flex;flex-direction:column;gap:14px">{prev('PLM_Instagram-post_1080x1350.png', 440)}<span class="mono" style="font-size:15px">Post 1080 × 1350</span></div>
  <div style="display:flex;flex-direction:column;gap:14px">{prev('PLM_Instagram-historia_1080x1920.png', 310)}<span class="mono" style="font-size:15px">Historia 1080 × 1920</span></div>
</div>""", 'tex tex-cal')

# ---------------------------------------------------------------- 16 resources
folders = [('01_Logotipo', 'Vertical, horizontal y símbolo en Color, Inverso, Monocromo Piedra y Monocromo Cal. SVG y PDF vectoriales (editables en Illustrator, Inkscape, Affinity, Figma), PNG transparente de 4000 px y 1000 px, íconos de app y favicon.'),
           ('02_Color', 'Paleta en .ase (muestras de Adobe), .css, .json y .txt con HEX, RGB y CMYK aproximado.'),
           ('03_Tipografia', 'Newsreader, Hanken Grotesk y DM Mono: estáticas (Word, Canva) y variables (Adobe, Figma), con su licencia OFL.'),
           ('04_Iconografia', '39 íconos en SVG (Piedra, Fronda, Cal) y PNG de 1024 px.'),
           ('05_Texturas', 'Cuatro texturas en PNG de 2400 px, SVG editable y mosaicos repetibles para web.'),
           ('06_Fotografia', 'Fotografías del jardín ampliadas 2×, recortes con cielo transparente y el loop de video ambiental.'),
           ('07_Aplicaciones', 'Tarjeta de presentación, post e historia de Instagram en PDF editable y PNG.')]
page('15 · Recursos incluidos', f"""<div class="grid" style="grid-template-columns:1fr 1.5fr;gap:90px">
  <div><p class="eyebrow">Recursos</p><h2 style="font-size:64px">Qué hay en<br>la carpeta.</h2>
  <p class="small muted">El símbolo se vectorizó a partir del logotipo original y se recoloreó con la paleta; el texto se compuso de nuevo con las tipografías de la marca. Si existe el archivo vectorial original del logotipo, conviene conservarlo como referencia.</p>
  <hr class="rule"><p class="mono" style="font-size:16px;line-height:1.9">WhatsApp +52 244 785 5365<br>Instagram @paraje_las_monjas<br>Facebook · Paraje Las Monjas</p></div>
  <div>{''.join(f"<div style='display:grid;grid-template-columns:240px 1fr;gap:30px;border-top:1px solid rgba(201,187,165,.7);padding:16px 0'><span class='mono' style='color:#9A4F35;font-size:17px'>{f}</span><span class='small'>{t}</span></div>" for f, t in folders)}</div>
</div>""", 'tex tex-cal')

manual = os.path.join(BUILD, 'manual.html')
open(manual, 'w').write(f"<!doctype html><html lang='es'><head><meta charset='utf-8'><title>Paraje Las Monjas · Manual de marca</title><style>{CSS}</style></head><body>{''.join(pages)}</body></html>")
jobs.append({'html': manual, 'out': os.path.join(OUT, 'Paraje-Las-Monjas_Manual-de-marca.pdf'), 'type': 'pdf', 'w': '1920px', 'h': '1080px', 'vw': 1920, 'vh': 1080, 'cssPage': True, 'after_apps': True})
# templates must exist before the manual that previews them
jobs.sort(key=lambda j: 1 if j.get('after_apps') else 0)
json.dump({'jobs': jobs}, open(os.path.join(BUILD, 'jobs-manual.json'), 'w'))
print('manual pages:', len(pages), '· jobs:', len(jobs))
