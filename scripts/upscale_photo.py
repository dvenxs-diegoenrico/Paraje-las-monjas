"""Faithful 2x super-resolution (EDSR) of one photo: no content is invented.
  python3 -I scripts/upscale_photo.py _incoming/x.jpg _incoming/hd/x.jpg EDSR_x2.pb
Large photos are processed in overlapping tiles to bound memory.
Model: https://github.com/Saafke/EDSR_Tensorflow (needs opencv-contrib-python-headless 4.x)."""
import sys, time, cv2, numpy as np
src, out, model = sys.argv[1], sys.argv[2], sys.argv[3]
sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(model); sr.setModel('edsr' if 'EDSR' in model else 'fsrcnn', 2)
im = cv2.imread(src); t = time.time()
H, W = im.shape[:2]; T, O = 256, 16
up = np.zeros((H * 2, W * 2, 3), np.float32); wt = np.zeros((H * 2, W * 2, 1), np.float32)
for y in range(0, H, T):
    for x in range(0, W, T):
        y0, x0 = max(0, y - O), max(0, x - O)
        y1, x1 = min(H, y + T + O), min(W, x + T + O)
        tile = sr.upsample(im[y0:y1, x0:x1]).astype(np.float32)
        h, w = tile.shape[:2]
        # feathered weights hide tile seams
        wy = np.minimum(np.arange(h) + 1, np.arange(h)[::-1] + 1).clip(max=2 * O).astype(np.float32)
        wx = np.minimum(np.arange(w) + 1, np.arange(w)[::-1] + 1).clip(max=2 * O).astype(np.float32)
        m = (wy[:, None] * wx[None, :])[..., None]
        up[2 * y0:2 * y0 + h, 2 * x0:2 * x0 + w] += tile * m
        wt[2 * y0:2 * y0 + h, 2 * x0:2 * x0 + w] += m
up = (up / np.maximum(wt, 1e-6)).clip(0, 255).astype(np.uint8)
blur = cv2.GaussianBlur(up, (0, 0), 1.2)
up = cv2.addWeighted(up, 1.25, blur, -0.25, 0)
cv2.imwrite(out, up, [cv2.IMWRITE_JPEG_QUALITY, 95])
print(src.split('/')[-1], W, '->', up.shape[1], f'{time.time()-t:.1f}s')
