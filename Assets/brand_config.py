# ============================================================
# SEVARTH PATH SANSTHANAM — MASTER BRANDING CONFIGURATION
# ============================================================
import base64, os

LOGO_PATH = os.path.join(os.path.dirname(__file__), "logo.png")
_logo_b64 = base64.b64encode(open(LOGO_PATH, "rb").read()).decode()
LOGO_DATA_URI = f"data:image/png;base64,{_logo_b64}"

BRAND = {
    # ── Identity ─────────────────────────────────────────────
    "name_hindi":    "सेवार्थ पथ संस्थानम्",
    "name_eng":      "Sevarth Path Sansthanam",
    "name_eng_full": "SEWARTH PATH SANSTHANAM",
    "tagline_hindi": "सर्वेभ्यः सुखिनः सन्तु",
    "tagline_eng":   "May All Beings Be Happy",
    "motto_hindi":   "सेवा परमो धर्म",
    "motto_eng":     "Service is the Highest Dharma",

    # ── Legal ─────────────────────────────────────────────────
    "reg_no":        "202200996052093",
    "pan":           "ABHTS3090A",
    "act":           "Indian Trusts Act, 1882",
    "incorp_date":   "06/12/2022",
    "trust_creator": "Shri Mahesh Kumar Pandey",

    # ── Contact ───────────────────────────────────────────────
    "address":       "Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi - 221005, UP",
    "address_short": "Plot 516, Kamlesh Nagar, Lanka, Varanasi - 221005",
    "phone":         "+91-9454222116",
    "email":         "info@sewarthpathsansthanam.org",
    "website":       "sewarthpathsansthanam.org",
    "whatsapp":      "919454222116",

    # ── Colors (CSS) ─────────────────────────────────────────
    "c_saffron":     "#FF6B35",
    "c_saffron_dk":  "#C94B15",
    "c_saffron_lt":  "#FFE8DF",
    "c_green":       "#2D6A4F",
    "c_green_dk":    "#1B4332",
    "c_green_lt":    "#D8F3DC",
    "c_gold":        "#C9952A",
    "c_gold_lt":     "#F4A261",
    "c_cream":       "#FFFBF5",
    "c_cream_dk":    "#F5ECD8",
    "c_dark":        "#1A0A00",
    "c_text":        "#2C1810",
    "c_maroon":      "#8B0000",

    # ── Typography ───────────────────────────────────────────
    "font_import":   "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Hind:wght@300;400;500;600;700&family=Yatra+One&family=Poppins:wght@300;400;500;600;700&display=swap",
    "font_hindi":    "'Yatra One', 'Hind', serif",
    "font_eng_hd":   "'Cinzel', 'Playfair Display', serif",
    "font_eng_body": "'Hind', 'Poppins', sans-serif",

    # ── Dimensions ───────────────────────────────────────────
    "margin_a4":     "15mm 20mm",
    "margin_cert":   "10mm 15mm",
    "margin_card":   "0",
}

# ── Shared CSS variables injected into every document ────────
def css_vars(b=BRAND):
    return f"""
    --saffron:   {b['c_saffron']};
    --saffron-dk:{b['c_saffron_dk']};
    --saffron-lt:{b['c_saffron_lt']};
    --green:     {b['c_green']};
    --green-dk:  {b['c_green_dk']};
    --green-lt:  {b['c_green_lt']};
    --gold:      {b['c_gold']};
    --gold-lt:   {b['c_gold_lt']};
    --cream:     {b['c_cream']};
    --cream-dk:  {b['c_cream_dk']};
    --dark:      {b['c_dark']};
    --text:      {b['c_text']};
    --maroon:    {b['c_maroon']};
    """

# ── Shared <head> block ──────────────────────────────────────
def head(title, extra_css="", b=BRAND):
    return f"""
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="author" content="{b['name_eng']}">
<meta name="description" content="Official {title} of {b['name_eng']}">
<title>{title} — {b['name_eng']}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="{b['font_import']}" rel="stylesheet">
<style>
:root {{ {css_vars(b)} }}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0;}}
body{{font-family:{b['font_eng_body']};color:var(--text);background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
img{{max-width:100%;display:block;}}
{extra_css}
</style>"""

# ── Shared logo block ────────────────────────────────────────
def logo_img(size="72px", alt="Sevarth Path Sansthanam Logo"):
    return f'<img src="{LOGO_DATA_URI}" width="{size}" height="{size}" alt="{alt}" style="width:{size};height:{size};object-fit:contain;">'

print("brand_config.py loaded OK")
