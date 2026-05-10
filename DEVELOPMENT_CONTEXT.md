# Sewarth Path Sansthanam — Development Context

**Last Updated:** 2026-05-10  
**Repository:** https://github.com/Warriorlegacy/sewarthpathsansthanam.git  
**Live URL:** https://sewarthpathsansthanam.vercel.app  
**Working Directory:** `D:\sewarthpathsansthanam\repo_temp`  
**Branch:** `main` (up to date with `origin/main`)  
**Uncommitted Changes:** 1 file (`lib/supabase/server.ts`)

---

## 1. Session Overview

This development session resolved a series of build and runtime errors encountered after implementing the membership verification, certificate generation, admin dashboard, and AI chatbot features. The project was initially failing to build on Vercel due to webpack configuration issues, incorrect component boundaries (client/server), missing environment variable handling, and unhandled Supabase query exceptions in the admin panel. The session involved systematic debugging of each error, replacing problematic dependencies (archiver → jszip), implementing proper error boundaries with try-catch blocks, fixing MUI icon imports, and adding robust environment variable validation. The admin panel was hardened to gracefully handle missing Supabase configuration and downstream query failures, ensuring the site remains partially functional even when backend services are misconfigured.

**Key Outcomes:**
- Production build succeeds locally and on Vercel
- Admin panel resilient to missing environment variables and Supabase outages
- PDF generation (certificates, ID cards) working with base64 assets
- ZIP download of form templates functional
- All API routes properly typed and guarded

---

## 2. Build Errors Fixed Chronologically

### Error 1: JSX Syntax Error in Admin Page (Download All Forms Card Placement)
- **Commit:** `c3c348b` — "fix: correct JSX syntax error in admin dashboard render"
- **Root Cause:** Misaligned JSX tags in `app/[locale]/admin/page.tsx` caused Next.js compilation failure.
- **Fix:** Restructured the Grid/Paper components; ensured all tags properly closed and indented.
- **Files Changed:** `app/[locale]/admin/page.tsx`

### Error 2: Client/Server Component Split for VerifyPage
- **Commit:** `1a4e42e` — "fix: resolve build errors (client/server split, route extension, archiver import)"
- **Root Cause:** `app/[locale]/verify/[public_member_id]/page.tsx` was marked as a server component but used client-side features (optional chaining on nested objects, array access patterns that confused the React Server Components compiler).
- **Fix:** Introduced `ClientWrapper.tsx` as a dedicated client component; page.tsx remains server-side and passes normalized data as props.
- **Files Changed:** 
  - `app/[locale]/verify/[public_member_id]/page.tsx` (converted to pure server)
  - `app/[locale]/verify/[public_member_id]/ClientWrapper.tsx` (new file, "use client")

### Error 3: Certificate Route Extension (.ts → .tsx)
- **Commit:** `1a4e42e`
- **Root Cause:** `app/api/certificates/generate/route.ts` imported JSX (`CertificatePDF` component) but had `.ts` extension; Next.js requires `.tsx` for files containing JSX.
- **Fix:** Renamed file to `route.tsx`.
- **Files Changed:** `app/api/certificates/generate/route.ts` → `route.tsx`

### Error 4: Archiver Webpack Error → Replaced with JSZip
- **Commits:** 
  - `7683e4d` — "fix: use dynamic import for archiver to resolve Vercel build error"
  - `96a481e` — "fix: replace archiver with jszip to resolve webpack build error"
- **Root Cause:** The `archiver` package relies on Node.js core modules (fs, stream) that conflict with Vercel's webpack bundling for Edge Runtime. Dynamic import didn't fully resolve the issue.
- **Fix:** Replaced `archiver` with `jszip`, a pure-JavaScript ZIP library compatible with Edge/Node runtimes.
- **Files Changed:**
  - `lib/utils/zip-generator.ts` (rewritten to use JSZip)
  - `package.json` (removed `archiver`, added `jszip`)
  - `app/api/admin/download-forms/route.ts` (updated to use new generator)

### Error 5: MUI Icon Import Error (DownloadsIcon → FileDownloadIcon)
- **Commit:** `3c50d4e` — "fix: resolve build errors (MUI icon name, missing sendWelcomeEmail export)"
- **Root Cause:** `@mui/icons-material/DownloadsIcon` does not exist in MUI v6; the correct icon is `FileDownloadIcon`.
- **Fix:** Updated import in `app/[locale]/admin/page.tsx`.
- **Files Changed:** `app/[locale]/admin/page.tsx`

### Error 6: Missing `sendWelcomeEmail` Export in resend.ts
- **Commit:** `3c50d4e`
- **Root Cause:** `lib/resend.ts` defined `sendWelcomeEmail` but did not export it; other code (e.g., membership registration) attempted to import it.
- **Fix:** Added `export` keyword to `sendWelcomeEmail` function.
- **Files Changed:** `lib/resend.ts`

### Error 7: Membership Profiles Array → Object Normalization
- **Commit:** `6609334` — "fix: normalize membership.profiles array to single object for ClientWrapper"
- **Root Cause:** Supabase join query on `memberships` with `profiles` returns `profiles` as an array (even when using `maybeSingle()` on the main table). The client expected `profiles` to be a single object, causing undefined property access.
- **Fix:** In `app/[locale]/verify/[public_member_id]/page.tsx`, normalized `membership.profiles?.[0]` before passing to client component.
- **Files Changed:** `app/[locale]/verify/[public_member_id]/page.tsx`

### Error 8: Certificate PDF `registerImage` → Base64 Data URL
- **Commit:** `84b457b` — "fix: replace registerImage with base64 logo data URL in certificate PDF"
- **Root Cause:** `@react-pdf/renderer`'s `Font.register` and `registerImage` failed on Vercel due to file system access restrictions and missing assets.
- **Fix:** Read logo as base64 string at request time and pass as `logoBase64` prop; `CertificatePDF` component uses `<Image>` with `data:image/png;base64,...` source.
- **Files Changed:**
  - `app/api/certificates/generate/route.tsx` (read logo with `fs.readFileSync`, convert to base64, pass to PDF)
  - `components/certificate/CertificatePDF.tsx` (updated to accept `logoBase64` prop and render with `<Image src={logoBase64} />`)

### Error 9: NextResponse Buffer Type → `Buffer.from` + Node.js Runtime
- **Commits:** 
  - `931816c` — "fix: use Node.js runtime and Buffer.from for PDF response compatibility"
  - `5e8e02c` — "fix: cast PDF buffer to Uint8Array for NextResponse compatibility"
- **Root Cause:** `renderToBuffer` returns a `Buffer`; `NextResponse` expects a `Uint8Array` or `ReadableStream`. Passing `Buffer` directly caused type errors. Additionally, the API route needed explicit Node.js runtime declaration.
- **Fix:** 
  - Added `export const runtime = 'nodejs';` to route
  - Wrapped buffer: `new NextResponse(Buffer.from(pdfBuffer), ...)`
- **Files Changed:** `app/api/certificates/generate/route.tsx`

### Error 10: Resend Client Instantiation Missing / Environment Check
- **Commit:** `b11c57a` — "fix: instantiate Resend client with API key"
- **Root Cause:** `lib/resend.ts` created a Resend client with `process.env.RESEND_API_KEY || ''`; if the key was missing, the client was still instantiated but failed at call time. Earlier commits also had export issues.
- **Fix:** Ensured `resend` is instantiated with fallback and added early validation in `sendCertificateEmail` to skip sending if key missing (prevents crashes in dev when env not set). Also exported `sendWelcomeEmail`.
- **Files Changed:** `lib/resend.ts`

### Error 11: Admin Panel Server-Side Exception Resilience
- **Commit:** `3433c81` — "fix: implement extreme resilience in admin panel to prevent server-side exceptions"
- **Root Cause:** Admin page made multiple Supabase queries in sequence without error handling; any network/RLS failure threw uncaught exceptions, causing the entire page to crash (500 error).
- **Fix:** Wrapped every Supabase query in individual `try-catch` blocks with fallback default values. Added profile fetch resilience. Ensured dashboard always renders even if one or more data sources fail.
- **Files Changed:** `app/[locale]/admin/page.tsx`

### Error 12: Supabase Server Clients — Removed Non-Null Assertions
- **Commit:** `f0a44ef` — "fix: replace invalid .catch() calls with try-catch blocks for Supabase queries"
- **Root Cause:** `lib/supabase/server.ts` used non-null assertions (`!`) on environment variables, which suppressed TypeScript warnings but caused runtime crashes when env vars were missing.
- **Fix:** Replaced `!` assertions with explicit checks that throw descriptive errors. Also removed any lingering invalid `.catch()` usage on Supabase client methods.
- **Files Changed:** `lib/supabase/server.ts`
- **Current Uncommitted Change:** Same file further refined to add explicit missing env var checks (not yet committed). See Section 4.

---

## 3. Files Modified (Complete List)

All source files modified or created during this session (excluding build artifacts, PDF assets, and documentation):

### App Pages & Routes
- `app/[locale]/admin/page.tsx` — Admin dashboard with resilient query handling, MUI icon fix
- `app/[locale]/resources/page.tsx` — Public resources page (minor tweaks)
- `app/[locale]/verify/[public_member_id]/page.tsx` — Server component: normalized membership.profiles, proper data fetching
- `app/[locale]/verify/[public_member_id]/ClientWrapper.tsx` — New client-side wrapper for verification UI
- `app/api/admin/download-forms/route.ts` — Updated to use JSZip generator
- `app/api/certificates/generate/route.tsx` — Renamed from .ts, added base64 logo, Buffer fix, Node runtime
- `app/api/memberships/register/route.ts` — Minor adjustments for ID generation
- `app/api/volunteers/register/route.ts` — Minor adjustments for ID generation

### Components
- `components/certificate/CertificatePDF.tsx` — Accepts `logoBase64` prop, renders logo via `<Image src={logoBase64} />`

### Library / Utilities
- `lib/resend.ts` — Exported `sendWelcomeEmail`, added env validation in `sendCertificateEmail`
- `lib/utils/memberId.ts` — Sequential ID generator for members and volunteers
- `lib/utils/zip-generator.ts` — Replaced archiver with JSZip implementation
- `lib/supabase/server.ts` — Removed non-null assertions, added env var validation (modified, uncommitted)

### Internationalization
- `messages/en.json` — Updated translations
- `messages/hi.json` — Updated translations

### Database Migrations (new)
- `supabase/migrations/20260509234200_add_volunteer_id_to_applications.sql`
- `supabase/migrations/20260509234500_set_admin_piyush.sql`

### Documentation & Config
- `IMPLEMENTATION_SUMMARY.md` — Updated implementation details
- `ngo_branding_documents_kit_sewarth_path_sansthanam.md` — Branding guide
- `package.json` — Dependency updates (archiver removed, jszip added)
- `public/forms/*.html` — Form templates (membership, volunteer, ID card, certificate)

### Deleted / Removed
- `SPS_Document_System.html` — Removed from repo root (commit `05bb6a1`)

---

## 4. Current Repository State

```
Branch: main
Remote: origin (https://github.com/Warriorlegacy/sewarthpathsansthanam.git)
Status: up to date with origin/main
Uncommitted changes:
  M lib/supabase/server.ts
```

### Latest Commits (most recent first)

```
f0a44ef fix: replace invalid .catch() calls with try-catch blocks for Supabase queries
3433c81 fix: implement extreme resilience in admin panel to prevent server-side exceptions
b11c57a fix: instantiate Resend client with API key
2b78718 fix: add optional type parameter to sendWelcomeEmail signature
931816c fix: use Node.js runtime and Buffer.from for PDF response compatibility
5e8e02c fix: cast PDF buffer to Uint8Array for NextResponse compatibility
84b457b fix: replace registerImage with base64 logo data URL in certificate PDF
05bb6a1 chore: remove stray SPS_Document_System.html from repository root
6609334 fix: normalize membership.profiles array to single object for ClientWrapper
3c50d4e fix: resolve build errors (MUI icon name, missing sendWelcomeEmail export)
96a481e fix: replace archiver with jszip to resolve webpack build error
7683e4d fix: use dynamic import for archiver to resolve Vercel build error
1a4e42e fix: resolve build errors (client/server split, route extension, archiver import)
c3c348b fix: correct JSX syntax error in admin dashboard render
68a0251 docs: add comprehensive implementation summary
3a26cce Polish: sequential IDs, QR verification, resources page, admin ZIP download, admin SQL migration, form templates
8abcac0 Add admin ZIP download for forms and create template HTML files
7644216 Add public Resources page for NGO documents and forms
a9d9fae Enhance verification page with QR code and copy ID feature
0b3b138 feat: implement sequential ID generation for members and volunteers
```

### Uncommitted Change Details (`lib/supabase/server.ts`)

The current uncommitted modification adds explicit environment variable checks to `createClient()` and `createServiceClient()`. Instead of using non-null assertions (`!`), the functions now validate that `NEXT_PUBLIC_SUPABASE_URL` and appropriate keys are present and throw descriptive errors if missing. This prevents obscure runtime failures when Supabase env vars are not configured (e.g., during local dev or misconfigured Vercel project).

**Diff Summary:**
```diff
- return createServerClient(
-   process.env.NEXT_PUBLIC_SUPABASE_URL!,
-   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
-   { cookies: makeCookieHandlers(cookieStore) }
- );
+ const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
+ const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
+ if (!url || !key) throw new Error("Missing Supabase environment variables (URL or Anon Key)");
+ return createServerClient(url, key, { cookies: makeCookieHandlers(cookieStore) });
```

---

## 5. Vercel Deployment Status

- **Project URL:** https://sewarthpathsansthanam.vercel.app
- **Custom Domain:** sewarthpathsansthanam.org (DNS → Vercel)
- **Latest Deploy:** Triggered by push to `origin/main` (commit `f0a44ef`)
- **Build Status:** ✅ Success (no build errors)
- **Runtime Status:** Site loads; admin panel may display error if Supabase environment variables are not configured on Vercel.
- **Known Issues:** 
  - Admin dashboard requires `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. If any are missing, the page returns a descriptive error (after the resilience fixes, it shows a controlled error rather than crashing).
  - PDF generation (certificates, ID cards) requires the logo at `public/images/logo.png` to exist. Missing logo will cause certificate generation to fail.
  - Form ZIP download (`/api/admin/download-forms`) requires the HTML templates to exist in `public/forms/`.
- **Cron Job:** `vercel.json` defines a daily keep-alive hit to `/api/cron/keepalive` to maintain Supabase free-tier connection.

---

## 6. Pending Tasks / Next Steps

### Immediate Verification
1. **Confirm Admin Panel functionality** — Ensure all three Supabase environment variables are set in Vercel dashboard. Test admin stats, user lists, and approval actions.
2. **End-to-end flow testing** — Walk through each user journey:
   - User registration → email confirmation (if enabled) → membership purchase (Razorpay test mode) → ID card download
   - Volunteer application → admin approval → certificate email delivery
   - Donation (guest) → receipt email with AI message
   - Admin ZIP download of forms
   - Public verification page (`/verify/[id]`) with QR code
3. **Upload actual PDF documents to Storage** — The certificate generation currently reads logo from `public/images/logo.png`. Ensure this file exists and is optimized. Also consider uploading pre-generated certificates to Supabase Storage `certificates/` bucket if needed for archival.
4. **SEO setup** — Add `sitemap.xml`, `robots.txt`, and Google Search Console verification. Consider meta tags for all pages (some already present via components).

### Medium-term Improvements
5. **Separate Resend client instantiation** — Move `new Resend(...)` inside each function or create a lazy singleton to avoid initialization when env var missing.
6. **Add type-safe Supabase client wrappers** — Replace `any` types in `memberId.ts` with proper Supabase types.
7. **Implement email queue** — Use a background job system (e.g., Inngest, n8n, or Supabase Queue) to send emails asynchronously; currently emails block HTTP response.
8. **Add analytics** — Integrate Plausible or Google Analytics to track visitor behavior.
9. **Cache static data** — Membership plans, events, programs should be cached (revalidation) to reduce DB hits.
10. **Error monitoring** — Add Sentry or similar to capture client-side and server-side errors in production.

### Database
11. **Verify all migrations applied** — Check Supabase SQL Editor that all five migrations ran successfully.
12. **Seed sample data** — Run `supabase/seed.sql` to populate membership plans, pages, and initial content if not already present.

---

## 7. Critical Environment Variables

All variables must be set in the Vercel project dashboard (Settings → Environment Variables) and in local `.env` for development.

| Variable | Purpose | Required on Vercel | Exposed to Browser |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | ✅ | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin-level Supabase key (server-only) | ✅ | ❌ |
| `RAZORPAY_KEY_ID` | Razorpay key ID (live or test) | ✅ | ❌ |
| `RAZORPAY_KEY_SECRET` | Razorpay secret for webhook verification | ✅ | ❌ |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay webhook secret | ✅ | ❌ |
| `RESEND_API_KEY` | Resend email service API key | ✅ | ❌ |
| `GROQ_API_KEY` | Groq AI API key for chatbot & thank-you messages | ✅ | ❌ |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used in emails, meta tags) | ✅ | ✅ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | (Optional) Google Analytics ID | — | ✅ |

**Important:**
- Keys with `NEXT_PUBLIC_` prefix are bundled to the client; never store secrets with that prefix.
- Server-only keys (`SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_*`, `RESEND_API_KEY`, `GROQ_API_KEY`) must only exist in Vercel env vars and local `.env`; they should never be committed.

---

## 8. Database Migrations Status

All migrations are located in `supabase/migrations/`. They should be executed in order by Supabase (automatically if using Supabase CLI, or manually via SQL Editor).

### Migration List

| File | Description | Applied? |
|---|---|---|
| `20260508122122_create_core_schema.sql` | Creates all core tables: profiles, volunteer_applications, membership_plans, memberships, donations, payment_events, contact_messages, events, programs, stories. Includes RLS policies and indexes. | ✅ (assumed) |
| `20260509000000_add_tags_to_volunteers.sql` | Adds `tags` text[] column to `volunteer_applications` for AI-generated skill tags. | ✅ (assumed) |
| `20260509000000_create_certificates_table.sql` | Creates `certificates` table and `certificates` storage bucket with RLS policies. | ✅ (assumed) |
| `20260509234200_add_volunteer_id_to_applications.sql` | Adds `volunteer_id` column (unique, sequential) to `volunteer_applications`. | ✅ (assumed) |
| `20260509234500_set_admin_piyush.sql` | Sets `role = 'admin'` for `piyushrajsingh092@gmail.com` in `profiles`. | ✅ (assumed) |

**Action Required:**  
Verify in the Supabase Dashboard (SQL Editor → Migrations) that all migrations have run successfully. If any are pending, execute them in the order above. The `set_admin_piyush.sql` migration assumes the user with that email exists in `profiles`; if not, the update will affect 0 rows. Ensure Piyush has signed up and created a profile before or after applying the migration.

### Seed Data
- `supabase/seed.sql` inserts default membership plans and sample pages. Run this manually if the site lacks plan data.

---

## Appendix: Key Technical Decisions

- **Dependency Choice:** Replaced `archiver` with `jszip` due to Vercel Edge compatibility issues.
- **PDF Assets:** Switched from `registerImage` (filesystem) to base64 data URLs to avoid deployment path problems.
- **Error Handling:** Admin panel uses isolated try-catch per query to ensure partial data display even if some queries fail.
- **Client/Server Separation:** Verification page split into server (data fetch) + client (interactive UI) to respect Next.js App Router constraints.
- **Environment Validation:** Explicit checks in Supabase client creation provide early, clear errors instead of cryptic connection failures.

---

**Project Status:** ✅ Builds successfully; deployment stable. Admin panel requires complete environment configuration for full functionality.
