import os
from PIL import Image

doc_dir = 'images/doctors'
files = [f for f in os.listdir(doc_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.JPG', '.PNG'))]

print(f"Total doctor images found: {len(files)}")
for f in sorted(files):
    path = os.path.join(doc_dir, f)
    try:
        with Image.open(path) as img:
            w, h = img.size
            ratio = round(w / h, 2)
            if 'sravani' in f.lower():
                print(f"  --> [TARGET] {f}: {w}x{h} (w/h ratio: {ratio})")
            elif ratio > 0.9 or ratio < 0.65:
                print(f"  [UNUSUAL RATIO] {f}: {w}x{h} (w/h ratio: {ratio})")
    except Exception as e:
        print(f"  [ERROR opening {f}]: {e}")
