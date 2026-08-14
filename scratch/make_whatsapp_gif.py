import math
from PIL import Image, ImageDraw

def create_whatsapp_gif(output_path, size=120, frames_count=20):
    frames = []
    
    for i in range(frames_count):
        # Create transparent base
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        center = size / 2
        r_inner = size * 0.35
        
        # Pulse animation
        progress = i / frames_count
        pulse_r = r_inner + (size * 0.12) * math.sin(progress * math.pi * 2)
        pulse_alpha = int(100 + 100 * math.sin(progress * math.pi * 2))
        
        # Outer soft glow ring
        draw.ellipse(
            [center - pulse_r, center - pulse_r, center + pulse_r, center + pulse_r],
            fill=(37, 211, 102, pulse_alpha // 3),
            outline=(37, 211, 102, pulse_alpha),
            width=2
        )
        
        # Main WhatsApp Green Circle
        draw.ellipse(
            [center - r_inner, center - r_inner, center + r_inner, center + r_inner],
            fill=(37, 211, 102, 255)
        )
        
        # Draw WhatsApp phone bubble inside
        # Outer bubble
        b_r = r_inner * 0.65
        draw.ellipse(
            [center - b_r, center - b_r + 1, center + b_r, center + b_r + 1],
            fill=(255, 255, 255, 255)
        )
        
        # Tail for speech bubble
        draw.polygon(
            [(center - b_r * 0.7, center + b_r * 0.4),
             (center - b_r * 1.1, center + b_r * 1.0),
             (center - b_r * 0.2, center + b_r * 0.7)],
            fill=(255, 255, 255, 255)
        )
        
        # Inner phone shape (green cutout)
        p_r = b_r * 0.75
        draw.ellipse(
            [center - p_r, center - p_r + 1, center + p_r, center + p_r + 1],
            fill=(37, 211, 102, 255)
        )
        
        # White phone receiver inside
        rec_r = p_r * 0.5
        draw.ellipse(
            [center - rec_r + 2, center - rec_r + 2, center + rec_r - 2, center + rec_r - 2],
            fill=(255, 255, 255, 255)
        )
        
        frames.append(img)
        
    # Save as GIF
    frames[0].save(
        output_path,
        save_all=True,
        append_images=frames[1:],
        duration=50,
        loop=0,
        transparency=0,
        disposal=2
    )
    print(f"Created {output_path}")

create_whatsapp_gif('images/gifs/whatsapp.gif')
