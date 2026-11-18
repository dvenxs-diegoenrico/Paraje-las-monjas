"""Grade the placeholder photos and write public/images + lib/images.meta.json.
  python3 -I scripts/process_photos.py

If _incoming/hd/<name>.jpg exists (a faithful 2x EDSR super-resolution made by
scripts/upscale_photos.py) it is used instead of the original.
Grade: restrained greens (-15% saturation, greens -25%), slightly warm, soft blacks."""
import base64, json, os, cv2, numpy as np
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC, OUT = os.path.join(ROOT, '_incoming'), os.path.join(ROOT, 'public', 'images')

def grade(bgr):
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).astype(np.float32)
    h = hsv[..., 0]
    green = ((h > 25) & (h < 90)).astype(np.float32)
    hsv[..., 1] *= 0.85 - 0.12 * green
    out = cv2.cvtColor(np.clip(hsv, 0, 255).astype(np.uint8), cv2.COLOR_HSV2BGR).astype(np.float32)
    out[..., 2] *= 1.02; out[..., 0] *= 0.96          # warm
    out = 10 + out * (245 / 255)                        # soft blacks / highlights
    return np.clip(out, 0, 255).astype(np.uint8)

def blur(bgr):
    small = cv2.resize(bgr, (12, max(1, round(12 * bgr.shape[0] / bgr.shape[1]))), interpolation=cv2.INTER_AREA)
    ok, buf = cv2.imencode('.jpg', small, [cv2.IMWRITE_JPEG_QUALITY, 60])
    return 'data:image/jpeg;base64,' + base64.b64encode(buf).decode()

def sky_alpha(bgr):
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).astype(int)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    b, g = bgr[..., 0].astype(int), bgr[..., 1].astype(int)
    sky = (((h >= 90) & (h <= 130) & (s > 35) & (b > g + 10)) | ((s < 45) & (v > 185) & (b >= g - 5))).astype(np.uint8)
    n, lab = cv2.connectedComponents(sky)
    m = np.isin(lab, list(set(lab[0][sky[0] > 0]))).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    return cv2.GaussianBlur(((1 - m) * 255).astype(np.uint8), (0, 0), 0.7)

meta = {}
for f in sorted(os.listdir(SRC)):
    if not f.endswith('.jpg') or f.startswith('logo'):
        continue
    hd = os.path.join(SRC, 'hd', f)
    im = cv2.imread(hd if os.path.exists(hd) else os.path.join(SRC, f))
    g = grade(im)
    cv2.imwrite(os.path.join(OUT, f), g, [cv2.IMWRITE_JPEG_QUALITY, 90])
    meta[f[:-4]] = {'w': g.shape[1], 'h': g.shape[0], 'blur': blur(g)}
    if f in ('jardin-arboles-1.jpg', 'jardin-multiusos-1.jpg'):
        rgba = cv2.cvtColor(g, cv2.COLOR_BGR2BGRA); rgba[..., 3] = sky_alpha(im)
        name = f[:-4] + '-recorte'
        cv2.imwrite(os.path.join(OUT, name + '.png'), rgba)
        meta[name] = {'w': g.shape[1], 'h': g.shape[0], 'blur': ''}
json.dump(meta, open(os.path.join(ROOT, 'lib', 'images.meta.json'), 'w'), indent=1)
print('\n'.join(f"{k} {v['w']}x{v['h']}" for k, v in meta.items()))
