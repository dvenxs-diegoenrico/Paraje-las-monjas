"""Faithful 2x super-resolution (EDSR) of one photo: no content is invented.
  python3 -I scripts/upscale_photo.py _incoming/x.jpg _incoming/hd/x.jpg EDSR_x2.pb
Model: https://github.com/Saafke/EDSR_Tensorflow (needs opencv-contrib-python-headless 4.x)."""
import sys, time, cv2, numpy as np
src, out, model = sys.argv[1], sys.argv[2], sys.argv[3]
sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(model); name = 'edsr' if 'EDSR' in model else 'fsrcnn'; sr.setModel(name, 2)
im = cv2.imread(src); t=time.time()
up = sr.upsample(im)
# gentle detail recovery, no halos
blur = cv2.GaussianBlur(up, (0,0), 1.2)
up = cv2.addWeighted(up, 1.25, blur, -0.25, 0)
cv2.imwrite(out, up, [cv2.IMWRITE_JPEG_QUALITY, 95])
print(src.split('/')[-1], im.shape[1], '->', up.shape[1], f'{time.time()-t:.1f}s')
