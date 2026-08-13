import os
from PIL import Image

doc_dir = 'images/doctors'
files = [f for f in os.listdir(doc_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.JPG', '.PNG'))]

fixed_count = 0
for f in files:
    path = os.path.join(doc_dir, f)
    try:
        img = Image.open(path).convert('RGB')
        w, h = img.size
        # Check if height < width * 1.2 or if tight
        ratio = w / h
        # If ratio is wider than 0.72 (e.g. square 1.0 or wide 0.8), or tight head
        if ratio > 0.72:
            top_pad = int(h * 0.15)
            side_pad = int(w * 0.05)
            corner_pixel = img.getpixel((5, 5))
            new_w = w + (side_pad * 2)
            new_h = h + top_pad
            padded_img = Image.new('RGB', (new_w, new_h), corner_pixel)
            padded_img.paste(img, (side_pad, top_pad))
            padded_img.save(path, quality=95)
            fixed_count += 1
            print(f"Padded tight doctor photo: {f} ({w}x{h} -> {new_w}x{new_h})")
    except Exception as e:
        print(f"Error checking {f}: {e}")

print(f"\nTotal doctor photos padded & framed: {fixed_count}")
