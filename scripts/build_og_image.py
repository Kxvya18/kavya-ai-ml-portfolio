"""Generate a 1200x630 OpenGraph image for Kavya Kalavala's portfolio.

Design: dark parchment background, subtle graph-node decoration on right,
big serif name/headline on left, eyebrow above and label pills below.
Output: /app/frontend/public/og-image.png
"""
import os
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (14, 12, 8)
FG_HEADLINE = (245, 239, 224)
FG_SUB = (184, 172, 140)
FG_MUTED = (138, 124, 92)
GOLD = (201, 169, 97)

OUT = "/app/frontend/public/og-image.png"


def load_font(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


serif_candidates = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
    "/usr/share/fonts/TTF/DejaVuSerif-Bold.ttf",
]
sans_candidates = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
]
mono_candidates = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
]

f_headline = load_font(serif_candidates, 76)
f_name = load_font(serif_candidates, 40)
f_eyebrow = load_font(mono_candidates, 18)
f_sub = load_font(sans_candidates, 22)
f_pill = load_font(mono_candidates, 15)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img, "RGBA")

# Subtle radial vignette
for r in range(0, 260, 4):
    a = int(28 * (1 - r / 260))
    draw.ellipse(
        (600 - r - 100, 315 - r - 60, 600 + r + 100, 315 + r + 60),
        outline=(30, 22, 10, a),
        width=1,
    )

# Right-side graph network decoration
random.seed(42)
nodes = []
for i in range(28):
    a = i * (2 * math.pi / 28)
    r = 190 + random.random() * 60
    cx = 920 + math.cos(a) * r
    cy = 315 + math.sin(a) * r
    nodes.append((cx, cy))

# random extra clusters
for _ in range(10):
    nodes.append((820 + random.random() * 320, 120 + random.random() * 400))

# edges
for i in range(len(nodes)):
    for j in range(i + 1, len(nodes)):
        dx = nodes[i][0] - nodes[j][0]
        dy = nodes[i][1] - nodes[j][1]
        d = math.hypot(dx, dy)
        if d < 140:
            draw.line(
                (nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1]),
                fill=(138, 124, 92, 90),
                width=1,
            )

# nodes
for (x, y) in nodes:
    size = random.choice([3, 4, 5, 6, 7])
    draw.ellipse(
        (x - size, y - size, x + size, y + size),
        fill=(230, 217, 168, 230),
    )

# Small graph glow overlay behind text
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
odraw = ImageDraw.Draw(overlay)
odraw.rectangle(
    (0, 0, 720, H),
    fill=(14, 12, 8, 220),
)
img.paste(overlay, (0, 0), overlay)

# Left column text
LX = 80

# eyebrow with dot
eyebrow = "AI ENGINEERING / ML RESEARCH / GRAPH INTELLIGENCE"
draw.text((LX, 120), eyebrow, font=f_eyebrow, fill=GOLD)

# Headline (two lines)
draw.text((LX, 165), "Building AI systems", font=f_headline, fill=FG_HEADLINE)
draw.text((LX, 250), "with math, graphs,", font=f_headline, fill=FG_HEADLINE)
draw.text((LX, 335), "and code.", font=f_headline, fill=FG_HEADLINE)

# Name row
draw.text((LX, 440), "Kavya Kalavala", font=f_name, fill=FG_HEADLINE)
draw.text((LX, 490), "portfolio · lab · resume", font=f_sub, fill=FG_MUTED)

# Bottom pill labels
pills = ["AI ENGINEERING", "LLM SYSTEMS", "GRAPHS + TOPOLOGY", "MODEL EVALUATION"]
px = LX
py = 545
for p in pills:
    # measure
    bbox = draw.textbbox((0, 0), p, font=f_pill)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    pad_x, pad_y = 14, 8
    rect = (px, py, px + w + pad_x * 2, py + h + pad_y * 2)
    draw.rounded_rectangle(rect, radius=18, outline=(90, 83, 64, 255), width=1)
    draw.text((px + pad_x, py + pad_y - 2), p, font=f_pill, fill=FG_SUB)
    px += w + pad_x * 2 + 10

# Bottom-right small mark
draw.text((W - 220, H - 40), "kavya-kalavala.portfolio", font=f_eyebrow, fill=FG_MUTED)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print("OK ->", OUT, os.path.getsize(OUT), "bytes")
