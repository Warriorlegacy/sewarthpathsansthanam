# सेवार्थ पथ संस्थानम् (Sewarth Path Sansthanam) - NGO Website

A bilingual (Hindi/English) NGO website built with Next.js 14, MUI v6, Supabase, and Razorpay integration.

## Features

- **Bilingual Support**: Full Hindi and English language support with next-intl
- **User Authentication**: Supabase Auth with email/password and magic link
- **Membership System**: Multiple tiers (Free Volunteer, Annual, Supporter, Lifetime)
- **Donation System**: Integrated Razorpay payments with receipt generation
- **Volunteer Registration**: Application system with admin approval
- **Admin Dashboard**: Manage members, donations, volunteers, events, and content
- **Responsive Design**: Mobile-first design with MUI components
- **SEO Optimized**: Server-side rendering with Next.js App Router

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, MUI v6, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Razorpay (INR/UPI support)
- **i18n**: next-intl (Hindi/English)
- **Deployment**: Vercel (Free Tier)

## Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Razorpay account (test mode for development)
- Vercel account for deployment

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Warriorlegacy/sewarthpathsansthanam.git
   cd sewarthpathsansthanam/repo_temp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase and Razorpay credentials
   ```bash
   cp .env.example .env
   ```

4. **Supabase Setup**
   - Create a new Supabase project
   - Run the migration in `supabase/migrations/20260508122122_create_core_schema.sql`
   - Enable Row Level Security (RLS) - already included in migration
   - Configure authentication providers (email/password, magic link)

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (redirects to `/hi` by default)

## Environment Variables

See `.env.example` for all required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-only)
- `RAZORPAY_KEY_ID` - Razorpay key ID
- `RAZORPAY_KEY_SECRET` - Razorpay secret key
- `RAZORPAY_WEBHOOK_SECRET` - Webhook secret for payment verification

## Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
repo_temp/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routes (en, hi)
│   │   ├── page.tsx      # Home page
│   │   ├── about/        # About page
│   │   ├── donate/       # Donation page
│   │   ├── membership/   # Membership page
│   │   ├── volunteer/    # Volunteer registration
│   │   ├── dashboard/    # User dashboard (protected)
│   │   ├── admin/        # Admin dashboard (protected)
│   │   ├── login/        # Login page
│   │   └── signup/      # Signup page
│   └── api/              # API routes
│       ├── payments/      # Razorpay payment endpoints
│       ├── memberships/   # Membership registration
│       ├── volunteers/    # Volunteer registration
│       └── contact/       # Contact form
├── components/            # React components
├── lib/                  # Utilities and configurations
│   ├── supabase/        # Supabase clients
│   └── theme.ts         # MUI theme
├── messages/             # i18n translation files
└── supabase/
    └── migrations/       # Database schema
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables in Vercel settings
4. Deploy - Vercel will automatically build and deploy

The site will be available at `https://sewarthpathsansthanam.org` once DNS is configured.

## Membership Tiers

| Tier | Price | Duration | Benefits |
|------|-------|-----------|----------|
| Volunteer Member (स्वयंसेवक सदस्य) | ₹0 | 1 year | Newsletter, volunteer opportunities |
| Annual Member (वार्षिक सदस्य) | ₹365 | 1 year | Digital ID, certificates, priority access |
| Supporter Member (सहयोगी सदस्य) | ₹1,001 | 1 year | All above + recognition |
| Lifetime Member (आजीवन सदस्य) | ₹5,001 | Lifetime | All benefits forever |

## License

This project is proprietary - Sewarth Path Sansthanam NGO.

## Contact

- **Address**: Plot No. 516, Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi - 221005
- **Phone**: +91-9454222116
- **Email**: info@sewarthpathsansthanam.org
- **Registration**: Indian Trusts Act 1882 | Reg. No. 202200996052093
