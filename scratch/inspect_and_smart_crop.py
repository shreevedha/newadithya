import os
from PIL import Image

doc_dir = 'images/doctors'
files = [f for f in os.listdir(doc_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.JPG', '.PNG'))]

print(f"Total doctor images to smart-crop: {len(files)}")

# Custom crop overrides for images where doctor is off-center or has wide background
custom_crops = {
    # 'filename': (left_pct, top_pct, right_pct, bottom_pct)
    'krishna-sravanth.jpg': (0.40, 0.05, 0.98, 0.95),
    'Dr_Krishna_Sravanth_Pakanati.jpg': (0.40, 0.05, 0.98, 0.95),
    'Dr_Sai_Krishna_Katakam.jpeg': (0.15, 0.0, 0.85, 0.95),
    'sai-krishna-katakam.jpeg': (0.15, 0.0, 0.85, 0.95),
    'Dr_Raghu_Sarath_Punukollu.jpg': (0.10, 0.0, 0.90, 0.95),
    'raghu-sarath.jpg': (0.10, 0.0, 0.90, 0.95),
    'Dr_Guttikonda_Bhanu_Vijay.jpeg': (0.10, 0.0, 0.90, 0.95),
    'dr-guttikonda.jpeg': (0.10, 0.0, 0.90, 0.95),
    'Dr Guttikonda Bhanu Vijay.jpeg': (0.10, 0.0, 0.90, 0.95),
    'Dr_Viswa_Jyothi_Yakkala.jpeg': (0.05, 0.0, 0.95, 0.95),
    'dr-viswa-jyothi.jpeg': (0.05, 0.0, 0.95, 0.95),
    'Dr. VISWA JYOTHI YAKKALA.jpeg': (0.05, 0.0, 0.95, 0.95),
    'Dr_Pathan_Sajila_Rehmath.jpeg': (0.05, 0.0, 0.95, 0.95),
    'dr-sajila.jpeg': (0.05, 0.0, 0.95, 0.95),
    'DR sajila.jpeg': (0.05, 0.0, 0.95, 0.95),
    'Dr_Farha_Naaz_Khatoon.jpeg': (0.05, 0.0, 0.95, 0.95),
    'dr-farha.jpeg': (0.05, 0.0, 0.95, 0.95),
    'Dr Fraha.jpeg': (0.05, 0.0, 0.95, 0.95),
    'Dr_Kothamasu_Dinesh.jpeg': (0.15, 0.0, 0.95, 0.95),
    'dr-dinesh.jpeg': (0.15, 0.0, 0.95, 0.95),
    'Dr Dinesh.jpeg': (0.15, 0.0, 0.95, 0.95),
    'Dr_Sunil_Kumar_Thadigiri.jpeg': (0.05, 0.0, 0.95, 0.95),
    'dr-sunil-thadigiri.jpeg': (0.05, 0.0, 0.95, 0.95),
    'Dr. SUNIL KUMAR THADIGIRI.jpeg': (0.05, 0.0, 0.95, 0.95),
    'Dr_Jakkireddy_Sravani.jpeg': (0.0, 0.0, 1.0, 0.95),
    'dr-sravani-jakkireddy.jpeg': (0.0, 0.0, 1.0, 0.95),
    'Dr_Meena_Mannava.jpeg': (0.0, 0.0, 1.0, 0.95),
    'dr-meena.jpeg': (0.0, 0.0, 1.0, 0.95),
    'Dr Meena.jpeg': (0.0, 0.0, 1.0, 0.95),
}

target_aspect = 3 / 4.0  # 3:4 portrait (e.g. 600x800)

for f in files:
    path = os.path.join(doc_dir, f)
    try:
        img = Image.open(path)
        w, h = img.size
        
        if f in custom_crops:
            l_pct, t_pct, r_pct, b_pct = custom_crops[f]
            crop_box = (int(w * l_pct), int(h * t_pct), int(w * r_pct), int(h * b_pct))
            cropped = img.crop(crop_box)
        else:
            # Default center crop to 3:4 aspect ratio
            current_aspect = w / float(h)
            if current_aspect > target_aspect:
                # Image is too wide -> crop sides
                new_w = int(h * target_aspect)
                left = (w - new_w) // 2
                crop_box = (left, 0, left + new_w, h)
            else:
                # Image is too tall -> crop bottom
                new_h = int(w / target_aspect)
                crop_box = (0, 0, w, new_h)
            cropped = img.crop(crop_box)
        
        # Resize to standard high-res portrait 600x800
        resized = cropped.resize((600, 800), Image.Resampling.LANCZOS)
        
        # Save back in original format
        if f.lower().endswith('.png'):
            resized.save(path, format='PNG')
        else:
            resized.convert('RGB').save(path, format='JPEG', quality=95)
            
        print(f"Smart-cropped {f}: {w}x{h} -> 600x800")
    except Exception as e:
        print(f"Error processing {f}: {e}")

print("All doctor photos successfully smart-cropped to centered 3:4 portraits!")
