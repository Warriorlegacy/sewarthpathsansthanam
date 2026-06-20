"""
======================================================
SEVARTH PATH SANSTHANAM — MASTER DOCUMENT GENERATOR
======================================================
Usage:  python3 generate_all.py
Output: 8 files (4 HTML + 4 PDF) in ./output/
======================================================
"""
import os, sys, subprocess, importlib

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

GENERATORS = [
    ("generate_letterhead",    "letterhead"),
    ("generate_membership_form","membership_form"),
    ("generate_id_card",       "identity_card"),
    ("generate_certificate",   "certificate"),
]

sys.path.insert(0, os.path.dirname(__file__))

for module_name, doc_name in GENERATORS:
    print(f"\n{'='*50}")
    print(f"  Generating: {doc_name}")
    mod = importlib.import_module(module_name)
    html = mod.build_html()

    html_path = os.path.join(OUTPUT_DIR, f"{doc_name}_HTML.html")
    pdf_path  = os.path.join(OUTPUT_DIR, f"{doc_name}_PDF.pdf")

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  ✅ HTML: {html_path}")

    try:
        from weasyprint import HTML as WP
        WP(string=html, base_url=os.path.dirname(__file__)+"/").write_pdf(pdf_path)
        print(f"  ✅ PDF:  {pdf_path}")
    except Exception as e:
        print(f"  ❌ PDF error: {e}")

print(f"\n{'='*50}")
print("  ALL DOCUMENTS GENERATED SUCCESSFULLY")
print(f"  Output folder: {OUTPUT_DIR}")
