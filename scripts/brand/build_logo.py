"""
Build the Paraje Las Monjas logo kit from the client's raster logo.

  python3 -I scripts/brand/build_logo.py

Requires: opencv-python-headless, numpy, fonttools, uharfbuzz.

1. Traces the brick pillar (red cluster) and the leaves (green cluster) of
   `_incoming/logo-actual.jpg` into smooth closed bezier paths (flat fills).
2. Retypes the wordmark with Newsreader / Hanken Grotesk / DM Mono and outlines
   the glyphs to paths (SVG files) so they render without fonts.
3. Writes public/brand/*.svg and components/brand/mark-paths.ts (inline use).
"""
import json
import os
import sys

import cv2
import numpy as np
import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "_incoming", "logo-actual.jpg")
OUT = os.path.join(ROOT, "public", "brand")
FONTS = os.path.join(os.path.dirname(__file__), "fonts")

C = {
    "tabique": "#9A4F35",
    "viga": "#5B3E2E",
    "fronda": "#33493A",
    "piedra": "#2E2B28",
    "cantera": "#C9BBA5",
    "cal": "#EEE8DD",
    "tabique_light": "#C4694A",
    "fronda_light": "#7C9A83",
}

# --------------------------------------------------------------------------
# 1. Trace the mark
# --------------------------------------------------------------------------
SC = 4  # supersampling factor before contour extraction
MARK_X, MARK_Y = 130, 60  # crop origin of the mark inside the source raster
MARK_W, MARK_H = 470, 460


def masks():
    im = cv2.imread(SRC)
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV).astype(int)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    fg = (s > 60) & (v < 235) | (v < 150)
    green = fg & (h >= 25) & (h <= 90)
    red = fg & ((h <= 12) | (h >= 165)) & (s > 120)
    green[512:] = False  # below this line is the wordmark
    red[512:] = False
    return red, green


def smooth(m):
    m = (m * 255).astype(np.uint8)
    m = cv2.resize(m, None, fx=SC, fy=SC, interpolation=cv2.INTER_CUBIC)
    m = cv2.GaussianBlur(m, (0, 0), 3.5)
    _, m = cv2.threshold(m, 127, 255, cv2.THRESH_BINARY)
    return m


def catmull(pts):
    f = lambda p: f"{p[0]:.1f} {p[1]:.1f}"
    d = ["M" + f(pts[0])]
    n = len(pts)
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = p1 + (p2 - p0) / 6
        c2 = p2 - (p3 - p1) / 6
        d.append("C" + f(c1) + " " + f(c2) + " " + f(p2))
    return "".join(d) + "Z"


def trace(mask, min_area=2500):
    mm = smooth(mask)
    cs, _ = cv2.findContours(mm, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area:
            continue
        a = cv2.approxPolyDP(c, 5.0, True)[:, 0, :].astype(float)
        if len(a) < 4:
            continue
        pts = a / SC - np.array([MARK_X, MARK_Y])
        out.append((float(pts[:, 1].min()), catmull(pts)))
    return sorted(out)


red, green = masks()
bricks = trace(red)
leaves = trace(green)
TOP_ROW = 22  # bricks whose top edge sits above this y form the top course
brick_top = "".join(d for t, d in bricks if t < TOP_ROW)
brick_rest = "".join(d for t, d in bricks if t >= TOP_ROW)
leaf_d = "".join(d for _, d in leaves)
print(f"bricks: {len(bricks)}  leaves: {len(leaves)}")

# --------------------------------------------------------------------------
# 2. Outline text
# --------------------------------------------------------------------------


class Face:
    def __init__(self, file):
        path = os.path.join(FONTS, file)
        self.tt = TTFont(path)
        self.upem = self.tt["head"].unitsPerEm
        self.cap = self.tt["OS/2"].sCapHeight
        self.gs = self.tt.getGlyphSet()
        blob = hb.Blob.from_file_path(path)
        self.hbfont = hb.Font(hb.Face(blob))

    def shape(self, text):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, {"kern": True, "liga": False})
        order = self.tt.getGlyphOrder()
        return [(order[i.codepoint], p.x_advance, p.x_offset) for i, p in zip(buf.glyph_infos, buf.glyph_positions)]

    def width(self, text, size, track=0.0):
        g = self.shape(text)
        adv = sum(a for _, a, _ in g) / self.upem * size
        return adv + track * size * (len(g) - 1)

    def path(self, text, size, x, baseline, track=0.0):
        s = size / self.upem
        pen = SVGPathPen(self.gs)
        cx = 0.0
        for name, adv, off in self.shape(text):
            tp = TransformPen(pen, (s, 0, 0, -s, x + (cx + off) * s, baseline))
            self.gs[name].draw(tp)
            cx += adv + track * self.upem
        return pen.getCommands()


serif = Face("Newsreader-Regular.ttf")
grot = Face("HankenGrotesk-Medium.ttf")
mono = Face("DMMono-Regular.ttf")


def wordmark(x0, y0, width, align="center"):
    """Return (paths, height). Proportions follow the original lock-up:
    Paraje cap 180 / LAS MONJAS cap 46 / rule / JARDÍN cap 26 at 580 wide."""
    k = width / 580.0
    out = {}
    # "Paraje"
    size = 180 * k / (serif.cap / serif.upem)
    w = serif.width("Paraje", size)
    if w > width:
        size *= width / w
        w = width
    cap = size * serif.cap / serif.upem
    x = x0 + (width - w) / 2 if align == "center" else x0
    base = y0 + cap
    out["paraje"] = serif.path("Paraje", size, x, base)
    y = base + 62 * k  # room for the j descender
    # "LAS MONJAS", tracking +42%
    track = 0.42
    lm = "LAS MONJAS"
    size2 = width / (grot.width(lm, 1.0, track))
    cap2 = size2 * grot.cap / grot.upem
    w2 = grot.width(lm, size2, track)
    x2 = x0 + (width - w2) / 2 if align == "center" else x0
    out["monjas"] = grot.path(lm, size2, x2, y + cap2, track)
    y += cap2 + 20 * k
    out["rule"] = (x0, y, width, max(1.0, 1.4 * k))
    y += 20 * k
    # "JARDÍN", tracking +24%
    size3 = 26 * k / (mono.cap / mono.upem)
    w3 = mono.width("JARDÍN", size3, 0.24)
    x3 = x0 + (width - w3) / 2 if align == "center" else x0
    cap3 = size3 * mono.cap / mono.upem
    out["jardin"] = mono.path("JARDÍN", size3, x3, y + cap3, 0.24)
    y += cap3
    return out, y - y0


# --------------------------------------------------------------------------
# 3. Compose files
# --------------------------------------------------------------------------
TONES = {
    "dark": dict(top=C["viga"], brick=C["tabique"], leaf=C["fronda"], word=C["piedra"], monjas=C["fronda"], jardin=C["piedra"], rule=C["cantera"]),
    "light": dict(top=C["tabique_light"], brick=C["tabique_light"], leaf=C["fronda_light"], word=C["cal"], monjas=C["cal"], jardin=C["cal"], rule=C["cantera"]),
    "mono": dict(top=C["piedra"], brick=C["piedra"], leaf=C["piedra"], word=C["piedra"], monjas=C["piedra"], jardin=C["piedra"], rule=C["piedra"]),
}


def mark_group(t, tx=0.0, ty=0.0, scale=1.0):
    tr = f' transform="translate({tx:.2f} {ty:.2f}) scale({scale:.4f})"'
    return (
        f"<g{tr}>"
        f'<path fill="{t["top"]}" d="{brick_top}"/>'
        f'<path fill="{t["brick"]}" d="{brick_rest}"/>'
        f'<path fill="{t["leaf"]}" d="{leaf_d}"/>'
        "</g>"
    )


def word_group(t, wm):
    rx, ry, rw, rh = wm["rule"]
    return (
        f'<path fill="{t["word"]}" d="{wm["paraje"]}"/>'
        f'<path fill="{t["monjas"]}" d="{wm["monjas"]}"/>'
        f'<rect fill="{t["rule"]}" x="{rx:.2f}" y="{ry:.2f}" width="{rw:.2f}" height="{rh:.2f}"/>'
        f'<path fill="{t["jardin"]}" d="{wm["jardin"]}"/>'
    )


def svg(w, h, body, title="Paraje Las Monjas, jardín en Atlixco"):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{body}</svg>\n"
    )


os.makedirs(OUT, exist_ok=True)
PAD = 20  # clear space ≈ height of the top brick course

# vertical lock-up: mark centred over the wordmark, as in the original
VW = 620
mark_scale = 1.0
wm_v, wm_h_v = wordmark(PAD, PAD + MARK_H - 12, VW - 2 * PAD)
vert_h = PAD + MARK_H - 12 + wm_h_v + PAD
# horizontal lock-up: mark left, wordmark right
HM = 150 / MARK_H  # mark height 150
wm_h, wm_hh = wordmark(PAD + MARK_W * HM + 28, 0, 330, align="left")
HH = max(150, wm_hh) + 2 * PAD
wm_h, wm_hh = wordmark(PAD + MARK_W * HM + 28, (HH - wm_hh) / 2, 330, align="left")
HW = PAD + MARK_W * HM + 28 + 330 + PAD

files = {}
for tone, suffix in [("dark", ""), ("light", "-light"), ("mono", "-mono-only")]:
    t = TONES[tone]
    v = mark_group(t, (VW - MARK_W) / 2, PAD) + word_group(t, wm_v)
    h = mark_group(t, PAD, (HH - 150) / 2, HM) + word_group(t, wm_h)
    if tone == "mono":
        files["logo-mono.svg"] = svg(VW, vert_h, v)
        files["logo-horizontal-mono.svg"] = svg(HW, HH, h)
        files["mark-mono.svg"] = svg(MARK_W, MARK_H, mark_group(t))
        continue
    files[f"logo-vertical{suffix}.svg"] = svg(VW, vert_h, v)
    files[f"logo-horizontal{suffix}.svg"] = svg(HW, HH, h)
    files[f"mark{suffix}.svg"] = svg(MARK_W, MARK_H, mark_group(t))

for name, body in files.items():
    with open(os.path.join(OUT, name), "w") as fh:
        fh.write(body)
    print("wrote", name)

# inline data for the <Logo /> component
ts = os.path.join(ROOT, "components", "brand", "mark-paths.ts")
os.makedirs(os.path.dirname(ts), exist_ok=True)
with open(ts, "w") as fh:
    fh.write("// Generated by scripts/brand/build_logo.py. Do not edit by hand.\n")
    fh.write(f"export const MARK_VIEWBOX = '0 0 {MARK_W} {MARK_H}';\n")
    fh.write(f"export const BRICK_TOP = {json.dumps(brick_top)};\n")
    fh.write(f"export const BRICK_REST = {json.dumps(brick_rest)};\n")
    fh.write(f"export const LEAVES = {json.dumps(leaf_d)};\n")
print("wrote", ts)
