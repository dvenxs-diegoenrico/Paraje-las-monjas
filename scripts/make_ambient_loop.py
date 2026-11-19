"""
Ambient hero loop built from the venue's own photographs (no footage needed).
Slow push-in on each photograph with long cross-fades; the last frame equals
the first so it loops without a cut.

  python3 -I scripts/make_ambient_loop.py

Replace public/video/hero-loop.mp4 with real footage (muted, 1280x720, < 3 MB)
whenever the client has it; the page code does not change.
Needs: ffmpeg with libx264, Pillow.
"""
import os, subprocess, tempfile
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
IMG = os.path.join(ROOT, 'public', 'images')
OUT = os.path.join(ROOT, 'public', 'video')
W, H, FPS, CLIP, FADE = 1280, 720, 24, 5.0, 1.0

# (file, vertical focus 0..1): graded site photos, cropped to 16:9
SHOTS = [('pabellon-cristal.jpg', 0.58), ('salon-piedra.jpg', 0.62), ('jardin-arboles-1.jpg', 0.55)]

def crop(name, fy, dest):
    im = Image.open(os.path.join(IMG, name)).convert('RGB')
    w, h = im.size
    ch = round(w * 9 / 16)
    top = max(0, min(h - ch, round(h * fy - ch / 2)))
    im.crop((0, top, w, top + ch)).resize((W * 2, H * 2), Image.LANCZOS).save(dest, quality=95)

tmp = tempfile.mkdtemp()
files = []
for i, (n, fy) in enumerate(SHOTS):
    d = os.path.join(tmp, f'{i}.jpg'); crop(n, fy, d); files.append(d)
files.append(files[0])  # closing clip = first photograph again

frames = round(CLIP * FPS)
inputs, chains = [], []
for i, f in enumerate(files):
    inputs += ['-i', f]  # one frame in; zoompan makes `frames` frames from it
    last = i == len(files) - 1
    # push-in on every clip; the closing clip pulls back out to rest where clip 0 starts
    z = f"if(lte(on,1),1.09,max(1.0,zoom-{0.09 / frames:.6f}))" if last else f"min(1.09,1.0+{0.09 / frames:.6f}*on)"
    chains.append(f"[{i}:v]zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s={W}x{H}:fps={FPS},format=yuv420p[v{i}]")
mix, prev = [], 'v0'
for i in range(1, len(files)):
    off = i * (CLIP - FADE)
    nxt = f'x{i}'
    mix.append(f"[{prev}][v{i}]xfade=transition=fade:duration={FADE}:offset={off}[{nxt}]")
    prev = nxt
fc = ';'.join(chains + mix)
mp4 = os.path.join(OUT, 'hero-loop.mp4')
subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', fc, '-map', f'[{prev}]', '-an',
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '31', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', str(FPS), mp4], check=True)
Image.open(files[0]).resize((W, H), Image.LANCZOS).save(os.path.join(OUT, 'hero-poster.jpg'), quality=82)
print(mp4, round(os.path.getsize(mp4) / 1e6, 2), 'MB')
