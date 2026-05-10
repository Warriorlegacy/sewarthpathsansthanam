# Sewarth Path Sansthanam - Implementation Summary

**Project:** Bilingual NGO Website & Management Platform  
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, MUI v6, Supabase, Razorpay, Resend, Groq AI  
**Repository:** https://github.com/Warriorlegacy/sewarthpathsansthanam.git  
**Live URL:** https://sewarthpathsansthanam.vercel.app  
**Languages:** Hindi (Default), English  
**Design Palette:** Saffron (#E07B39), Green (#2D6A4F), Cream (#FFFBF5)

---

## ✅ Completed Features

### 1. Core Platform Infrastructure
- Next.js 14 App Router with TypeScript configuration
- Bilingual i18n routing (`/hi`, `/en`) with next-intl
- Middleware for auth protection and locale handling
- Supabase integration (Auth, Postgres, Storage, RLS)
- Environment variable management (.env.example)

### 2. Public Website Sections
- **Home Page:** Hero, About, Programs, Events, Impact Stories, Trustees
- **About Page:** NGO mission, vision, team details
- **Programs Page:** Ongoing initiatives with bilingual descriptions
- **Events Page:** Upcoming and past events
- **Stories/Impact Page:** Volunteer and beneficiary testimonials
- **Contact Page:** Form with email integration
- **Resources Page:** Registration documents and downloadable forms (bilingual tabs)

### 3. User Authentication & Onboarding
- Email/password signup via Supabase Auth
- Role-based profiles: public, volunteer, member, admin, super_admin
- OAuth social login (Google, GitHub) configured
- Session management with secure HTTP-only cookies

### 4. Membership System
- Four membership tiers:
  - **VOL_FREE** – Free volunteer registration
  - **ANNUAL_365** – ₹365/year with digital ID card
  - **SUPPORTER_1001** – ₹1001 one-time supporter
  - **LIFETIME_5001** – ₹5001 lifetime membership
- Sequential member ID generation: `SPS-M-YYYY-NNNN`
- One-time payment via Razorpay integration
- Automatic membership expiry tracking
- PDF membership ID card generation (certificate-style)
- Public verification page at `/verify/[member_id]` with QR code

### 5. Volunteer Management
- Volunteer application form with AI-powered skill tagging (Groq)
- Sequential volunteer ID: `SPS-V-YYYY-NNNN`
- Admin approval workflow
- Auto-generated volunteer certificate (PDF) upon approval
- Certificate emailed via Resend

### 6. Donation Engine
- Razorpay payment links integration
- One-time donation flow (guest checkout)
- Payment verification webhook handler
- AI-generated personalized thank-you messages (Groq)
- Donation receipt emails (Resend)
- Donation history tracking in user dashboard

### 7. Admin Dashboard (Role: admin/super_admin)
- User management: view, approve/reject volunteers, manage members
- Membership plan oversight
- Donation reports and analytics
- Content CMS for events, programs, stories
- **Download All Forms ZIP** – bulk download of all form templates
- Protected route (`/admin`) with role-based access control

### 8. AI Chatbot (Seva AI)
- Floating chatbot UI component
- Backend API powered by Groq (llama-3.1-8b-instant)
- NGO-specific system prompt for guidance
- Real-time streaming responses
- Handles queries about donations, volunteering, programs, membership

### 9. Communications (Resend)
- Welcome email sequence
- Donation receipt with AI thank-you note
- Volunteer approval notification + certificate attachment
- Membership confirmation with ID download link
- Transactional email templates in `lib/resend.ts`

### 10. QR Verification System
- QR code generation via external API (api.qrserver.com)
- Embedded in member ID card and verification page
- Public scan-to-verify flow

### 11. PDF Generation
- Member ID cards (certificate format)
- Volunteer certificates
- ID verification page with print button
- Templates in `lib/utils/pdf-generator.ts`

### 12. Infrastructure & DevOps
- Vercel deployment (auto-deploy from GitHub)
- vercel.json cron job: daily keep-alive for Supabase free tier
- Supabase SQL migrations (core schema + admin role assignment)
- GitHub Actions ready (workflow templates in .github/)
- Domain configured: sewarthpathsansthanam.org → Vercel

---

## 🗄️ Database Schema (Supabase)

### Key Tables
- `profiles` – user roles and extended profile data
- `memberships` – membership records with tier, expiry, public_member_id
- `membership_plans` – plan definitions (tier, price, description)
- `volunteer_applications` – applications with volunteer_id, status, AI tags
- `volunteers` – approved volunteers with certificate details
- `donations` – donation transactions with payment metadata
- `payments` – unified payment log (memberships + donations)
- `events` – bilingual event details
- `programs` – bilingual program descriptions
- `stories` – impact stories/testimonials
- `pages` – CMS pages (About, Contact, etc.)
- `contact_messages` – form submissions

### Row Level Security (RLS)
All tables have RLS policies:
- Users can read public content
- Authenticated users can manage their own profiles
- Admins have full read/write access to all tables
- Policies reference `auth.uid()` and `profiles.role`

---

## 🔌 API Endpoints

### Public
- `GET /api/plans` – List membership plans
- `GET /api/events` – List events
- `GET /api/programs` – List programs
- `GET /api/stories` – List impact stories

### Authentication
- `POST /api/auth/register` – User signup with role selection
- `POST /api/auth/callback` – OAuth callback handler

### Membership
- `POST /api/memberships/register` – Create membership + Razorpay order
- `GET /api/memberships/my` – Current user's membership
- `GET /api/memberships/[id]` – Public membership lookup (verification)

### Volunteer
- `POST /api/volunteers/register` – Submit volunteer application
- `GET /api/volunteers/my` – Current user's volunteer status
- `POST /api/volunteers/approve/[id]` – Admin approval + certificate gen

### Donation
- `POST /api/donations/create` – Create donation order
- `POST /api/payments/verify` – Verify Razorpay payment + trigger emails

### Admin
- `GET /api/admin/users` – List all users
- `PATCH /api/admin/volunteers/[id]` – Approve/reject volunteer
- `GET /api/admin/stats` – Dashboard metrics
- `GET /api/admin/download-forms` – ZIP of all form templates

### AI
- `POST /api/ai/chat` – Chatbot endpoint (Groq streaming)

### PDF Generation
- `GET /api/certificates/generate?type=member&id=...` – Generate certificate PDF
- `GET /api/certificates/generate?type=volunteer&id=...` – Generate certificate PDF

---

## 📁 Project Structure

```
repo_temp/
├── app/
│   ├── [locale]/
│   │   ├── admin/              # Admin dashboard
│   │   ├── verify/             # Public ID verification page
│   │   ├── resources/          # Downloadable forms & documents
│   │   ├── membership/         # Membership tier selection
│   │   ├── volunteer/          # Volunteer signup
│   │   ├── donate/             # Donation page
│   │   ├── layout.tsx          # Bilingual layout wrapper
│   │   └── page.tsx            # Home page
│   ├── api/
│   │   ├── ai/chat/            # Chatbot endpoint
│   │   ├── memberships/register/
│   │   ├── volunteers/register/
│   │   ├── donations/create/
│   │   ├── payments/verify/
│   │   ├── certificates/generate/
│   │   └── admin/download-forms/
│   └── layout.tsx              # Root layout
├── components/
│   ├── ai/Chatbot.tsx          # Floating AI chat widget
│   ├── home/
│   │   ├── TrusteesSection.tsx # Team display (includes Piyush Raj Singh)
│   │   └── DonationCTA.tsx     # High-contrast donation button
│   ├── layout/
│   │   └── Navbar.tsx          # Navigation with logo animation + tagline
│   └── ui/                     # Reusable MUI/Tailwind components
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Supabase client
│   │   └── middleware.ts       # Auth state for middleware
│   ├── resend.ts               # Email service configuration
│   ├── groq.ts                 # Groq AI client
│   └── utils/
│       ├── memberId.ts         # Sequential ID generator (SPS-M/V-YYYY-NNNN)
│       └── pdf-generator.ts    # PDF certificate generator
├── supabase/
│   ├── migrations/
│   │   ├── 20260508122122_create_core_schema.sql
│   │   ├── 20260509234200_add_volunteer_id_to_applications.sql
│   │   └── 20260509234500_set_admin_piyush.sql
│   └── seed.sql                # Sample data (plans, pages)
├── public/
│   ├── forms/                  # HTML form templates
│   │   ├── membership_form.html
│   │   ├── volunteer_form.html
│   │   ├── id_card_template.html
│   │   └── certificate_template.html
│   └── images/                 # Static assets
├── .env.example                # Environment variables template
├── vercel.json                 # Vercel config + cron job
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

---

## 🔧 Configuration Files

### Environment Variables (`.env.example`)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Authentication
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Payments (Razorpay)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Email (Resend)
RESEND_API_KEY=

# AI (Groq)
GROQ_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

### vercel.json (Cron Job)
```json
{
  "crons": [
    {
      "path": "/api/cron/keepalive",
      "schedule": "0 0 * * *"
    }
  ]
}
```
Keeps Supabase free tier connection alive (runs daily at midnight UTC).

---

## 🎨 Styling & Design

- **Framework:** Tailwind CSS + Material-UI v6 (MUI)
- **Color Scheme:**
  - Primary: Saffron `#E07B39` (CTA buttons, highlights)
  - Secondary: Green `#2D6A4F` (success states, badges)
  - Background: Cream `#FFFBF5` (warm background)
- **Typography:** Inter (sans-serif) + Playfair Display (headings)
- **Components:** MUI Button, Card, Typography customized with Tailwind utilities
- **Animations:** Framer Motion for page transitions, hover effects on logo (scale+rotate)

---

## 📝 Key Implementation Decisions

### 1. AI Service (Groq vs. OpenAI)
**Decision:** Groq AI (free tier, fast inference)  
**Rationale:** Free tier sufficient for chatbot + content generation; llama-3.1-8b-instant model updated from deprecated llama3-8b-8192.

### 2. Email Provider (Resend vs. SendGrid)
**Decision:** Resend (free 3,000 emails/month)  
**Rationale:** Simpler API, better Next.js integration, generous free tier.

### 3. Payment Provider (Razorpay vs. Stripe)
**Decision:** Razorpay (India-focused)  
**Rationale:** Widely adopted in India, simpler UPI integration, better for NGO donations.

### 4. PDF Generation (local vs. external)
**Decision:** Local PDF generation with @react-pdf/renderer  
**Rationale:** No third-party dependency, avoids recurring costs, offline-capable.

### 5. QR Code (external API vs. library)
**Decision:** External API (api.qrserver.com)  
**Rationale:** Reduces bundle size, fast delivery, no server-side processing.

### 6. ID Generation (UUID vs. Sequential)
**Decision:** Sequential human-readable IDs (`SPS-M-YYYY-NNNN`)  
**Rationale:** Professional appearance, easier verification, matches NGO branding.

### 7. Webhook Security (Razorpay)
**Decision:** Webhook signature verification  
**Rationale:** Prevents fraudulent payment confirmation.

---

## 🔐 Security & Access Control

- **Authentication:** Supabase Auth with JWT sessions
- **Authorization:** Role-based (profiles.role)
- **RLS Policies:** Per-table row-level security rules
- **API Protection:** Middleware validates auth tokens
- **Webhook Verification:** Razorpay signatures validated
- **Environment Secrets:** All keys stored in Vercel env vars (never in code)

---

## 🧪 Testing Checklist

- [x] User registration (email + OAuth)
- [x] Membership purchase flow (Razorpay payment)
- [x] ID card download (PDF generation)
- [x] Volunteer application + admin approval
- [x] Certificate generation and email delivery
- [x] Donation receipt + AI thank-you note
- [x] Admin dashboard data display
- [x] Admin ZIP download of form templates
- [x] Public verification page (`/verify/[id]`) with QR
- [x] Resources page (`/resources`) bilingual tabs
- [x] AI chatbot (Seva AI) responses
- [x] Middleware routing (protected vs public routes)
- [x] Vercel deployment (build succeeds)
- [x] Supabase RLS policies enforced

---

## 🚀 Deployment Status

- **GitHub:** All commits pushed to `origin/main`
- **Vercel:** Auto-deploy enabled; latest commit deployed
- **Live Site:** https://sewarthpathsansthanam.vercel.app
- **Custom Domain:** sewarthpathsansthanam.org (DNS → Vercel)
- **Database:** Supabase project live with production data

---

## 📚 Documentation

- `README.md` – Setup, deployment, feature overview
- `AGENTS.md` – Repository-specific agent instructions  
- `.env.example` – All required environment variables
- Inline code comments for complex logic (PDF gen, AI, payments)

---

## ⚠️ Known Limitations & Future Enhancements

### Current Constraints
- Free tier limits: Supabase (500MB), Vercel (Hobby), Resend (3k emails/mo), Groq (rate-limited)
- PDF generation client-side (may fail on low-memory devices)
- No database migrations version control (manual SQL in Supabase UI)

### Recommended Improvements
1. **Upgrade Path:** Monitor free tier usage; upgrade Supabase/Vercel as needed
2. **Analytics:** Add Google Analytics / Plausible for traffic insights
3. **SEO:** Add sitemap.xml + robots.txt; submit to Google Search Console
4. **Caching:** Implement Redis for session store and API response caching
5. **Queue System:** Background job processing (email queue, PDF gen queue)
6. **Testing:** Add E2E tests with Playwright, unit tests with Jest/Vitest
7. **CI/CD:** GitHub Actions for automated testing and deployment
8. **Monitoring:** Error tracking (Sentry), uptime monitoring (UptimeRobot)

---

## 📞 Support & Contact

For issues or questions about this implementation, refer to:
- Repository README for setup instructions
- Supabase dashboard for database management
- Vercel dashboard for deployment logs
- Razorpay/Resend/Groq dashboards for service-specific issues

---

**Last Updated:** 2026-05-10  
**Implementation Status:** ✅ Complete – Ready for production
