# AGENTS.md - Sewarth Path Sansthanam

## Critical Setup
- All project commands (npm, vercel, git) must be run from the `repo_temp/` subdirectory, not the repository root.
- Tech stack: Next.js 14 App Router + TypeScript, MUI v6, Tailwind CSS, Supabase (Postgres/Auth/Storage), Razorpay (INR payments), next-intl (Hindi/English i18n), deployed on Vercel free tier.

## Build/Lint Commands
```bash
cd repo_temp  # Required for all commands
npm run dev    # Dev server (http://localhost:3000)
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint (eslint-config-next)
```
No test framework is configured.

## Architecture & Conventions
### i18n (next-intl)
- Locale path prefix: `/en/*` and `/hi/*` (middleware.ts: `localePrefix: "always"`)
- Default locale: Hindi (`hi`)
- Messages: `messages/en.json`, `messages/hi.json`
- Client: `useTranslations("section")` from `next-intl`
- Server: `getTranslations()` from `next-intl/server`

### Middleware (middleware.ts)
- Handles locale routing and Supabase session refresh for `/dashboard/*` and `/admin/*`
- Admin routes require `profiles.role = 'admin'`

### Supabase
- Clients: `@/lib/supabase/client.ts` (browser, anon key), `@/lib/supabase/server.ts` (server, service role for admin ops)
- RLS enabled on all tables; anon key for user-owned data, service role for admin
- Migrations: `supabase/migrations/`
- Allowed remote images (next.config.mjs): `*.supabase.co`, `ui-avatars.com`, `images.unsplash.com`

### MUI Theme (`lib/theme.ts`)
- Client-side only (`"use client"` directive)
- Primary: `#E07B39` (Saffron), Secondary: `#2D6A4F` (Deep Green), Background: `#FFFBF5` (Cream)
- Default border radius: 8px, 12px for Cards

### API Routes
- App Router `route.ts` handlers
- Use `NextRequest`/`NextResponse`; parse body with `req.json()`
- Razorpay webhook: `/api/payments/webhook`; verify signatures with `RAZORPAY_KEY_SECRET`
- Error responses: `{ error: "message" }` with appropriate HTTP status codes

### Environment Variables
Required (never commit actual values; configure in Vercel dashboard):
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
```
Browser-exposed vars require `NEXT_PUBLIC_` prefix.

### Payments & Membership
- Razorpay for INR/UPI; tiers: `VOL_FREE` (0 INR), `ANNUAL_365` (365 INR/yr), `SUPPORTER_1001` (1001 INR/yr), `LIFETIME_5001` (5001 INR lifetime)
- Membership verification: `/[locale]/verify/[public_member_id]` (public access)
- Donation receipts include "80G tax exemption pending" notice until official certification

### Imports & Naming
- Path alias: `@/*` maps to project root
- React components: PascalCase (`Navbar.tsx`); utilities/hooks: camelCase (`useAuth.ts`)
- API routes: kebab-case directories (`app/api/payments/create-order/route.ts`)
- MUI icons: import individually from `@mui/icons-material/<IconName>`
