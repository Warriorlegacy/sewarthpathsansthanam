# 🕉️ सेवार्थ पथ संस्थानम् — Sevarth Path Sansthanam
## Complete Website Blueprint: Research + PRD + TRD + God-Level Vibe Coding Prompt
**Domain:** sewarthpathsansthanam.org | **Stack:** Next.js + Supabase + Vercel + Razorpay

---

# PART 1: RESEARCH SUMMARY
## NGO Membership & Volunteer Joining Fees in India (2025–26)

### Overview
Joining an NGO as a member or volunteer in India follows a tiered cost model depending on the nature of involvement, the scale of the NGO, and the member benefits offered.

### Fee Structure (Market Research)

| Membership Type | Minimum Fee | Maximum Fee | Notes |
|---|---|---|---|
| **Free Volunteer** | ₹0 | ₹0 | Most grassroots/local NGOs |
| **Annual Membership** | ₹100 | ₹500 | Nominal admin cost cover |
| **Regular Member** | ₹365/year | ₹1,000/year | ~₹1/day symbolic fee |
| **Professional/Active Member** | ₹1,000 | ₹3,000/year | Skill-based programs, benefits |
| **Lifetime Membership** | ₹2,100 | ₹11,000 one-time | High-profile NGOs |
| **Patron/Donor Membership** | ₹5,000 | ₹25,000+/year | Exclusive recognition & benefits |

### Industry Benchmarks (Indian NGOs)
- **CRY, Bhumi, Smile Foundation**: Free to volunteer; paid internship programmes available
- **Art of Living (charitable arm)**: ₹500–₹2,500 for structured programs
- **Rotary/Lions Club (NGO hybrid)**: ₹3,000–₹10,000 annual dues
- **GiveIndia platform NGOs**: Free listing; volunteer registration free
- **Local/Varanasi-region NGOs**: Typically ₹0–₹500 for membership

### Recommended Fee Tiers for Sevarth Path Sansthanam

| Tier | Name | Fee | What's Included |
|---|---|---|---|
| 🌱 **Seva Mitra** (Friend) | Free Volunteer | ₹0 | Basic volunteer access, newsletter |
| 🌿 **Seva Sahayak** (Helper) | Annual Member | ₹365/year | ID card, events, certificate |
| 🌳 **Seva Pramukh** (Active) | Active Member | ₹1,100/year | All above + priority programs, badge |
| 🏆 **Seva Ratna** (Patron) | Lifetime Member | ₹5,100 one-time | Lifetime recognition, certificate, trust website listing |

### Legal Note
Under the Indian Trusts Act 1882 (under which this NGO is registered), there is no mandated minimum or maximum membership fee. Fees collected from members must be used for the Trust's stated objectives. Donations above ₹500 are eligible for 80G deduction if the Trust holds that certification.

---

# PART 2: PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Sevarth Path Sansthanam — Website/Web App

### 2.1 Executive Summary
Sevarth Path Sansthanam (सेवार्थ पथ संस्थानम्) is a registered Trust under the Indian Trusts Act 1882, based in Varanasi, Uttar Pradesh. Founded by Shri Mahesh Kumar Pandey, the organization works across education, health, culture, music (Banaras Gharana), women empowerment, environment, and social welfare throughout India.

**Website Goal**: Build a bilingual (Hindi + English), production-ready, fully functional NGO website with online donation, membership registration, event management, and volunteer onboarding — deployed on Vercel (free tier) + Supabase (free tier) with Razorpay payment integration.

**Target Domain**: sewarthpathsansthanam.org

---

### 2.2 Stakeholders

| Role | Person | Responsibility |
|---|---|---|
| Founder/Trustee | Shri Mahesh Kumar Pandey | Final approvals, content |
| Co-Trustee | Smt. Madhu Pandey | Community programs |
| Member | Smt. Komal Devi | Ground outreach |
| Member | Shri Amarnath Pandey | Operations |
| Member | Km. Preeti Kumari | Awareness campaigns |
| Website Admin | TBD | CMS, donations, member management |

---

### 2.3 User Personas

**Persona 1: The Visitor (Jigyasu — जिज्ञासु)**
- Age: 18–60, any background
- Goal: Understand what the NGO does
- Needs: Clear mission, bilingual content, trust credentials
- Behaviour: Mobile-first, Hindi preferred in Varanasi region

**Persona 2: The Donor (Daata — दाता)**
- Age: 25–70
- Goal: Make a tax-efficient donation
- Needs: Secure payment, 80G receipt, UPI/card support
- Behaviour: Wants quick 3-tap donation flow

**Persona 3: The Volunteer (Sevak — सेवक)**
- Age: 18–35, students, professionals
- Goal: Join a cause, contribute time/skills
- Needs: Easy registration, role clarity, WhatsApp contact
- Behaviour: Mobile-first, social media driven

**Persona 4: The Member (Sadasya — सदस्य)**
- Age: 25–60
- Goal: Formal membership, ID card, involvement in programs
- Needs: Online payment, membership certificate download
- Behaviour: Wants official recognition

**Persona 5: The Admin (Nyasa Prabandhan — न्यास प्रबंधन)**
- Role: Trustee or appointed manager
- Goal: Manage donors, volunteers, members, events, blog
- Needs: Simple dashboard, no coding required

---

### 2.4 Feature Requirements

#### 2.4.1 Public Pages (All Users)

| Page | Description | Priority |
|---|---|---|
| **Home** | Hero with tagline, mission stats, CTA (Donate/Join/Volunteer), latest news | P0 |
| **About Us** | Trust history, founders, trustees table, registration details | P0 |
| **Our Mission** | All 23+ objectives from Trust Deed in visual card format | P0 |
| **Programs** | Education, Health, Music, Women Empowerment, Environment, etc. | P0 |
| **Donate** | Donation form with Razorpay, UPI, custom amounts, 80G note | P0 |
| **Membership** | Tier cards (Seva Mitra, Sahayak, Pramukh, Ratna), online payment | P0 |
| **Volunteer** | Register form, role selection, skills input | P0 |
| **Events** | Calendar/list of upcoming & past events | P1 |
| **Gallery** | Photo gallery from activities | P1 |
| **Blog/News** | Articles about NGO activities, social issues | P1 |
| **Contact** | Map (Varanasi), phone, email, WhatsApp button | P0 |
| **Trust Deed** | Downloadable PDF of trust deed (public document) | P1 |
| **Privacy Policy** | Required for payment gateway | P0 |
| **Terms of Use** | Legal compliance page | P0 |

#### 2.4.2 Authentication & Member Portal

| Feature | Description | Priority |
|---|---|---|
| **Sign Up / Login** | Email + OTP or Google OAuth | P0 |
| **Member Dashboard** | View membership status, download certificate, donation history | P0 |
| **Donation Receipt Download** | PDF receipt with 80G note | P0 |
| **Profile Management** | Update name, address, photo, skills | P1 |
| **Volunteer Activity Log** | Track hours, events attended | P2 |

#### 2.4.3 Admin Panel (Protected)

| Feature | Description | Priority |
|---|---|---|
| **Dashboard** | Stats: total donors, members, volunteers, funds raised | P0 |
| **Donation Management** | View, export donations; filter by date/amount | P0 |
| **Member Management** | Approve/reject memberships, send ID cards | P0 |
| **Volunteer Management** | View registrations, assign roles | P1 |
| **Event Management** | Create/edit/delete events | P1 |
| **Blog CMS** | Rich text editor for posts, bilingual | P1 |
| **Gallery Manager** | Upload/delete photos | P1 |
| **Email Notifications** | Auto-send receipts, welcome emails | P0 |

---

### 2.5 Language & Accessibility Requirements

- **Bilingual Toggle**: Hindi (हिन्दी) / English — persistent per session via localStorage
- **Default Language**: Hindi for users from India (geo-detect), English for international
- **RTL**: Not required (Hindi is LTR)
- **Fonts**: Noto Sans Devanagari (Hindi), Inter or Poppins (English)
- **Accessibility**: WCAG 2.1 AA — keyboard navigation, ARIA labels, sufficient contrast
- **Mobile-First**: 70%+ Indian NGO traffic is mobile

---

### 2.6 Payment Requirements

| Feature | Specification |
|---|---|
| **Gateway** | Razorpay (free to start; 2% TDR on transactions) |
| **Supported Methods** | UPI, Debit/Credit Cards, Net Banking, Wallet |
| **Donation Amounts** | ₹11, ₹51, ₹101, ₹501, ₹1,001, ₹2,100, ₹5,100, Custom |
| **Membership Payments** | ₹0 (volunteer), ₹365, ₹1,100, ₹5,100 |
| **Auto Receipt** | PDF email receipt within 2 minutes of payment |
| **80G Note** | Display on checkout: "80G certificate pending; will be issued post-certification" |
| **Currency** | INR only |
| **Recurring** | Optional: monthly donation subscription via Razorpay subscriptions |
| **Test Mode** | Razorpay test keys for staging |

---

### 2.7 SEO & Performance Requirements

- SSR/SSG via Next.js for all public pages
- Meta tags in both Hindi & English
- Open Graph images for social sharing
- Sitemap.xml auto-generated
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Google Analytics 4 integration
- Schema markup: Organization, NGO, Event types

---

### 2.8 Trust & Credibility Elements

- Display registration number: **202200996052093**
- Registered under: Indian Trusts Act 1882
- Notarial stamp visible on Trust Deed page
- Trustee photos and bios
- Varanasi office address prominently displayed
- "Sewarth Path Sansthanam" stamp seal as a design element
- External verification links (NGO Darpan if registered)

---

### 2.9 Success Metrics (6 months post-launch)

| Metric | Target |
|---|---|
| Monthly visitors | 500+ |
| Donation conversions | 2% of visitors |
| Volunteer registrations | 50/month |
| Member sign-ups | 20/month |
| Average donation amount | ₹500+ |
| Mobile traffic share | >65% |

---

# PART 3: TECHNICAL REQUIREMENTS DOCUMENT (TRD)
## Sevarth Path Sansthanam — Website/Web App

### 3.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                 │
│           Deployed on Vercel (Free Tier)                 │
│    sewarthpathsansthanam.org (custom domain via Vercel)  │
├─────────────────────────────────────────────────────────┤
│                   BACKEND (Supabase)                     │
│  PostgreSQL DB │ Auth │ Storage │ Edge Functions         │
│         Free Tier: 500MB DB, 1GB Storage                 │
├─────────────────────────────────────────────────────────┤
│              PAYMENT (Razorpay)                          │
│   Razorpay Orders API + Webhook → Supabase Edge Fn       │
├─────────────────────────────────────────────────────────┤
│              EMAIL (Resend.com / Supabase Email)         │
│     Auto receipts, welcome mails (free tier: 100/day)    │
└─────────────────────────────────────────────────────────┘
```

---

### 3.2 Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR + SSG, SEO, free on Vercel |
| **Language** | TypeScript | Type safety, scalability |
| **Styling** | Tailwind CSS + shadcn/ui | Fast, beautiful, accessible |
| **Database** | Supabase PostgreSQL | Free 500MB, real-time, auth built-in |
| **Auth** | Supabase Auth (Email OTP + Google) | Free, secure |
| **Storage** | Supabase Storage | Gallery, documents, certificates |
| **Payments** | Razorpay | Best Indian payment gateway |
| **Email** | Resend.com (free: 3,000/month) | React Email templates |
| **PDF Generation** | @react-pdf/renderer | Donation receipts, ID cards |
| **i18n** | next-intl | Hindi/English switching |
| **Forms** | React Hook Form + Zod | Validation |
| **State** | Zustand | Lightweight global state |
| **Animations** | Framer Motion | Smooth UI transitions |
| **Analytics** | Vercel Analytics + GA4 | Free tier |
| **CMS (Blog)** | Supabase (custom) or Outstatic | No-cost blog CMS on top of Next.js |
| **Maps** | Google Maps Embed (free) | Contact page |
| **SEO** | next-seo | Meta, OG, Schema |
| **Deployment** | Vercel (free tier) | Auto-deploy from GitHub |

---

### 3.3 Database Schema (Supabase PostgreSQL)

```sql
-- USERS / MEMBERS
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  full_name_hindi TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  occupation TEXT,
  profile_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBERSHIPS
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  tier TEXT CHECK (tier IN ('seva_mitra','seva_sahayak','seva_pramukh','seva_ratna')),
  amount_paid DECIMAL(10,2),
  payment_id TEXT,
  order_id TEXT,
  status TEXT CHECK (status IN ('pending','active','expired','cancelled')),
  member_id TEXT UNIQUE, -- SPS-2025-0001 format
  valid_from DATE,
  valid_until DATE,
  certificate_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DONATIONS
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  donor_address TEXT,
  user_id UUID REFERENCES profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_id TEXT UNIQUE,
  order_id TEXT,
  razorpay_signature TEXT,
  status TEXT CHECK (status IN ('pending','completed','failed','refunded')),
  purpose TEXT, -- 'general','education','health','music','environment'
  is_anonymous BOOLEAN DEFAULT FALSE,
  receipt_url TEXT,
  pan_number TEXT, -- for 80G
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VOLUNTEERS
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT,
  age INTEGER,
  occupation TEXT,
  skills TEXT[], -- array of skills
  availability TEXT, -- 'weekdays','weekends','both'
  hours_per_week INTEGER,
  area_of_interest TEXT[], -- NGO program areas
  message TEXT,
  status TEXT CHECK (status IN ('pending','approved','active','inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EVENTS
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_hindi TEXT,
  description TEXT,
  description_hindi TEXT,
  event_date TIMESTAMPTZ,
  location TEXT,
  location_hindi TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  registration_required BOOLEAN DEFAULT FALSE,
  max_attendees INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EVENT REGISTRATIONS
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES profiles(id),
  name TEXT,
  email TEXT,
  phone TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG POSTS
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_hindi TEXT,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  content_hindi TEXT,
  cover_image_url TEXT,
  author TEXT DEFAULT 'Sevarth Path Sansthanam',
  tags TEXT[],
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  title_hindi TEXT,
  image_url TEXT NOT NULL,
  category TEXT, -- 'events','programs','team','office'
  event_id UUID REFERENCES events(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACTS/INQUIRIES
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADMIN SETTINGS
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 3.4 Row Level Security (Supabase RLS)

```sql
-- Profiles: users can only read/update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Donations: users see their own; admins see all
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Donors view own" ON donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin full access" ON donations FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Memberships: same pattern
-- Blog posts: public can read published only
CREATE POLICY "Public reads published posts" ON blog_posts
  FOR SELECT USING (is_published = TRUE);
```

---

### 3.5 API Routes (Next.js App Router)

```
/api/
├── payments/
│   ├── create-order          POST — Create Razorpay order
│   ├── verify                POST — Verify Razorpay signature
│   └── webhook               POST — Razorpay webhook (update DB)
├── donations/
│   └── receipt/[id]          GET  — Generate PDF receipt
├── memberships/
│   ├── register              POST — Register new member
│   └── certificate/[id]      GET  — Download membership certificate
├── volunteers/
│   └── register              POST — New volunteer application
├── contact/
│   └── send                  POST — Send contact form
├── email/
│   ├── send-receipt          POST — Email donation receipt
│   └── send-welcome          POST — Welcome email on join
└── admin/
    ├── dashboard-stats        GET  — Aggregate stats
    ├── donations              GET  — List donations (admin only)
    └── members                GET  — List members (admin only)
```

---

### 3.6 Razorpay Integration Flow

```
User clicks "Donate ₹501"
      ↓
POST /api/payments/create-order
  → Razorpay API: orders.create({amount: 50100, currency: 'INR'})
  → Insert pending donation in Supabase
      ↓
Frontend: Razorpay checkout opens (modal)
User completes UPI/card payment
      ↓
Frontend receives: {razorpay_payment_id, razorpay_order_id, razorpay_signature}
      ↓
POST /api/payments/verify
  → Validate HMAC signature
  → Update donation status to 'completed'
  → Trigger email receipt (Resend API)
      ↓
User sees: "Dhanyavad! Receipt sent to your email 🙏"
```

---

### 3.7 i18n Setup (next-intl)

```
/messages/
├── en.json           English strings
└── hi.json           Hindi strings

Key namespaces:
- nav: Navigation labels
- home: Hero, sections
- about: About page
- donate: Donation page + form
- membership: Tiers, benefits
- volunteer: Form, roles
- footer: Links, address
- common: Buttons, errors, success messages
```

**Language switcher**: Floating button (bottom-right) toggles between EN ↔ HI, saved to localStorage. URL stays the same (no path prefix needed for free tier simplicity).

---

### 3.8 Deployment Configuration

#### Vercel (vercel.json)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase_service_key",
    "RAZORPAY_KEY_ID": "@razorpay_key_id",
    "RAZORPAY_KEY_SECRET": "@razorpay_key_secret",
    "NEXT_PUBLIC_RAZORPAY_KEY_ID": "@razorpay_key_id",
    "RESEND_API_KEY": "@resend_api_key",
    "NEXT_PUBLIC_SITE_URL": "https://sewarthpathsansthanam.org"
  }
}
```

#### Domain Setup
1. Buy domain: sewarthpathsansthanam.org (recommended: GoDaddy, Namecheap ~₹999/year)
2. In Vercel: Project Settings → Domains → Add sewarthpathsansthanam.org
3. Update nameservers at registrar to Vercel's nameservers
4. SSL auto-provisioned by Vercel (free Let's Encrypt)

---

### 3.9 Environment Variables Checklist

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx

# Email
RESEND_API_KEY=re_xxx

# App
NEXT_PUBLIC_SITE_URL=https://sewarthpathsansthanam.org
NEXT_PUBLIC_WHATSAPP_NUMBER=919454222116
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Admin
ADMIN_EMAIL=admin@sewarthpathsansthanam.org
JWT_SECRET=your-secret-key
```

---

### 3.10 Free Tier Limits & Mitigation

| Service | Free Limit | Expected Usage | Risk | Mitigation |
|---|---|---|---|---|
| Vercel | 100GB bandwidth/month | ~5GB initially | Low | Upgrade only if viral |
| Supabase DB | 500MB | ~50MB first year | Low | Archive old data |
| Supabase Storage | 1GB | ~200MB galleries | Low | Compress images |
| Supabase Auth | 50,000 MAU | <1,000 year 1 | None | — |
| Resend Email | 3,000/month | ~500/month | Low | Add Gmail SMTP fallback |
| Razorpay | 2% TDR | Per transaction | Unavoidable | Built into pricing |

---

# PART 4: GOD-LEVEL AUTONOMOUS VIBE CODING PROMPT
## For: Lovable / Bolt.new / v0 / Cursor / Replit Agent / Any AI Coding Tool

---

> **⚡ COPY THIS ENTIRE PROMPT AND PASTE INTO YOUR VIBE CODING TOOL ⚡**
> Works with: Lovable.dev, Bolt.new, v0.dev, Cursor Agent, Replit Agent, GPT-4 with code interpreter

---

```
===========================================================================
🕉️ BUILD: SEVARTH PATH SANSTHANAM — COMPLETE NGO WEBSITE
===========================================================================

YOU ARE AN EXPERT FULL-STACK ENGINEER. BUILD A COMPLETE, PRODUCTION-READY,
BILINGUAL (HINDI + ENGLISH) NGO WEBSITE FROM SCRATCH. DO NOT ASK CLARIFYING
QUESTIONS. BUILD EVERYTHING AUTONOMOUSLY. FOLLOW EVERY INSTRUCTION EXACTLY.

===========================================================================
SECTION 1: PROJECT IDENTITY
===========================================================================

NGO NAME (English): Sevarth Path Sansthanam
NGO NAME (Hindi): सेवार्थ पथ संस्थानम्
TAGLINE (English): "Service is the Highest Dharma"
TAGLINE (Hindi): "सेवा परमो धर्म"
DOMAIN: sewarthpathsansthanam.org
REGISTRATION: Indian Trusts Act 1882 | Registration No: 202200996052093
FOUNDED BY: Shri Mahesh Kumar Pandey (Founder / Chairman / Chief Trustee)
ADDRESS: Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi - 221005
PHONE: +91-9454222116
WORKING AREA: All India
COLOR PALETTE:
  - Primary: Saffron/Orange #FF6B35
  - Secondary: Deep Green #2D6A4F
  - Accent Gold: #F4A261
  - Background Light: #FFFBF5
  - Background Dark: #1A0A00
  - Text Dark: #1A1A1A
  - Text Light: #F5F5F5
FONTS:
  - Hindi: "Noto Sans Devanagari", sans-serif
  - English: "Poppins", sans-serif
MOTIF: Lotus flower, Om symbol, subtle Ganga river wave patterns

===========================================================================
SECTION 2: TECH STACK — USE EXACTLY THESE
===========================================================================

Framework: Next.js 14 with App Router (TypeScript)
Styling: Tailwind CSS + shadcn/ui components
Database: Supabase (PostgreSQL + Auth + Storage)
Payments: Razorpay (Indian payment gateway)
Email: Resend.com (transactional email)
PDF: @react-pdf/renderer (receipts + certificates)
i18n: next-intl (bilingual Hindi/English)
Forms: React Hook Form + Zod validation
State: Zustand
Animations: Framer Motion
Analytics: Vercel Analytics + GA4
Deployment: Vercel (free tier)

===========================================================================
SECTION 3: COMPLETE FILE STRUCTURE TO CREATE
===========================================================================

Create this EXACT folder structure:

sevarth-path-sansthanam/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    ← Homepage
│   │   ├── about/page.tsx
│   │   ├── programs/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── membership/page.tsx
│   │   ├── volunteer/page.tsx
│   │   ├── events/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   └── terms/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx                    ← Member dashboard
│   │   ├── profile/page.tsx
│   │   ├── donations/page.tsx
│   │   └── membership/page.tsx
│   ├── admin/
│   │   ├── page.tsx                    ← Admin dashboard
│   │   ├── donations/page.tsx
│   │   ├── members/page.tsx
│   │   ├── volunteers/page.tsx
│   │   ├── events/page.tsx
│   │   ├── blog/page.tsx
│   │   └── gallery/page.tsx
│   └── api/
│       ├── payments/create-order/route.ts
│       ├── payments/verify/route.ts
│       ├── payments/webhook/route.ts
│       ├── donations/receipt/[id]/route.ts
│       ├── memberships/register/route.ts
│       ├── memberships/certificate/[id]/route.ts
│       ├── volunteers/register/route.ts
│       ├── contact/send/route.ts
│       └── email/send-receipt/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── WhatsAppButton.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── MissionStrip.tsx
│   │   ├── ProgramCards.tsx
│   │   ├── ImpactStats.tsx
│   │   ├── DonationCTA.tsx
│   │   ├── LatestEvents.tsx
│   │   ├── Testimonials.tsx
│   │   └── TrusteesSection.tsx
│   ├── donate/
│   │   ├── DonationForm.tsx
│   │   ├── AmountSelector.tsx
│   │   └── PaymentSuccess.tsx
│   ├── membership/
│   │   ├── MembershipTiers.tsx
│   │   └── MembershipForm.tsx
│   ├── volunteer/
│   │   └── VolunteerForm.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── StatsCards.tsx
│   │   └── DataTable.tsx
│   └── ui/
│       ├── LotusLoader.tsx
│       └── OmDivider.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── razorpay.ts
│   ├── resend.ts
│   ├── pdf/
│   │   ├── DonationReceipt.tsx
│   │   └── MembershipCertificate.tsx
│   └── utils.ts
├── messages/
│   ├── en.json
│   └── hi.json
├── types/
│   └── index.ts
├── public/
│   ├── images/
│   │   ├── logo.svg                    ← Lotus + Om NGO logo
│   │   ├── logo-white.svg
│   │   ├── hero-bg.jpg
│   │   └── og-image.jpg
│   └── favicon.ico
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── .env.local.example
├── middleware.ts                        ← next-intl + auth middleware
├── i18n.ts
├── next.config.js
├── tailwind.config.js
└── package.json

===========================================================================
SECTION 4: DATABASE SCHEMA — CREATE ALL TABLES
===========================================================================

Create file: supabase/migrations/001_initial_schema.sql with ALL of this SQL:

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  full_name_hindi TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'Varanasi',
  state TEXT DEFAULT 'Uttar Pradesh',
  pincode TEXT,
  occupation TEXT,
  profile_photo_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Memberships
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tier TEXT CHECK (tier IN ('seva_mitra','seva_sahayak','seva_pramukh','seva_ratna')),
  amount_paid DECIMAL(10,2) DEFAULT 0,
  payment_id TEXT,
  order_id TEXT,
  status TEXT CHECK (status IN ('pending','active','expired','cancelled')) DEFAULT 'pending',
  member_id TEXT UNIQUE,
  valid_from DATE DEFAULT CURRENT_DATE,
  valid_until DATE,
  certificate_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  donor_address TEXT,
  donor_pan TEXT,
  user_id UUID REFERENCES profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_id TEXT UNIQUE,
  order_id TEXT,
  razorpay_signature TEXT,
  status TEXT CHECK (status IN ('pending','completed','failed','refunded')) DEFAULT 'pending',
  purpose TEXT DEFAULT 'general',
  is_anonymous BOOLEAN DEFAULT FALSE,
  receipt_url TEXT,
  receipt_number TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteers
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  city TEXT,
  state TEXT,
  age INTEGER,
  occupation TEXT,
  education TEXT,
  skills TEXT[],
  availability TEXT,
  hours_per_week INTEGER DEFAULT 4,
  areas_of_interest TEXT[],
  why_volunteer TEXT,
  status TEXT CHECK (status IN ('pending','approved','active','inactive')) DEFAULT 'pending',
  volunteer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_hindi TEXT,
  description TEXT,
  description_hindi TEXT,
  event_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  location TEXT,
  location_hindi TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  registration_required BOOLEAN DEFAULT FALSE,
  max_attendees INTEGER,
  registration_count INTEGER DEFAULT 0,
  event_type TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_hindi TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_hindi TEXT,
  content TEXT,
  content_hindi TEXT,
  cover_image_url TEXT,
  author TEXT DEFAULT 'Sevarth Path Sansthanam Team',
  tags TEXT[],
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  title_hindi TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'general',
  event_id UUID REFERENCES events(id),
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('total_donations_display', '0'),
  ('total_members_display', '0'),
  ('total_volunteers_display', '0'),
  ('total_lives_impacted', '0'),
  ('maintenance_mode', 'false'),
  ('donation_80g_status', 'pending');

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view published events" ON events FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view published posts" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can view gallery" ON gallery_items FOR SELECT USING (TRUE);
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own donations" ON donations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own membership" ON memberships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert contact" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can insert volunteer" ON volunteers FOR INSERT WITH CHECK (TRUE);

===========================================================================
SECTION 5: ALL PAGES — BUILD WITH FULL CONTENT IN HINDI & ENGLISH
===========================================================================

--- PAGE 1: HOMEPAGE (/) ---
Build a stunning, full-featured homepage with these sections in order:

1. NAVBAR:
   - Logo (lotus SVG + "सेवार्थ पथ संस्थानम्" / "Sevarth Path Sansthanam")
   - Navigation: Home | About | Programs | Donate | Membership | Volunteer | Events | Gallery | Blog | Contact
   - Language switcher (EN ↔ हिं) — floating pill button, top-right
   - "Donate Now" CTA button — saffron orange, animated pulse
   - Hamburger menu on mobile

2. HERO SECTION:
   - Full-viewport hero with parallax Varanasi/Ganga background
   - Large Hindi text: "सेवा परमो धर्म"
   - English subtitle: "Service is the Highest Dharma"
   - Descriptive text about the NGO
   - TWO CTA buttons: "दान करें / Donate Now" (primary) + "सदस्य बनें / Join Us" (secondary)
   - Floating lotus animation in bottom-right corner
   - Registration badge: "Reg. No. 202200996052093 | Indian Trusts Act 1882"

3. IMPACT STATS BAR:
   - Counter animation on scroll
   - Stats: "500+ Families Helped", "200+ Volunteers", "50+ Events", "10+ Programs"
   - Saffron gradient background

4. MISSION OVERVIEW:
   - Section title: "हमारा मिशन / Our Mission"
   - 6 program area cards with icons:
     * Education (शिक्षा) — Book icon
     * Health (स्वास्थ्य) — Heart icon
     * Music & Culture (संगीत व संस्कृति) — Music note icon
     * Women Empowerment (महिला सशक्तिकरण) — Woman icon
     * Environment (पर्यावरण) — Tree icon
     * Social Welfare (सामाजिक कल्याण) — Community icon
   - Each card: icon, Hindi title, English title, brief description, "Learn More" link

5. DONATION CTA SECTION:
   - Rich background with subtle Om pattern
   - Text: "आपका एक कदम किसी की जिंदगी बदल सकता है"
   - "Your one step can change someone's life"
   - Quick donation buttons: ₹51, ₹101, ₹501, ₹1,001, ₹2,100, Custom
   - "Donate Now" — launches donation modal

6. UPCOMING EVENTS:
   - Show next 3 events from database
   - Card layout with date, title (bilingual), location
   - "View All Events" link

7. TRUSTEES SECTION:
   - Section: "Our Leadership / हमारा नेतृत्व"
   - Cards for all 5 trustees:
     1. Shri Mahesh Kumar Pandey — Founder/Chairman
     2. Smt. Madhu Pandey — Trustee Member
     3. Smt. Komal Devi — Trustee Member
     4. Shri Amarnath Pandey — Trustee Member
     5. Km. Preeti Kumari — Trustee Member
   - Each card: placeholder avatar, name (Hindi + English), designation, location

8. LATEST BLOG POSTS:
   - 3 latest published posts
   - Grid layout

9. VOLUNTEER CTA:
   - "बदलाव का हिस्सा बनें / Be Part of Change"
   - "Join 200+ volunteers making a difference"
   - "Register as Volunteer" button

10. FOOTER:
    - Logo + tagline
    - Quick links (4 columns): Pages | Programs | Connect | Legal
    - Address: Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi
    - Phone: +91-9454222116
    - Social media icons (Facebook, Instagram, YouTube, WhatsApp)
    - Copyright: "© 2025 सेवार्थ पथ संस्थानम् | All Rights Reserved"
    - "Reg. No. 202200996052093 | Indian Trusts Act 1882"

--- PAGE 2: ABOUT US (/about) ---
- Trust history and background
- Founder's message (from Shri Mahesh Kumar Pandey)
- Trust registration details displayed prominently
- Trustees table (all 5 members with full details from trust deed)
- Trust Nature section: "Non-political, Non-religious bias, Works for all communities"
- Mission statement (bilingual)
- Timeline of formation
- "Download Trust Deed" button (link to Supabase storage PDF)
- Google Maps embed for Varanasi office location

--- PAGE 3: PROGRAMS (/programs) ---
Create detailed cards for ALL 23+ program areas from the Trust Deed:
1. Education & Children (शिक्षा एवं बाल विकास)
2. Health & Medical (स्वास्थ्य एवं चिकित्सा)
3. Banaras Gharana Music Preservation (बनारस घराने का संगीत संरक्षण)
4. Women Empowerment (महिला सशक्तिकरण)
5. Environmental Protection (पर्यावरण संरक्षण)
6. Rural Development (ग्रामीण विकास)
7. Sanatan Dharma Preservation (सनातन धर्म संरक्षण)
8. Skill Development (कौशल विकास)
9. Social Welfare (सामाजिक कल्याण)
10. Mental Health (मानसिक स्वास्थ्य)
11. Disability Support (दिव्यांग सहायता)
12. Senior Citizens Care (वरिष्ठ नागरिक देखभाल)
13. Minority Welfare (अल्पसंख्यक उत्थान)
14. Road Safety (सड़क सुरक्षा)
15. Religious & Pilgrimage Sites (धार्मिक एवं तीर्थ स्थल)
16. Adult & Vocational Education (प्रौढ़ एवं व्यावसायिक शिक्षा)
17. Ayurveda & Traditional Medicine (आयुर्वेद चिकित्सा)
18. Yoga & Wellness (योग एवं स्वास्थ्य)
Each card: Icon, title (Hindi + English), description, "Get Involved" button

--- PAGE 4: DONATE (/donate) ---
Build a COMPLETE, FULLY FUNCTIONAL donation page:

Left Panel:
- Why donate text (bilingual)
- Impact breakdown: "₹500 feeds a family for a week", "₹1,000 buys books for 5 children"
- 80G note: "80G certification process underway. Receipt issued for all donations."
- Bank transfer details as backup option
- Trust's PAN number field (add when available)
- Logos: Razorpay secure payment badge

Right Panel — Donation Form:
- Donor Name (required)
- Email (for receipt)
- Phone number
- City
- Donation Purpose dropdown: General | Education | Health | Music & Culture | Women Empowerment | Environment | Disaster Relief
- Amount selection:
  * Quick amounts: ₹11 | ₹51 | ₹101 | ₹251 | ₹501 | ₹1,001 | ₹2,100 | ₹5,100
  * Custom amount input
- Anonymous donation checkbox
- PAN number (optional, for 80G)
- "Proceed to Pay" button (saffron, full-width, pulsing)

On click:
- Call POST /api/payments/create-order
- Open Razorpay checkout modal
- On success: show confetti animation + "Dhanyavad! धन्यवाद!" screen
- Auto-send receipt email
- Store in Supabase donations table

Razorpay Checkout Config:
```javascript
const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: amount * 100, // in paise
  currency: "INR",
  name: "सेवार्थ पथ संस्थानम्",
  description: "Donation - " + purpose,
  image: "/images/logo.svg",
  order_id: orderId,
  prefill: { name: donorName, email: donorEmail, contact: donorPhone },
  theme: { color: "#FF6B35" },
  modal: { backdropclose: false }
}
```

--- PAGE 5: MEMBERSHIP (/membership) ---
Four membership tier cards with pricing:

TIER 1 — SEVA MITRA (सेवा मित्र) — FREE
- Badge: Green "Free"
- Benefits: Newsletter, volunteer access, digital welcome kit
- CTA: "Register Free"

TIER 2 — SEVA SAHAYAK (सेवा सहायक) — ₹365/year
- Badge: Blue "Annual"
- Benefits: Digital ID card, events access, activity certificate
- CTA: "Join at ₹365/year"

TIER 3 — SEVA PRAMUKH (सेवा प्रमुख) — ₹1,100/year
- Badge: Orange "Active"
- Benefits: All above + priority program access, special mention in annual report
- CTA: "Join at ₹1,100/year"

TIER 4 — SEVA RATNA (सेवा रत्न) — ₹5,100 (Lifetime)
- Badge: Gold "Lifetime"  
- Benefits: All above + lifetime membership certificate, website recognition, trust meeting invites
- CTA: "Become Seva Ratna"

Below tiers: Membership form (name, email, phone, address, occupation, why join) → Payment → Supabase insert → Email welcome + digital ID card.

--- PAGE 6: VOLUNTEER (/volunteer) ---
Form fields:
- Full Name | Email | Phone (required)
- Age | City | State
- Occupation | Education
- Skills (multi-select chips): Teaching, Healthcare, Music, IT/Tech, Legal, Finance, Photography, Social Media, Translation (Hindi/English), Event Management, Counseling, Research, Other
- Availability: Weekdays | Weekends | Both
- Hours per week slider: 2-20 hours
- Areas of Interest (multi-select): same as program areas
- Why do you want to volunteer? (text area)
- "Submit Application" button
- Post-submit: "Application received! We'll contact you within 3 business days on WhatsApp."

--- PAGE 7: EVENTS (/events) ---
- Tabs: Upcoming | Past
- Event cards: cover image, date, title (bilingual), location, type badge
- Filter by: Category, Month
- Event detail page with registration form

--- PAGE 8: GALLERY (/gallery) ---
- Masonry photo grid
- Filter by category: Programs | Events | Team | Office | Campaigns
- Lightbox on click
- Lazy loading

--- PAGE 9: BLOG (/blog) ---
- Grid of blog posts (bilingual)
- Tags filter
- Search bar
- Individual post pages with Hindi/English toggle

--- PAGE 10: CONTACT (/contact) ---
- Google Maps embed: Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi
- Address, Phone, WhatsApp button
- Contact form: Name, Email, Phone, Subject, Message
- Social media links
- Office hours

===========================================================================
SECTION 6: AUTH & DASHBOARD
===========================================================================

AUTH PAGES:
- /auth/login — Email OTP login (Supabase Magic Link)
- /auth/signup — Register with email + basic details
- /auth/callback — Supabase callback handler

MEMBER DASHBOARD (/dashboard):
- Welcome back message (personalized, bilingual)
- Membership status card (tier, valid until, member ID)
- Total donations made
- Download membership certificate button
- Download donation receipts list
- Profile edit form
- Upcoming events sidebar

ADMIN DASHBOARD (/admin) — Protected by is_admin check:
- Stats row: Total Donations (₹), Total Members, Total Volunteers, Pending Approvals
- Recent donations table (name, amount, date, status)
- Member management: approve/reject pending memberships
- Volunteer management: approve applications
- Blog CMS: create/edit/delete posts
- Event management: create/edit events
- Gallery: upload images to Supabase storage
- Contact messages: inbox with read/unread
- Settings: update site display stats, maintenance mode toggle

===========================================================================
SECTION 7: API ROUTES — IMPLEMENT ALL OF THESE
===========================================================================

--- /api/payments/create-order ---
POST handler:
1. Validate request body: {amount, donorName, donorEmail, donorPhone, purpose, isAnonymous}
2. Create Razorpay order: await razorpay.orders.create({amount: amount*100, currency:'INR'})
3. Insert pending donation in Supabase
4. Return {orderId, amount, currency, keyId}

--- /api/payments/verify ---
POST handler:
1. Receive {razorpayPaymentId, razorpayOrderId, razorpaySignature, donationId}
2. Verify HMAC: crypto.createHmac('sha256', RAZORPAY_SECRET).update(orderId+'|'+paymentId).digest('hex')
3. If valid: update donation status to 'completed', generate receipt number 'SPS-2025-XXXXXXXX'
4. Trigger email receipt
5. Return {success: true, receiptNumber}

--- /api/payments/webhook ---
POST handler (Razorpay webhook):
1. Verify webhook signature
2. Handle events: payment.captured, payment.failed
3. Update donation/membership status accordingly

--- /api/donations/receipt/[id] ---
GET handler:
1. Fetch donation from Supabase by ID
2. Verify requester owns this donation (or is admin)
3. Generate PDF using @react-pdf/renderer
4. PDF content: NGO logo, NGO name, Reg no, Donor name, Amount, Date, Purpose, Receipt No, "Thank you" message, "80G pending" note, Signature line
5. Return PDF as response with Content-Type: application/pdf

--- /api/memberships/register ---
POST handler:
1. Create Supabase user if not exists
2. For paid tiers: create Razorpay order
3. For free (Seva Mitra): directly insert membership, send welcome email
4. Generate member ID: 'SPS-M-2025-XXXX' (sequential)
5. Return {memberId, orderId (if paid), success}

--- /api/memberships/certificate/[id] ---
GET handler:
Generate beautiful PDF certificate using @react-pdf/renderer:
- NGO letterhead with saffron/green design
- "This is to certify that [Name] is a valued [Tier] member"
- Member ID, Valid from/until
- Authorized signatory line for Shri Mahesh Kumar Pandey
- NGO seal/stamp placeholder

--- /api/volunteers/register ---
POST handler:
1. Insert volunteer record in Supabase
2. Generate volunteer ID: 'SPS-V-2025-XXXX'
3. Send confirmation email with "We'll contact you on WhatsApp within 3 days"
4. Send internal notification to admin email
5. Return {success, volunteerId}

--- /api/contact/send ---
POST handler:
1. Insert message in contact_messages table
2. Send email notification to admin
3. Auto-reply to sender
4. Return {success}

--- /api/email/send-receipt ---
POST handler:
1. Use Resend to send formatted HTML email
2. Email subject: "Donation Receipt | सेवार्थ पथ संस्थानम् | ₹[amount]"
3. HTML email: NGO branded, bilingual, receipt details, "Dhanyavad for your generosity"
4. Attach PDF receipt

===========================================================================
SECTION 8: i18n TRANSLATIONS — CREATE BOTH FILES FULLY
===========================================================================

Create /messages/en.json with ALL strings:
{
  "nav": {
    "home": "Home", "about": "About Us", "programs": "Programs",
    "donate": "Donate", "membership": "Membership", "volunteer": "Volunteer",
    "events": "Events", "gallery": "Gallery", "blog": "Blog", "contact": "Contact",
    "donateNow": "Donate Now", "joinUs": "Join Us", "login": "Login", "logout": "Logout",
    "dashboard": "My Dashboard"
  },
  "hero": {
    "tagline": "Service is the Highest Dharma",
    "subtitle": "Working for a better society through education, health, culture & social welfare",
    "cta_donate": "Donate Now",
    "cta_join": "Become a Member",
    "reg_text": "Registered Trust | Reg. No. 202200996052093 | Indian Trusts Act 1882"
  },
  "stats": {
    "families": "Families Helped",
    "volunteers": "Active Volunteers",
    "events": "Events Organized",
    "programs": "Programs Running"
  },
  "donate": {
    "title": "Support Our Mission",
    "subtitle": "Your generosity transforms lives",
    "amount_label": "Select Amount",
    "custom_placeholder": "Enter custom amount (₹)",
    "name_label": "Your Full Name",
    "email_label": "Email Address",
    "phone_label": "Phone Number",
    "purpose_label": "Donation Purpose",
    "anonymous_label": "Make this donation anonymous",
    "pan_label": "PAN Number (for 80G receipt)",
    "submit": "Proceed to Pay",
    "success_title": "Dhanyavad! Thank You! 🙏",
    "success_subtitle": "Your donation receipt has been sent to your email.",
    "eighty_g": "80G tax exemption certificate will be issued once certification is complete.",
    "purposes": {
      "general": "General Fund",
      "education": "Education",
      "health": "Health & Medical",
      "music": "Music & Culture",
      "women": "Women Empowerment",
      "environment": "Environment",
      "disaster": "Disaster Relief"
    }
  },
  "membership": {
    "title": "Join Our Family",
    "subtitle": "Choose your level of involvement",
    "tiers": {
      "seva_mitra": {
        "name": "Seva Mitra",
        "tagline": "Friend of Service",
        "price": "Free",
        "period": "Forever",
        "benefits": ["Newsletter access", "Volunteer opportunities", "Digital welcome kit", "Event invitations"]
      },
      "seva_sahayak": {
        "name": "Seva Sahayak",
        "tagline": "Helper in Service",
        "price": "₹365",
        "period": "per year",
        "benefits": ["All Seva Mitra benefits", "Digital ID card", "Activity certificate", "Priority event registration"]
      },
      "seva_pramukh": {
        "name": "Seva Pramukh",
        "tagline": "Leader in Service",
        "price": "₹1,100",
        "period": "per year",
        "benefits": ["All Seva Sahayak benefits", "Special program access", "Annual report recognition", "Direct WhatsApp group access"]
      },
      "seva_ratna": {
        "name": "Seva Ratna",
        "tagline": "Gem of Service",
        "price": "₹5,100",
        "period": "one-time lifetime",
        "benefits": ["All benefits forever", "Lifetime certificate", "Website recognition", "Trust meeting invitations", "Annual felicitation"]
      }
    }
  },
  "footer": {
    "address": "Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi - 221005, Uttar Pradesh",
    "phone": "+91-9454222116",
    "email": "info@sewarthpathsansthanam.org",
    "copyright": "© 2025 Sevarth Path Sansthanam. All Rights Reserved.",
    "reg_info": "Registered Trust | Reg. No. 202200996052093 | Indian Trusts Act 1882",
    "tagline": "Service is the Highest Dharma"
  }
}

Create /messages/hi.json with FULL Hindi translations for ALL keys:
{
  "nav": {
    "home": "होम", "about": "हमारे बारे में", "programs": "कार्यक्रम",
    "donate": "दान", "membership": "सदस्यता", "volunteer": "स्वयंसेवक",
    "events": "आयोजन", "gallery": "गैलरी", "blog": "ब्लॉग", "contact": "संपर्क",
    "donateNow": "दान करें", "joinUs": "जुड़ें", "login": "लॉगिन", "logout": "लॉगआउट",
    "dashboard": "मेरा डैशबोर्ड"
  },
  "hero": {
    "tagline": "सेवा परमो धर्म",
    "subtitle": "शिक्षा, स्वास्थ्य, संस्कृति एवं सामाजिक कल्याण के माध्यम से एक बेहतर समाज का निर्माण",
    "cta_donate": "दान करें",
    "cta_join": "सदस्य बनें",
    "reg_text": "पंजीकृत न्यास | पंजीकरण सं. 202200996052093 | भारतीय न्यास अधिनियम 1882"
  },
  "donate": {
    "title": "हमारे मिशन का समर्थन करें",
    "subtitle": "आपकी उदारता जीवन बदलती है",
    "amount_label": "राशि चुनें",
    "custom_placeholder": "अपनी राशि डालें (₹)",
    "name_label": "आपका पूरा नाम",
    "email_label": "ईमेल पता",
    "phone_label": "फोन नंबर",
    "purpose_label": "दान का उद्देश्य",
    "anonymous_label": "यह दान गुमनाम रखें",
    "pan_label": "पैन नंबर (80G रसीद के लिए)",
    "submit": "भुगतान के लिए आगे बढ़ें",
    "success_title": "धन्यवाद! 🙏",
    "success_subtitle": "आपकी दान रसीद आपके ईमेल पर भेज दी गई है।",
    "eighty_g": "80G कर छूट प्रमाण पत्र प्रमाणीकरण पूर्ण होने पर जारी किया जाएगा।"
  },
  "membership": {
    "title": "हमारे परिवार से जुड़ें",
    "subtitle": "अपनी सहभागिता का स्तर चुनें"
  },
  "footer": {
    "address": "प्लाट नं0 516, कमलेश नगर, भगवानपुर, लंका वाराणसी - 221005, उत्तर प्रदेश",
    "phone": "+91-9454222116",
    "email": "info@sewarthpathsansthanam.org",
    "copyright": "© 2025 सेवार्थ पथ संस्थानम्। सर्वाधिकार सुरक्षित।",
    "reg_info": "पंजीकृत न्यास | पंजीकरण सं. 202200996052093 | भारतीय न्यास अधिनियम 1882",
    "tagline": "सेवा परमो धर्म"
  }
}

===========================================================================
SECTION 9: DESIGN SYSTEM — IMPLEMENT EXACTLY
===========================================================================

TAILWIND CONFIG additions:
- Colors: saffron: '#FF6B35', deepGreen: '#2D6A4F', gold: '#F4A261', creamBg: '#FFFBF5'
- Font families: devanagari: ['Noto Sans Devanagari'], display: ['Poppins']
- Custom animations: lotus-spin, float, pulse-orange, wave-ganga

GLOBAL CSS (/app/globals.css):
- Import Google Fonts: Noto Sans Devanagari + Poppins
- CSS variables for all colors
- Custom scrollbar (saffron thumb, cream track)
- Smooth scroll behavior
- Tailwind base, components, utilities

LOGO (create SVG):
- Lotus flower with 8 petals in saffron/orange
- "सेवार्थ पथ संस्थानम्" text below in Devanagari
- "Sevarth Path Sansthanam" in English below
- Export both colored and white versions

LOADING STATE:
- Custom lotus petal spinner (CSS animation)
- Saffron color

LANGUAGE SWITCHER COMPONENT:
- Fixed position bottom-right (mobile) or top-right (desktop)
- Toggle: "हिं | EN" pill button
- Animated slide transition on language change
- Persist choice to localStorage: 'sps_language'
- On mount: detect navigator.language, default Hindi if Indian locale

===========================================================================
SECTION 10: ENVIRONMENT & DEPLOYMENT SETUP
===========================================================================

CREATE .env.local.example:
```
# Supabase (get from supabase.com project settings)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay (get from dashboard.razorpay.com)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Resend (get from resend.com)
RESEND_API_KEY=re_xxx

# App Config
NEXT_PUBLIC_SITE_URL=https://sewarthpathsansthanam.org
NEXT_PUBLIC_WHATSAPP_NUMBER=919454222116
NEXT_PUBLIC_ADMIN_EMAIL=info@sewarthpathsansthanam.org

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

CREATE README.md with STEP-BY-STEP SETUP:
1. Clone repo & npm install
2. Create Supabase project at supabase.com (free)
3. Run supabase/migrations/001_initial_schema.sql in Supabase SQL editor
4. Create Razorpay account at razorpay.com (free to register)
5. Create Resend account at resend.com (free tier: 3,000 emails/month)
6. Copy .env.local.example to .env.local and fill values
7. npm run dev — test locally
8. Push to GitHub
9. Import repo in Vercel (free at vercel.com)
10. Add environment variables in Vercel dashboard
11. Connect domain sewarthpathsansthanam.org to Vercel
12. Deploy!

===========================================================================
SECTION 11: ADDITIONAL REQUIREMENTS
===========================================================================

SEO SETUP:
- Create /app/sitemap.ts — auto-generate sitemap
- Create /app/robots.ts — allow all, disallow /admin, /dashboard
- Add metadata to all pages (bilingual title/description)
- Create /public/og-image.jpg placeholder (1200x630, NGO branding)

WHATSAPP FLOATING BUTTON:
- Fixed position, bottom-left
- WhatsApp green (#25D366)
- Opens: wa.me/919454222116
- Tooltip: "Chat with us on WhatsApp"
- Show on all public pages

ACCESSIBILITY:
- All images have descriptive alt text (bilingual)
- Proper heading hierarchy (h1→h2→h3)
- Focus visible on all interactive elements
- Skip to main content link

PERFORMANCE:
- All images via next/image with lazy loading
- Font preloading in layout.tsx
- Static generation for: homepage, about, programs, donate, membership
- ISR (revalidate: 3600) for: events, blog, gallery

ERROR HANDLING:
- Custom 404 page with NGO branding and "Go Home" button
- Error boundary with friendly bilingual message
- API error responses with proper HTTP status codes
- Razorpay failure: redirect to /donate with error toast

===========================================================================
SECTION 12: FINAL BUILD INSTRUCTIONS
===========================================================================

1. Install ALL dependencies in package.json:
   next, react, react-dom, typescript, tailwindcss, @tailwindcss/forms,
   @tailwindcss/typography, shadcn/ui, @supabase/supabase-js,
   @supabase/ssr, next-intl, react-hook-form, zod, @hookform/resolvers,
   zustand, framer-motion, razorpay, @types/razorpay,
   @react-pdf/renderer, resend, react-email, next-seo,
   lucide-react, date-fns, clsx, tailwind-merge

2. Configure next.config.js:
   - next-intl plugin
   - Image domains: supabase co, ui-avatars.com
   - i18n: locales: ['en', 'hi'], defaultLocale: 'hi'

3. Configure middleware.ts:
   - next-intl locale detection
   - Supabase auth session refresh
   - Redirect /admin if not is_admin
   - Redirect /dashboard if not authenticated

4. BUILD ORDER (autonomous):
   Step 1: Setup (package.json, configs, env example)
   Step 2: Database (SQL migration file)
   Step 3: Supabase client setup
   Step 4: i18n messages (en.json + hi.json)
   Step 5: Layout components (Navbar, Footer, LanguageSwitcher, WhatsAppButton)
   Step 6: Homepage (all 10 sections)
   Step 7: All public pages
   Step 8: API routes (payments first, then others)
   Step 9: Auth pages
   Step 10: Dashboard pages
   Step 11: Admin pages
   Step 12: PDF generation (receipt + certificate)
   Step 13: SEO, sitemap, robots
   Step 14: README.md with full deployment guide

5. After building, provide:
   - Summary of all files created
   - All environment variables needed
   - Step-by-step Supabase + Vercel + Razorpay setup guide
   - Known limitations and how to upgrade when traffic grows

===========================================================================
START BUILDING NOW. DO NOT ASK QUESTIONS. BUILD EVERYTHING.
CREATE ALL FILES. MAKE IT PRODUCTION-READY.
JAI SEVA! 🙏
===========================================================================
```

---

# APPENDIX: QUICK SETUP CHECKLIST

## A. Pre-Launch Checklist

### Accounts to Create (All Free):
- [ ] **Supabase**: supabase.com → New Project → Free tier
- [ ] **Vercel**: vercel.com → Free Hobby plan
- [ ] **Razorpay**: razorpay.com → Create account → Get API keys
- [ ] **Resend**: resend.com → Free 3,000 emails/month
- [ ] **Google Analytics**: analytics.google.com → New GA4 property
- [ ] **Domain**: Buy sewarthpathsansthanam.org (~₹999/year)
- [ ] **GitHub**: github.com → Free repo for code

### Razorpay Account Setup for NGO:
1. Register at razorpay.com with business email
2. Business type: "Trust/NGO"
3. Upload: Trust Deed, PAN card of Trust, Trustee Aadhaar
4. Bank account: Trust's bank account (open one at SBI/PNB with Trust deed)
5. Activation: 2-3 business days
6. Start with Test mode during development

### Supabase Setup:
1. Create project, choose region: Mumbai (ap-south-1)
2. Go to SQL Editor → Paste 001_initial_schema.sql → Run
3. Go to Auth → Settings → Enable Email OTP
4. Go to Storage → Create bucket "gallery" (public) and "documents" (private)
5. Copy: Project URL + anon key + service role key

### Vercel Setup:
1. Import GitHub repo
2. Add all environment variables from .env.local.example
3. Framework: Next.js (auto-detected)
4. Build command: npm run build
5. Add custom domain sewarthpathsansthanam.org
6. Update nameservers at domain registrar

## B. Content to Prepare for Website:
- [ ] High-resolution photos of all 5 trustees
- [ ] NGO activity photos (minimum 20 for gallery)
- [ ] Founder's message (200 words in Hindi + English)
- [ ] Scanned copy of Trust Deed (for download page)
- [ ] Bank account details (for direct transfer option)
- [ ] Logo design (or use AI-generated lotus logo from the code)

## C. Post-Launch (Within 30 Days):
- [ ] Apply for NGO Darpan registration (ngo.india.gov.in) — free
- [ ] Apply for Google for Nonprofits (get Google Workspace free)
- [ ] Apply for 80G certification (Income Tax Dept.)
- [ ] Apply for 12A certification (tax exemption for NGO income)
- [ ] Register on GiveIndia platform for additional donations

---

*Document prepared by: Claude Sonnet | Date: May 2025*
*For: सेवार्थ पथ संस्थानम् | Sevarth Path Sansthanam, Varanasi*
*Reg. No. 202200996052093 | Indian Trusts Act 1882*
