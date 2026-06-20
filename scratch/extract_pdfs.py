import pdfplumber
import os
import sys

# Ensure utf-8 output if printing
# sys.stdout.reconfigure(encoding='utf-8')

files = [
    r"d:\sewarthpathsansthanam\Sewarth Path Sansthanam NGO Website_ PRD & TRD.pdf",
    r"d:\sewarthpathsansthanam\NGO वेबसाइट निर्माण हेतु विस्तृत योजना.pdf"
]

output_file = r"d:\sewarthpathsansthanam\scratch\extracted_content.md"

with open(output_file, "w", encoding="utf-8") as f:
    for file in files:
        f.write(f"# --- Extracting {os.path.basename(file)} ---\n\n")
        try:
            with pdfplumber.open(file) as pdf:
                for i, page in enumerate(pdf.pages):
                    f.write(f"## Page {i+1}\n\n")
                    text = page.extract_text()
                    if text:
                        f.write(text)
                    f.write("\n\n--- Page Break ---\n\n")
        except Exception as e:
            f.write(f"Error reading {file}: {e}\n\n")

print(f"Extraction complete. Check {output_file}")
