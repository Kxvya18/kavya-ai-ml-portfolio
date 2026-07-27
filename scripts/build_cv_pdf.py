"""Convert the docx CV into a nicely formatted PDF using reportlab.

Preserves headings, paragraphs, bold runs (via python-docx).
Output: /app/frontend/public/assets/kavya_kalavala_cv.pdf
"""
from docx import Document
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable
)
from reportlab.lib.enums import TA_LEFT
import re
import os

SRC = "/app/scripts/cv.docx"
OUT = "/app/frontend/public/assets/kavya_kalavala_cv.pdf"

doc = Document(SRC)
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "Title", parent=styles["Title"],
    fontName="Times-Bold", fontSize=22, leading=26,
    alignment=TA_LEFT, textColor=HexColor("#1a1408"),
    spaceAfter=4,
)
contact_style = ParagraphStyle(
    "Contact", parent=styles["Normal"],
    fontName="Helvetica", fontSize=10, leading=13,
    textColor=HexColor("#4a3e28"), spaceAfter=10,
)
h1_style = ParagraphStyle(
    "H1", parent=styles["Heading1"],
    fontName="Times-Bold", fontSize=13, leading=16,
    textColor=HexColor("#8a6b2a"), spaceBefore=12, spaceAfter=6,
    textTransform="uppercase",
)
body_style = ParagraphStyle(
    "Body", parent=styles["BodyText"],
    fontName="Helvetica", fontSize=10, leading=14,
    textColor=HexColor("#20180a"), spaceAfter=6, alignment=TA_LEFT,
)

def para_html(paragraph):
    """Convert python-docx paragraph into ReportLab-friendly HTML with bold/italic."""
    parts = []
    for run in paragraph.runs:
        text = run.text or ""
        text = (text.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;"))
        if not text:
            continue
        if run.bold and run.italic:
            parts.append(f"<b><i>{text}</i></b>")
        elif run.bold:
            parts.append(f"<b>{text}</b>")
        elif run.italic:
            parts.append(f"<i>{text}</i>")
        else:
            parts.append(text)
    return "".join(parts)


story = []
first_para_done = False
first_heading_done = False

for p in doc.paragraphs:
    text = p.text.strip()
    style_name = (p.style.name or "").lower()
    if not text:
        story.append(Spacer(1, 4))
        continue

    if not first_para_done:
        # first paragraph -> name/title
        story.append(Paragraph(text, title_style))
        first_para_done = True
        continue

    if not first_heading_done and " | " in text and "@" in text:
        story.append(Paragraph(text, contact_style))
        story.append(HRFlowable(width="100%", thickness=0.6,
                                color=HexColor("#c0b48a"),
                                spaceBefore=2, spaceAfter=10))
        first_heading_done = True
        continue

    if "heading 1" in style_name or (
        text.isupper() and len(text) < 60
    ):
        story.append(Spacer(1, 6))
        story.append(Paragraph(text, h1_style))
        story.append(HRFlowable(width="100%", thickness=0.4,
                                color=HexColor("#e0d5b8"),
                                spaceBefore=1, spaceAfter=6))
        continue

    story.append(Paragraph(para_html(p), body_style))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
SimpleDocTemplate(
    OUT, pagesize=LETTER,
    leftMargin=0.7 * inch, rightMargin=0.7 * inch,
    topMargin=0.7 * inch, bottomMargin=0.7 * inch,
    title="Kavya Kalavala – CV",
    author="Kavya Kalavala",
).build(story)

print(f"OK -> {OUT}")
print("size:", os.path.getsize(OUT), "bytes")
