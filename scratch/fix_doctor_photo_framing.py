import os
from PIL import Image, ImageOps, ImageFilter

def pad_doctor_image(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return
    
    img = Image.open(input_path).convert('RGB')
    w, h = img.size
    
    # Check top background color (sample top left/right pixels)
    corner_pixel = img.getpixel((5, 5))
    
    # Create a padded image with 15% extra top padding to give top of head breathing room
    top_pad = int(h * 0.18)
    side_pad = int(w * 0.08)
    
    new_w = w + (side_pad * 2)
    new_h = h + top_pad
    
    # Create new image with the corner background color
    padded_img = Image.new('RGB', (new_w, new_h), corner_pixel)
    
    # Paste original image at (side_pad, top_pad)
    padded_img.paste(img, (side_pad, top_pad))
    
    # Save back
    padded_img.save(output_path, quality=95)
    print(f"Successfully re-framed & padded {input_path} -> {output_path} ({w}x{h} -> {new_w}x{new_h})")

# Process Dr. Sravani Jakkireddy images
pad_doctor_image('images/doctors/dr-sravani-jakkireddy.jpeg', 'images/doctors/dr-sravani-jakkireddy.jpeg')
pad_doctor_image('images/doctors/Dr_Jakkireddy_Sravani.jpeg', 'images/doctors/Dr_Jakkireddy_Sravani.jpeg')
