import os
import math
from PIL import Image, ImageDraw, ImageFont

samples_dir = os.path.dirname(os.path.abspath(__file__))

def create_sample_fire_noc(tampered: bool = True):
    # High-res 1200x800 realistic government certificate
    w, h = 1200, 800
    img = Image.new('RGB', (w, h), (252, 252, 254))
    draw = ImageDraw.Draw(img)

    # Formal certificate double border
    draw.rectangle([20, 20, w - 21, h - 21], outline=(30, 58, 138), width=3)
    draw.rectangle([28, 28, w - 29, h - 29], outline=(203, 213, 225), width=1)

    # Header Emblem / Decorative Motif
    draw.ellipse([w//2 - 28, 45, w//2 + 28, 101], outline=(30, 58, 138), width=2)
    font_h1 = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 24)
    font_h2 = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 16)
    font_body = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 15)
    font_body_b = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 15)
    font_stamp = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 11)

    # Header Text
    draw.text((w//2 - 12, 60), "★", fill=(30, 58, 138), font=font_h1)
    
    t1 = "GOVERNMENT OF MAHARASHTRA • URBAN DEVELOPMENT DEPARTMENT"
    bbox1 = font_h2.getbbox(t1)
    draw.text(((w - (bbox1[2]-bbox1[0]))//2, 115), t1, fill=(71, 85, 105), font=font_h2)

    t2 = "DIRECTORATE OF FIRE & EMERGENCY SERVICES"
    bbox2 = font_h1.getbbox(t2)
    draw.text(((w - (bbox2[2]-bbox2[0]))//2, 142), t2, fill=(15, 23, 42), font=font_h1)

    t3 = "FIRE SAFETY CLEARANCE & NO OBJECTION CERTIFICATE (NOC)"
    bbox3 = font_h2.getbbox(t3)
    draw.text(((w - (bbox3[2]-bbox3[0]))//2, 178), t3, fill=(30, 58, 138), font=font_h2)

    draw.line([80, 215, w - 80, 215], fill=(226, 232, 240), width=2)

    # Certificate Details Table
    draw.text((80, 240), "Certificate Reference No :", fill=(71, 85, 105), font=font_body)
    draw.text((320, 240), "FSC / 2024 / MUM / 8821", fill=(15, 23, 42), font=font_body_b)

    draw.text((80, 280), "Issued To (Institute) :", fill=(71, 85, 105), font=font_body)
    draw.text((320, 280), "Technovation Engineering Institute (AICTE Campus Code: 1-94821)", fill=(15, 23, 42), font=font_body_b)

    draw.text((80, 320), "Campus Location / Survey :", fill=(71, 85, 105), font=font_body)
    draw.text((320, 320), "Plot 42-B, Sector 18, Institutional Zone, Knowledge Corridor", fill=(15, 23, 42), font=font_body)

    draw.text((80, 360), "Approved Building Height :", fill=(71, 85, 105), font=font_body)
    draw.text((320, 360), "Ground + 4 Storeys (Total Height: 18.5 meters)", fill=(15, 23, 42), font=font_body)

    draw.text((80, 400), "Initial Issuance Date :", fill=(71, 85, 105), font=font_body)
    draw.text((320, 400), "01-April-2023", fill=(15, 23, 42), font=font_body)

    # Validity Period (The target of tampering if tampered=True)
    draw.text((80, 440), "Statutory Validity Period :", fill=(71, 85, 105), font=font_body)
    
    # Save baseline to JPEG
    buf = io_buf = os.path.join(samples_dir, "_temp.jpg")
    img.save(buf, format="JPEG", quality=90)
    img_reloaded = Image.open(buf).convert('RGB')
    draw_r = ImageDraw.Draw(img_reloaded)

    if tampered:
        # First draw the genuine text
        draw_r.text((320, 440), "01-Apr-2023 to 31-Mar-", fill=(15, 23, 42), font=font_body_b)
        # Spliced altered date at different compression/quality
        draw_r.text((505, 440), "2026", fill=(10, 20, 50), font=font_body_b)
        # Add subtle ELA compression delta around '2026'
        for y in range(435, 465):
            for x in range(500, 560):
                p = img_reloaded.getpixel((x, y))
                img_reloaded.putpixel((x, y), (min(255, p[0] + 4), max(0, p[1] - 4), p[2]))
    else:
        draw_r.text((320, 440), "01-Apr-2023 to 31-Mar-2026", fill=(15, 23, 42), font=font_body_b)

    # Statutory Certification Paragraph
    p_text = (
        "This is to certify that the institutional premises inspected have complied with the statutory provisions "
        "of the National Building Code of India (NBC 2016 Part 4) and Maharashtra Fire Prevention & Life Safety "
        "Measures Act. All wet risers, automatic sprinklers, smoke detectors, and emergency egress stairs are operational."
    )
    # Simple word wrap
    words = p_text.split()
    lines = []
    cur_line = []
    for w_item in words:
        cur_line.append(w_item)
        if len(" ".join(cur_line)) > 95:
            lines.append(" ".join(cur_line))
            cur_line = []
    if cur_line:
        lines.append(" ".join(cur_line))

    y_p = 500
    for l in lines:
        draw_r.text((80, y_p), l, fill=(51, 65, 85), font=font_body)
        y_p += 22

    # Add Official Municipal Fire Safety Ink Stamp
    cx, cy = 240, 680
    ink = (26, 54, 93) # Deep municipal navy ink
    draw_r.ellipse([cx - 55, cy - 55, cx + 55, cy + 55], outline=ink, width=3)
    draw_r.ellipse([cx - 44, cy - 44, cx + 44, cy + 44], outline=ink, width=2)
    draw_r.line([cx - 30, cy - 10, cx + 30, cy - 10], fill=ink, width=1)
    draw_r.text((cx - 30, cy - 8), "APPROVED", fill=ink, font=font_stamp)
    draw_r.line([cx - 30, cy + 8, cx + 30, cy + 8], fill=ink, width=1)
    draw_r.text((cx - 28, cy + 12), "REG: 4482/FS", fill=ink, font=font_stamp)
    draw_r.text((cx - 42, cy - 35), "★ FIRE SAFETY ★", fill=ink, font=font_stamp)
    draw_r.text((cx - 45, cy + 28), "MUNICIPAL CORP", fill=ink, font=font_stamp)

    # Signatures
    draw_r.line([w - 360, 710, w - 120, 710], fill=(71, 85, 105), width=1)
    draw_r.text((w - 330, 718), "CHIEF FIRE OFFICER", fill=(15, 23, 42), font=font_body_b)
    draw_r.text((w - 355, 738), "Directorate of Fire & Emergency Services", fill=(100, 116, 139), font=font_body)

    out_name = "sample_fire_noc_tampered.jpg" if tampered else "sample_fire_noc_authentic.jpg"
    out_path = os.path.join(samples_dir, out_name)
    img_reloaded.save(out_path, format="JPEG", quality=95)
    if os.path.exists(io_buf):
        os.remove(io_buf)
    print(f"Generated {out_name} ({w}x{h})")

if __name__ == "__main__":
    create_sample_fire_noc(tampered=True)
    create_sample_fire_noc(tampered=False)
