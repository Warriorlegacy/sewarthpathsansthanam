# Sewarth Path Sansthanam — NGO Branding & Official Documents Design System

Website: https://sewarthpathsansthanam.vercel.app/en

Primary Brand Identity:
- Theme: Service • Humanity • Dharma • Empowerment • Cultural Values
- Main Colors:
  - Deep Saffron/Orange: #D97706
  - Dark Brown: #2A120B
  - Gold Accent: #FBBF24
  - White: #FFFFFF
  - Green Accent: #15803D
- Font Pairing:
  - Hindi: Mukta / Poppins Devanagari / Noto Sans Devanagari
  - English: Poppins / Inter
- Motto:
  "सर्वेभ्य: सुखिन: सन्तु"
- NGO Name in Hindi:
  "सेवार्थ पथ संस्थानम्"

---

# 1. OFFLINE MEMBERSHIP FORM DESIGN

## Overall Style
A premium A4 portrait membership form with:
- Clean modern NGO styling
- Saffron-gold header
- Subtle Indian cultural patterns in background
- NGO logo watermark in low opacity
- QR code section
- Signature verification area
- Membership ID generation section

---

# FORM LAYOUT

## TOP HEADER

### Left Side
NGO Logo

### Center
# सेवार्थ पथ संस्थानम्
### Sewarth Path Sansthanam
#### “सेवा परमो धर्म:”

### Right Side
- Registration Number
- NGO PAN
- Website URL
- Contact Number
- Email Address

Background strip:
Gradient saffron → brown with golden border.

---

# MEMBER REGISTRATION TITLE

## सदस्यता आवेदन पत्र
### MEMBERSHIP APPLICATION FORM

Below title:
- Form Number: __________
- Membership Type:
  □ Volunteer
  □ Annual Member
  □ Supporter Member
  □ Lifetime Patron

---

# PERSONAL DETAILS SECTION

### 1. Applicant Information

| Field | Details |
|---|---|
| Full Name | __________________________ |
| Father/Mother Name | __________________________ |
| Gender | Male / Female / Other |
| Date of Birth | ____ / ____ / ______ |
| Occupation | __________________________ |
| Aadhaar Number | __________________________ |
| Mobile Number | __________________________ |
| Email | __________________________ |
| Blood Group | __________________________ |

Photo Upload Box on right side:
- Passport size photo
- Rounded bordered box
- Label: “Paste Photo Here”

---

# ADDRESS DETAILS

| Field | Details |
|---|---|
| Permanent Address | __________________________ |
| City | __________________________ |
| State | __________________________ |
| PIN Code | __________________________ |

---

# SOCIAL & VOLUNTEER DETAILS

## Areas Interested In
□ Education
□ Health & Medical
□ Women Empowerment
□ Environment
□ Social Welfare
□ Culture & Values

### Skills
_________________________________

### Previous Social Work Experience
_________________________________

---

# EMERGENCY CONTACT

| Field | Details |
|---|---|
| Emergency Contact Name | __________________________ |
| Relationship | __________________________ |
| Contact Number | __________________________ |

---

# DECLARATION SECTION

## घोषणा / Declaration

“I hereby declare that the information provided by me is true and I agree to follow the values, principles, and regulations of Sewarth Path Sansthanam.”

Hindi version beneath.

Signature Area:

| Applicant Signature | Office Use Only |
|---|---|
| __________ | Verified By __________ |
| Date __________ | Approval __________ |

---

# FOOTER

Include:
- NGO address
- Website
- QR code linking to website
- Social media icons
- Motto:

### “सर्वेभ्य: सुखिन: सन्तु”

Footer background:
Dark brown with gold text.

---

# EXTRA FEATURES TO ADD

## QR Verification
Each offline form should later be digitized and linked to:
- Unique Member ID
- Database Entry
- Membership status

Example:
SPS-2026-00125

---

# 2. LETTER PAD DESIGN

## Overall Style
Elegant premium official NGO stationery.

Paper Size:
A4

Theme:
Minimal premium Indian NGO aesthetic.

---

# HEADER DESIGN

## Left
NGO Logo

## Center
# सेवार्थ पथ संस्थानम्
### Sewarth Path Sansthanam
#### Service is the Highest Dharma

## Right
- Registration Number
- Trust Act Details
- NGO PAN
- Website
- Contact

Header line:
Gold divider with subtle lotus pattern.

---

# BODY AREA

Large clean white writing area.

Watermark:
- Large transparent logo in center
- Opacity 5–8%

Optional top-right:
Ref No: __________
Date: __________

---

# FOOTER DESIGN

Dark brown footer strip.

Include:
- Office Address
- Email
- Website
- Phone
- Social Handles
- QR code

Bottom quote:
### “सर्वेभ्य: सुखिन: सन्तु”

---

# PREMIUM ELEMENTS

Recommended:
- Golden border corners
- Subtle diya pattern
- Embossed logo printing
- Matte finish paper
- 120–130 GSM premium paper

---

# 3. NGO IDENTITY CARD DESIGN

## PURPOSE
Used for:
- Volunteers
- Core Team
- Trustees
- Event Members
- Annual Members

Card Size:
CR80 standard PVC card.

Orientation:
Vertical premium design.

---

# FRONT SIDE DESIGN

## TOP HEADER
Saffron gradient background.

### Logo at top center.

Below:
# सेवार्थ पथ संस्थानम्

Tagline:
### “सेवा परमो धर्म:”

---

# MEMBER PHOTO AREA

Large circular photo frame.
Golden border.

---

# MEMBER DETAILS

### Full Name
Bold white/gold text.

### Member Role
Examples:
- Volunteer
- Supporter Member
- Trustee
- Event Coordinator

### Member ID
Example:
SPS-VOL-2026-0142

### Blood Group
### Mobile Number
### City

---

# BARCODE / QR CODE SECTION

VERY IMPORTANT:
Add:
- QR Code
- Barcode

The QR should open:

https://sewarthpathsansthanam.vercel.app/member/[member-id]

The page should display:
- Name
- Photo
- Membership Status
- Verification Status
- Join Date
- Membership Type
- Expiry Date

---

# SECURITY FEATURES

Recommended:
- Holographic overlay
- QR verification
- Digital signature
- Expiry date
- Unique UID
- Dynamic verification URL

---

# BACK SIDE DESIGN

## Motto
### “सर्वेभ्य: सुखिन: सन्तु”

## Emergency Contact

## NGO Address

## Instructions
“This card is property of Sewarth Path Sansthanam.”

## QR Verification
Scan to verify membership.

Footer:
Website URL.

---

# COLOR THEME

Front:
- Deep saffron
- Black
- Gold
- White

Back:
- Brown + cream
- Subtle lotus pattern

---

# TECHNICAL IMPLEMENTATION FOR WEBSITE

## DATABASE FIELDS

Store:
- member_id
- full_name
- role
- photo_url
- qr_code
- barcode
- issue_date
- expiry_date
- verification_status

---

# BARCODE GENERATION

Recommended Libraries:

## Next.js / React
- react-qr-code
- qrcode
- bwip-js
- jsbarcode

---

# AUTO ID CARD FLOW

1. User registers
2. Admin approves member
3. System generates:
   - Unique Member ID
   - QR Code
   - Barcode
4. PDF ID Card generated automatically
5. User downloads from dashboard

---

# 4. CERTIFICATE OF APPRECIATION DESIGN

## PURPOSE
Used for:
- Volunteers
- Donors
- Event participation
- Social contribution
- Internship completion
- Appreciation awards

Orientation:
Landscape

Paper:
A4 Premium Art Paper

---

# CERTIFICATE STYLE

Theme:
Premium elegant Indian NGO + social service aesthetics.

Visual Feel:
- Royal
- Trustworthy
- Spiritual-modern
- Award-worthy

---

# TOP DESIGN

Top center:
Large NGO logo.

Below:
# सेवार्थ पथ संस्थानम्
### Sewarth Path Sansthanam

Golden ornamental divider.

---

# CERTIFICATE TITLE

# प्रशंसा प्रमाण पत्र
## CERTIFICATE OF APPRECIATION

Elegant serif typography.

---

# MAIN CONTENT

This certificate is proudly presented to

# [FULL NAME]

for outstanding contribution, dedication, and selfless service towards social welfare and humanitarian activities organized by Sewarth Path Sansthanam.

Presented on:
[Date]

At:
[Location]

---

# HIGHLIGHT AREA

Optional:
- Volunteer Hours
- Event Name
- Achievement Badge
- Contribution Type

---

# SIGNATURE SECTION

| Founder Signature | Secretary Signature | Official Seal |
|---|---|---|

---

# FOOTER QUOTE

### “सर्वेभ्य: सुखिन: सन्तु”
### “Service is the Highest Dharma”

Footer border:
Golden ornamental Indian style border.

---

# PREMIUM DESIGN FEATURES

Recommended:
- Gold foil effect
- Embossed seal
- Watermark logo
- Decorative lotus corners
- Signature authenticity QR code
- Certificate serial number

Example:
CERT-2026-00128

---

# CERTIFICATE VERIFICATION SYSTEM

QR Code should open:

https://sewarthpathsansthanam.vercel.app/certificate/[certificate-id]

Verification page should display:
- Recipient Name
- Certificate Type
- Event
- Date Issued
- Verification Status

---

# BEST WEBSITE FEATURES TO ADD

## Admin Dashboard
Create:
- Member Management
- Certificate Generator
- ID Card Generator
- PDF Export
- QR Verification
- Volunteer Tracking
- Attendance Tracking

---

# BEST PDF GENERATION STACK

Recommended:

## Frontend
- Next.js
- Tailwind CSS
- ShadCN UI

## PDF Generation
- @react-pdf/renderer
OR
- Puppeteer
OR
- pdf-lib

## QR / Barcode
- qrcode
- jsbarcode

## Storage
- Supabase Storage

## Database
- Supabase PostgreSQL

---

# BEST ADMIN FLOW

## MEMBERSHIP FLOW

1. User fills membership form
2. Admin reviews
3. Admin approves/rejects
4. Auto-generated:
   - Membership ID
   - ID card PDF
   - Welcome certificate
5. Email + WhatsApp sent automatically

---

# RECOMMENDED PRINTING SPECIFICATIONS

## Membership Form
- A4
- 100 GSM paper

## Letterhead
- 120 GSM premium matte

## ID Card
- PVC glossy
- QR laminated

## Certificate
- 250 GSM textured paper
- Gold foil border

---

# BRAND CONSISTENCY RULES

Always use:
- Same logo
- Same saffron-brown palette
- Same typography
- Same quote placement
- Same divider style
- Same QR verification format

This will make the NGO look:
- Professional
- Trustworthy
- Premium
- National-level
- Government-recognized quality

---

# FINAL RECOMMENDATION

Your NGO should maintain:

1. Offline + online verification system
2. Unified member database
3. Auto-generated documents
4. QR verification everywhere
5. Premium print-ready branding
6. Hindi + English bilingual identity
7. Consistent cultural + humanitarian aesthetic

This will dramatically improve:
- Trust
- Donations
- Volunteer confidence
- Government recognition
- Sponsor partnerships
- Public credibility

