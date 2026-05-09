# Sewarth Path Sansthanam – NGO Website PRD, TRD & Master Prompt

**Organisation:** सेवार्थ पथ संस्थानम् (Sewarth Path Sansthanam)  
**Motto:** सेवा परमो धर्म  
**Goal:** Production‑ready, bilingual (Hindi + English), payment‑integrated NGO website/web‑app using Supabase + Vercel free tiers.

---

## 1. Research: NGO Membership & Volunteer Fees in India

### 1.1 Typical Fee Ranges in Practice

Indian NGOs use a wide range of membership and volunteer fee models, from completely free to a few thousand rupees per year, depending on brand, benefits, and target audience.[web:7][web:10][web:14][web:16][web:17][web:20]

Some concrete examples:

| Organisation / Context                                     | Membership Types                      | Fees (INR)                                                                | Notes                                                                                                                                        |
| ---------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Self‑Defence NGO (NISDF)                                   | General, Student, Volunteer, Lifetime | ~₹30 for standard members, ~₹500 lifetime                                 | Very low, meant to keep barrier to entry almost zero; includes digital ID card with QR code for verification.[web:7]                         |
| Namo Gange Trust (health/yoga NGO)                         | 1‑year, 3‑year, 5‑year, Lifetime      | Around ₹1,100 per year, 3‑year ~₹2,100, 5‑year ~₹3,100, Lifetime ~₹11,000 | Higher fees but bundled with health OPDs, yoga courses, event discounts, and subsidised treatment; strong benefit‑driven membership.[web:10] |
| Koshambi Foundation                                        | Annual, Student, Lifetime             | Annual ~₹1,100, Student ~₹600, Lifetime higher slabs                      | Positions membership as access to journals, newsletters, and other benefits.[web:16]                                                         |
| Samvaw Foundation                                          | Student / Volunteer Membership        | ₹0 (no membership fee)                                                    | Fully free membership; focuses on long‑term engagement and recognition (certificates, lifetime event access, voting rights).[web:17]         |
| Aditya NGO Consultancy (service provider, not charity NGO) | Annual membership                     | ~₹999/year                                                                | Membership is more like a subscription to consulting services and government scheme updates.[web:14]                                         |

From these examples, realistic ranges:

- **Minimum for volunteers/members:** Many reputable NGOs charge **₹0** for volunteers and student members to avoid excluding low‑income youth.[web:17]
- **Nominal membership fees:** Commonly **₹30–₹600 per year** for basic or student membership, mainly to filter serious applicants and cover admin costs.[web:7][web:16]
- **Standard annual membership:** Often **₹600–₹1,500 per year**, when the NGO provides clear additional benefits (newsletters, training, discounts).[web:10][web:16]
- **Premium multi‑year / lifetime membership:** Ranges from **₹3,000–₹11,000+**, usually with tangible benefits and recognition (OPDs, subsidised treatment, lifetime access, special invitations).[web:10]

Your initially proposed band is therefore realistic:

- **Minimum fee: ₹0–₹500 (often ₹0–₹365 nominal per year).**
- **Maximum fee: ₹1,000–₹5,000+ per year / multi‑year / lifetime.**

This aligns well with how Indian NGOs and related organisations structure memberships.[web:7][web:10][web:14][web:16][web:17][web:20]

### 1.2 Recommended Fee Structure for Sewarth Path Sansthanam

Based on the above data and the seva‑first positioning (“सेवा परमो धर्म”), a suggested structure is:

1. **Free Volunteer Tier (स्वयंसेवक सदस्य)**
   - Fee: ₹0.
   - Benefits: onboarding, digital volunteer ID, WhatsApp group access, participation certificates, priority for on‑ground activities.[web:17]

2. **Basic Annual Member (सदस्य) – ₹365/year**
   - Symbolic “₹1 per day” fee.
   - Benefits: voting rights (as allowed by trust deed), internal updates, priority participation, digital ID with QR verification like NISDF.[web:7]

3. **Supporter Member – ₹1,001 or ₹1,500/year**
   - For middle‑class donors who want to contribute more.
   - Benefits: name on website “Supporters” wall, quarterly impact reports, discounted entry to paid events (health camps, training, etc.).[web:10][web:16]

4. **Lifetime / Patron Member – ₹5,001–₹11,001 (one‑time)**
   - Once‑in‑a‑lifetime fee similar to Namo Gange’s premium tiers.[web:10]
   - Benefits: lifetime recognition, plaque/certificate, featured listing on website, special invitations.

5. **No separate “application fee”**
   - Application is free; payment occurs only at final step after approval or as part of membership flow.[web:8][web:20]

6. **Clear value communication**
   - For each tier, spell out benefits: certificate, ID, updates, volunteering access, training, recognition.[web:7][web:10][web:16][web:17]

7. **Digital ID + QR verification**
   - Create digital ID cards with QR codes linking to a verification page on your domain, mirroring NISDF’s verification practice.[web:7]

---

## 2. Product Vision

### 2.1 Mission Alignment

Sewarth Path Sansthanam is a registered public charitable trust based around Varanasi, working on education, health, social welfare, and cultural activities (as suggested by the trust deed documents you shared). The digital product must:

- Make it extremely easy for anyone (especially Hindi‑speaking UP/Bihar belt) to **join as volunteer or member** and **donate online**.
- Be fully **bilingual (Hindi + English)** with trustworthy, grounded design.
- Run entirely on **Supabase backend** and **Vercel frontend hosting** within their free tiers.[web:15][web:18][web:21][cite:22]

### 2.2 Personas & Roles

1. **Visitor / Supporter** – wants to understand work, see impact, donate occasionally.
2. **Volunteer (स्वयंसेवक)** – youth/student/working professional; needs easy sign‑up, opportunities, certificates.
3. **Member (सदस्य / आजीवन सदस्य)** – financially committed supporter; needs membership flow, renewals, recognition, receipts.
4. **Admin / Trustee** – manages content, approvals, finances.

System roles:

- `public` – no login.
- `volunteer` – approved volunteer.
- `member` – paid member.
- `admin` – staff/trustee.
- `super_admin` – technical owner.

---

## 3. PRD – Sewarth Path Sansthanam Website/App

### 3.1 Platforms & Tech Base

- **Primary form factor:** Responsive web app (optionally PWA) at `https://sewarthpathsansthanam.org`.
- **Tech for implementation:** Next.js 14+ (App Router) + Supabase + Razorpay/Stripe, deployed on Vercel free tier.[web:15][web:18][web:21][cite:22]

### 3.2 Core Modules

#### A. Public Information Site (Bilingual)

1. **Home (मुखपृष्ठ)**

- Hero section with NGO name (Hindi + English), motto “सेवा परमो धर्म”, and short mission statement.
- Primary CTAs: “Join as Volunteer”, “Become a Member”, “Donate Now”.
- Section for 3–6 focus areas: education, health camps, social welfare, culture/values, etc.
- Impact snapshot (configurable metrics from DB): volunteers, members, events, beneficiaries.
- Preview of recent events and impact stories.

2. **About Us (हमारे बारे में)**

- Narrative about origin, values, and mission.
- Trustees and core team listing.
- Registration details (Act, registration number, jurisdiction).
- Timeline of milestones.

3. **Programs & Projects (कार्यक्रम एवं परियोजनाएँ)**

- Program cards: title (hi/en), description (hi/en), category, thumbnail image.
- Program details pages with deeper content and galleries.

4. **Events & Activities (आयोजन)**

- Upcoming events list with filters by date, location, category.
- Archive of past events with reports and photos.
- Event details pages.

5. **Impact Stories / Gallery**

- Story listing with cover images, short summaries, and detail pages.
- Gallery view with lightbox for photos.

6. **Resources & Documents**

- Downloads for legal and compliance documents: trust deed, registration certificates, 12A/80G, annual reports, brochures.
- Files served from Supabase Storage with appropriate permissions.

7. **Contact & Visit Us (संपर्क करें)**

- Physical address and Google Maps link.
- Phone numbers and email.
- Contact form that saves inquiries into Supabase and optionally triggers an email.

#### B. Volunteer & Membership Onboarding

1. **Volunteer Sign‑up (Free)**

- Form fields: name, email, mobile, WhatsApp, city, state, age group, interest areas, availability, referral source; optional photo upload.
- On submit: create/update Supabase auth user and profile; create `volunteer_applications` record with status `pending`.
- Admin flow to approve/reject; upon approval, user role becomes `volunteer` and they receive confirmation email with dashboard link and digital ID.

2. **Membership Registration (Paid Tiers + Free Volunteer Tier)**

Membership tiers:

- Volunteer Member – ₹0/year.
- Annual Member – ₹365/year.
- Supporter Member – e.g., ₹1,001/year.
- Lifetime/Patron – e.g., ₹5,001–₹11,001 one‑time.

Flow:

- Step 1 – Auth: user signs in or signs up.
- Step 2 – Profile: confirm personal info.
- Step 3 – Tier selection: clear comparison of tiers and benefits.
- Step 4 – Payment: call `/api/memberships/create-order`, create Razorpay/Stripe order, redirect to Checkout.
- Step 5 – Callback & Webhook: on success, verify signature server‑side, create `payments` record and `memberships` record with appropriate validity dates; free tier skips payment but records membership.

3. **Renewal Flow**

- System flags memberships expiring in 30 days.
- User sees banner, clicks renewal; prefilled data and same payment flow.
- New `memberships` row or extended expiry on current record.

4. **Digital ID Cards with QR**

- For approved volunteers/members, generate a short `public_member_id`.
- QR code points to `https://sewarthpathsansthanam.org/verify/{public_member_id}`.
- Verification page shows basic details: name, membership type, active/expired status, validity dates.
- Provide downloadable/printable ID card (HTML to PDF or styled print view).

#### C. Donations & Payments

1. **Donate Page**

- Guest donations allowed (no login required).
- Fields: donor name, email, optional phone, donation purpose, presets (₹251, ₹501, ₹1,001) + custom amount.
- Payment via Razorpay/Stripe.
- On success: log in `payments` + `donations`, generate receipt number, and email receipt.

2. **Recurring Donations (Optional)**

- If provider supports, allow monthly recurring donations; store schedule in `recurring_donations` table.

3. **Payment Webhooks**

- Secure webhook route `/api/payment/webhook` validates all signatures before writing to DB.
- All webhook payloads logged in `payment_events` for troubleshooting.

#### D. Admin Dashboard

1. **Overview**

- KPIs: number of volunteers, active members by tier, donations this month, upcoming events.
- Optional simple charts.

2. **Volunteer Management**

- Volunteer applications table with filters and approve/reject flow.
- Export CSV.

3. **Membership Management**

- Member list with tier, status, expiry, last payment.
- Ability to register offline payments and memberships.
- Suspend/cancel, renew, export.

4. **Content Management**

- CRUD interfaces for programs, events, stories, pages – all bilingual fields (hi/en).
- Image uploads to Supabase Storage.

5. **Donations & Reports**

- Filterable donation ledger and CSV export for auditors.

#### E. Multilingual Handling

- Language toggle (Hindi/English) in navbar.
- Default language based on browser locale (hi‑IN → Hindi).
- All key content supports hi/en fields; translation framework (e.g., `next-intl`) manages labels.

---

## 4. TRD – Technical Design (Supabase + Vercel)

### 4.1 Stack Summary

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS.
- **Backend:** Supabase (Postgres, Auth, Storage, RLS).
- **Payments:** Razorpay (primary, INR + UPI) or Stripe.
- **Hosting:** Vercel free tier for frontend + serverless APIs.[web:15][web:18][web:21][cite:22]

### 4.2 Architecture

- Public pages mostly static‑generated with incremental revalidation.
- Auth + dashboard pages server‑rendered/protected using Supabase Auth.
- API routes for membership and donation order creation, and payment webhooks.
- Supabase client initialised for both server and client contexts.

### 4.3 Database Schema (Supabase)

Essential tables (simplified):

- `profiles`
  - `id` (UUID, PK, same as Supabase auth user id)
  - `full_name`, `phone`, `whatsapp`, `city`, `state`, `country`
  - `role` (`public`, `volunteer`, `member`, `admin`, `super_admin`)
  - `created_at`, `updated_at`

- `volunteer_applications`
  - `id`, `user_id` (FK `profiles`)
  - `interests` (json/text), `availability`, `status` (`pending`, `approved`, `rejected`)
  - `notes`, `created_at`, `approved_at`

- `membership_plans`
  - `id`, `code` (`VOL_FREE`, `ANNUAL_365`, etc.)
  - `name_hi`, `name_en`
  - `description_hi`, `description_en`
  - `amount_inr`, `duration_months` (NULL for lifetime), `is_active`

- `memberships`
  - `id`, `user_id`, `plan_id`
  - `status` (`pending_payment`, `active`, `expired`, `cancelled`)
  - `starts_at`, `expires_at`
  - `payment_id` (FK `payments`)
  - `public_member_id` (short unique string for QR)

- `payments`
  - `id`
  - `provider` (`razorpay`, `stripe`, `offline`)
  - `provider_payment_id`
  - `user_id` (nullable for anonymous)
  - `amount_inr`, `currency`, `type` (`membership`, `donation`, `event`)
  - `status` (`created`, `success`, `failed`, `refunded`)
  - `metadata` (jsonb)
  - `created_at`

- `donations`
  - `id`, `payment_id`
  - `donor_name`, `donor_email`
  - `purpose`, `is_anonymous`, `receipt_number`

- `events`
  - `id`, `slug`
  - `title_hi`, `title_en`
  - `description_hi`, `description_en`
  - `start_date`, `end_date`, `location`
  - `is_public`, `is_past`

- `programs`
  - `id`, `slug`, `title_hi`, `title_en`, `description_hi`, `description_en`, `category`, `cover_image_url`

- `stories`
  - `id`, `slug`, `title_hi`, `title_en`, `summary_hi`, `summary_en`, `body_hi`, `body_en`, `cover_image_url`, `published_at`

- `pages`
  - `id`, `slug`, `title_hi`, `title_en`, `body_hi`, `body_en`

- `payment_events`
  - `id`, `provider`, `raw_payload`, `created_at`

- `translations` (optional)
  - `key`, `lang`, `value`

- `contact_messages`
  - `id`, `name`, `email`, `phone`, `message`, `created_at`

### 4.4 Auth & RBAC

- Use Supabase Auth for sign‑in/up (email/password or magic links, optionally phone OTP).
- `profiles.role` controls access; Row Level Security policies ensure:
  - Users see only their own profile, memberships, donations.
  - Admins and super_admins can access all relevant tables.
  - Public verification endpoint for `public_member_id` is open but limited to necessary fields.

### 4.5 Multilingual Implementation

- Use locale‑aware routing or middleware with language codes (`/hi`, `/en`).
- Store static labels in translation files; dynamic content stored with hi/en columns in DB.
- Language toggle switches locale and optionally persists preference.

### 4.6 Supabase + Vercel Free Tier Guardrails

- Supabase Free: 500 MB DB, 1 GB storage, 50k MAUs, 500k Edge Function calls – enough for an early‑stage NGO if images are optimised and old assets are pruned.[web:15][web:18][web:9][web:12]
- Vercel Free: generous serverless limits; use static rendering for high‑traffic public pages and avoid unnecessary API polling.[web:21][cite:22]

### 4.7 Environment Variables (Vercel)

Configure at minimum:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` **or** Stripe equivalents
- `NEXT_PUBLIC_SITE_URL` (e.g., `https://sewarthpathsansthanam.org`)

Store these via Vercel’s Environment Variables settings and access them in Next.js server code only where required.[cite:22]

---

## 5. Master “God‑Level” Prompt for AI / No‑Code Builder

You can paste this entire block directly into an AI coding tool or no‑code platform that accepts natural‑language app specs.

```text
You are a senior full-stack architect and product engineer.

Build a fully production-ready, scalable, payment-integrated **bilingual (Hindi + English) website + web app** for an Indian NGO called:

- Name (English): "Sewarth Path Sansthanam"
- Name (Hindi/Sanskrit): "सेवार्थ पथ संस्थानम्"
- Motto: "सेवा परमो धर्म"

The goal: make it extremely easy for people to **learn about the NGO, join as Volunteer or Member, and donate online**, using **Supabase as backend** and **Vercel free tier** for deployment.

================================================================
HIGH-LEVEL TECH REQUIREMENTS
================================================================

1. Stack
   - Frontend: Next.js 14+ with App Router, TypeScript, Tailwind CSS.
   - Backend: Supabase (Postgres, Auth, Storage, Row Level Security).
   - Payments: Razorpay (preferred for INR + UPI) or Stripe as a fallback.
   - Hosting: Vercel (Free tier).
   - Domain: configure for "sewarthpathsansthanam.org" (I will add DNS in Vercel later).

2. Project Constraints
   - Must run comfortably on Supabase + Vercel free tiers:
     - Supabase free: 500 MB DB, 1 GB storage, 50,000 MAUs, 500k edge function/Edge invocations.
     - Use static generation and caching for all public pages where possible.
   - Environment variables:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - SUPABASE_SERVICE_ROLE_KEY (server only)
     - RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (or STRIPE_SECRET_KEY etc.)
   - Never hardcode secrets in code; always assume they come from env vars.

3. Architecture
   - Next.js App Router in `/app`.
   - Use React Server Components for data fetching where possible.
   - API routes in `/app/api/...` for:
     - Membership order/checkout creation.
     - Donation order/checkout creation.
     - Payment webhooks (verify signatures for Razorpay/Stripe).
   - Supabase client configured both on server and client with proper security.

================================================================
PRODUCT REQUIREMENTS (PRD)
================================================================

Design a clean, non-generic, NGO-style site (not a SaaS template) with trust-building visuals and typography. No purple/blue SaaS gradients, no "three generic feature cards" layout. Focus on warmth, simplicity, and credibility.

A. PUBLIC PAGES (BILINGUAL)

Implement bilingual routes or locale handling. Support at minimum `/` with language toggle and store user's language preference.

1) Home Page
   - Hero section with:
     - NGO name (both languages).
     - Motto "सेवा परमो धर्म".
     - Short mission statement (both Hindi and English).
     - Primary CTA buttons:
       - "Join as Volunteer"
       - "Become a Member"
       - "Donate Now"
   - Section for 3–6 key focus areas (e.g., Education, Health Camps, Social Welfare, Culture & Values).
   - Impact snapshot (stats placeholders wired from DB): number of volunteers, members, events, beneficiaries.
   - Recent events preview (list of 3).
   - 2–3 highlighted impact stories with photos.

2) About Us
   - Story of Sewarth Path Sansthanam:
     - Origin, values, mission (content scaffolded so NGO can edit).
   - Section for trustees and core team (data-driven; admin-manageable).
   - Basic registration details (registration number, place, Trust Act, etc.) as structured text fields.
   - Timeline component for milestones.

3) Programs & Projects
   - List of programs (cards/grid):
     - Title (hi/en)
     - Short description (hi/en)
     - Category (Education, Health, Social Welfare, etc.)
     - Thumbnail image (from Supabase Storage).
   - Program details page (dynamic route) with full description and gallery.

4) Events & Activities
   - Upcoming events list with filters:
     - Date range, location (city/state), category.
   - Past events archive optionally paginated.
   - Event details page containing description, venue, map link, gallery.

5) Impact Stories / Gallery
   - Stories list: each story contains title, short summary, body content and images.
   - Image gallery with lightbox.

6) Resources & Documents
   - Section to upload and list:
     - Trust deed, registration certificates, PAN, 12A/80G etc.
     - Annual reports.
     - Brochures.
   - Downloads pulled from Supabase Storage with signed URLs when necessary.

7) Contact Us
   - NGO address, map embed, phone numbers, email.
   - Contact form that writes inquiries to Supabase (table: contact_messages) and optionally emails to admin.

B. VOLUNTEER AND MEMBERSHIP SYSTEM

1) Volunteer Sign-Up (FREE)
   - Basic flow:
     - Form fields: full name, email, mobile, WhatsApp, city, state, age group, areas of interest (multi-select), availability, how they heard about NGO.
     - Optional photo upload.
   - On submit:
     - Create Supabase Auth user (or link to existing) plus profile row.
     - Create row in `volunteer_applications` table with status="pending".
     - Show "Thank you" confirmation screen.
   - Admin dashboard:
     - Screen to review volunteer applications, approve/reject with remarks.
   - Once approved:
     - Role in `profiles.role` becomes "volunteer".
     - Volunteer gets email with login link and digital volunteer profile.
     - Generate a digital volunteer ID with QR code (see below).

2) Membership Registration (PAID and FREE TIERS)

Design membership tiers based on Indian NGO practices:

   - Volunteer Member (स्वयंसेवक सदस्य) – ₹0 / year:
     - Just time commitment, no fee.
   - Annual Member (वार्षिक सदस्य) – ₹365 / year:
     - Symbolic "₹1 per day" fee.
   - Supporter Member – e.g. ₹1,001 / year:
     - For those who can give more; gets extra recognition.
   - Lifetime / Patron Member – configurable (e.g., ₹5,001 to ₹11,001 one-time).

Membership Flow:
   - Step 1: Sign-in/sign-up.
   - Step 2: Personal details (reuse from profile).
   - Step 3: Pick membership tier:
     - Show benefits and fees for each tier (UI must be clear and non-confusing).
   - Step 4: Payment step:
     - Call `/api/memberships/create-order`, create payment order via Razorpay/Stripe.
     - Redirect to Razorpay/Stripe Checkout.
   - Step 5: Payment callback and webhook:
     - On success:
       - Verify signature in backend.
       - Create row in `payments` table.
       - Create or update row in `memberships` table:
         - `status = "active"` and valid from/valid until (duration based on plan).
       - If tier is free volunteer member, `status` should be "active" without payment.
   - Membership renewal:
     - If membership is expiring in 30 days, they see a renewal banner.
     - Renewal uses same flow but updates `memberships`.

3) Digital ID Cards with QR

   - For approved volunteers and active members only.
   - Each entry in `memberships` and corresponding volunteer profile has a `public_member_id` short ID (e.g., 8–10 characters).
   - Generate QR code that links to:
     - `https://sewarthpathsansthanam.org/verify/{public_member_id}`
   - Verification page:
     - Shows member/volunteer name, type, status, validity dates.
     - Does NOT show phone/email.
   - Generate card as a small HTML+CSS component with print/download as PDF or PNG.

C. DONATIONS & PAYMENTS

1) Donate Page
   - Allow guest donations (no login required) with:
     - Name, email, optional phone.
     - Purpose (general fund, specific program).
     - Pre-set amounts: ₹251, ₹501, ₹1,001, and custom.
   - Payment via Razorpay/Stripe Checkout.
   - On success:
     - Store donation in `donations` and `payments` tables.
     - Generate donation receipt number.
     - Email a simple PDF or HTML receipt with NGO details and payment reference.

2) Recurring Donations (optional, but scaffold)
   - Setup for monthly recurring donations, if supported by provider.
   - Table: `recurring_donations` with schedule and status.

3) Payment Webhooks
   - Secure webhook route `/api/payment/webhook` fully validating Razorpay/Stripe signatures before updating DB.
   - Log every webhook in `payment_events` table to assist debugging.

D. ADMIN DASHBOARD

Protected admin UI (role: "admin" or "super_admin") with:

1) Overview Screen
   - Counters for:
     - Total volunteers.
     - Active members by tier.
     - Donations this month vs last month.
     - Upcoming and past events.
   - Simple charts can be optional.

2) Volunteer Management
   - Tables to:
     - Review volunteer applications.
     - Approve / reject with notes.
     - Filter by state, city, interest areas.

3) Membership Management
   - Grid of members with:
     - Name, tier, status, expiry date, last payment.
   - Capabilities:
     - Manually mark offline payments and create memberships (for people who paid in cash/bank).
     - Suspend or cancel memberships.
     - Export CSV.

4) Content Management
   - CRUD for programs, events, stories, and static pages.
   - All with bilingual fields: title_hi/title_en, description_hi/description_en, etc.
   - Upload images to Supabase Storage and store signed URLs or public paths.

5) Donations & Reports
   - List of donations with filters:
     - Date range, purpose, amount range.
   - CSV export for auditor / CA.
   - Download receipts again if required.

================================================================
TECHNICAL DESIGN (TRD) DETAILS
================================================================

Implement the following Supabase schema (simplified):

- profiles(id, full_name, phone, whatsapp, city, state, country, role, created_at, updated_at)
- volunteer_applications(id, user_id, interests, availability, status, notes, created_at, approved_at)
- membership_plans(id, code, name_hi, name_en, description_hi, description_en, amount_inr, duration_months, is_active)
- memberships(id, user_id, plan_id, status, starts_at, expires_at, payment_id, public_member_id)
- payments(id, provider, provider_payment_id, user_id, amount_inr, currency, type, status, metadata, created_at)
- donations(id, payment_id, donor_name, donor_email, purpose, is_anonymous, receipt_number)
- events(id, slug, title_hi, title_en, description_hi, description_en, start_date, end_date, location, is_public, is_past)
- programs(id, slug, title_hi, title_en, description_hi, description_en, category, cover_image_url)
- stories(id, slug, title_hi, title_en, summary_hi, summary_en, body_hi, body_en, cover_image_url, published_at)
- pages(id, slug, title_hi, title_en, body_hi, body_en)
- payment_events(id, provider, raw_payload, created_at)
- translations(optional)(key, lang, value)
- contact_messages(id, name, email, phone, message, created_at)

Apply Supabase Row Level Security (RLS):
   - Only admins can see all data.
   - Users can see only their own profile, memberships, donations.
   - Public endpoints for programs/events/resources and for verifying public_member_id.

Routing and structure in Next.js:
   - `/` – detection of language and home.
   - `/hi/...` and `/en/...` variants, or locale-aware routing.
   - `/programs/[slug]`, `/events/[slug]`, `/stories/[slug]`.
   - `/volunteer/apply`, `/membership/join`, `/membership/renew`.
   - `/donate`.
   - `/verify/[public_member_id]`.
   - `/admin/...` namespace for dashboard (protected routes).

================================================================
UX & UI GUIDELINES
================================================================

- Make the site feel like an Indian grassroots NGO with modern polish:
  - Use warm neutral backgrounds, not dark gradient SaaS UI.
  - Clean typography; support Devanagari and Latin scripts.
- Language toggle accessible in header: clearly show "हिंदी | EN".
- Mobile-first design:
  - Everything must work beautifully on 375px wide screens.
  - Large, tappable buttons (minimum ~44px height).
- Include digital ID illustration and membership tier cards clearly showing differences.

================================================================
OUTPUT EXPECTATIONS
================================================================

Please generate:

1. All necessary Next.js pages, components, layouts, and API routes.
2. Supabase SQL schema or migrations to create the described tables.
3. Example environment variable configuration (without actual secrets).
4. Razorpay/Stripe integration code for:
   - Order creation.
   - Checkout flow.
   - Webhook verification.
5. Minimal seed data for programs, events, and membership plans.
6. Instructions (as README text) summarizing:
   - How to set up Supabase project, run migrations.
   - How to configure env vars on Vercel.
   - How to point "sewarthpathsansthanam.org" to the Vercel project.
   - How admins can log in and use the dashboard.

The output should be ready to deploy after I plug in real Supabase and payment keys and connect the custom domain on Vercel.
```

Github_Repo_Link:- https://github.com/Warriorlegacy/sewarthpathsansthanam.git
