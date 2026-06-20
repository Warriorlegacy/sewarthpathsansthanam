# Sewarth Path Sansthanam NGO Website: PRD & TRD

**Overview:** Sewarth Path Sansthanam (मotto “सेवा परमो धर्म”) is a community-service NGO. The website should showcase its mission, allow volunteers/members to join, and process membership fees or donations. It must be bilingual (Hindi/English) with a clear language toggle【16†L1-L4】, and follow nonprofit web best practices: responsive, fast, and secure【3†L508-L513】. The design should use the NGO’s branding (logo, colors, photos) to welcome users and build trust【19†L163-L172】. Key pages include Home (mission, impact), About Us, Get Involved (Volunteer/Member Signup), Donation/Membership Payment, Events/News, and Contact.  

**Functional Requirements (PRD):** 

- **Multilingual Support:** The site must offer Hindi and English versions of all content with a persistent toggle (e.g. top-right) so users can switch languages easily【16†L1-L4】. Both versions should have identical structure and features【15†L88-L96】【16†L1-L4】.  
- **Responsive, User-Friendly Design:** Follow NGO best-practices: mobile-optimized layout, fast load times, clear calls to action, and straightforward navigation【3†L508-L513】. Use a consistent color scheme and logo on all pages【19†L163-L172】. Include trust signals (contact address, SSL, newsletters, transparency reports) to enhance credibility【3†L379-L388】【6†L113-L117】.  
- **Get Involved / Volunteer Page:** Clearly describe volunteer roles, commitments, and impacts. Incorporate real testimonials or images of volunteers【22†L120-L128】. The page should link to related actions (e.g. “Donate” and “Volunteer Signup”) so visitors can take the next step easily【22†L120-L128】. 【34†embed_image】 *Volunteers and community members should see clear calls-to-action on how to join or help the NGO, with inspirational images and concise descriptions of each opportunity【22†L120-L128】【19†L163-L172】.*  
- **Membership Signup Form:** Provide an intuitive, branded registration form for new members/volunteers. Include only essential fields (name, contact, interests) and a brief description of membership benefits【19†L163-L172】. Use friendly copy and visuals to make applicants feel welcome. Optionally offer membership tiers (e.g. basic free membership vs paid annual member with perks). Ensure the form is fully bilingual and validates inputs.  
- **Payment & Donation Integration:** Integrate a secure payment gateway for membership fees and donations. For example, use Razorpay or Stripe Checkout embedded on the site to accept cards, UPI, wallets, etc【6†L105-L113】【3†L508-L513】. Generate digital receipts (including 80G tax receipts in India) automatically after payment【6†L113-L117】. The “Donate/Membership Fee” page should explain suggested amounts (₹0 to ₹500 or higher tiers) and include clear buttons (“Pay ₹365 for Annual Membership,” etc.). Ensure one-click payment links or buttons are mobile-friendly and PCI-compliant【6†L105-L113】【3†L508-L513】. 【35†embed_image】 *The payment interface must be simple and secure: integrating Razorpay (for INR) provides multiple payment options (credit/debit, UPI, wallets) with PCI-DSS security and auto-80G receipts【6†L105-L113】. A prominent, trustworthy donation form with minimal fields will boost contributions【3†L508-L513】【6†L113-L117】.*  
- **User Authentication & Profiles:** Use Supabase Auth for user accounts (email/password login or OAuth if desired). After login, members should see a profile/dashboard showing their membership status, upcoming events, and donation history. New members might receive a confirmation email and welcome kit. Volunteers can sign up for events through their profile.  
- **Content & Media:** Include an About page with NGO registration details (e.g. 12A/80G certificates), team bios, and a photo gallery (using the provided event photos). A News or Blog section for updates is recommended. A contact form and social media links must be present. All static content should be editable (e.g. via a simple CMS or markdown files) in both languages.  

**Technical Requirements (TRD):**  

- **Tech Stack:** Build with a modern JavaScript framework (e.g. Next.js or React) and Tailwind or Chakra UI for responsive layout. Use [Supabase](https://supabase.com/) for backend (Auth, Postgres DB, and Storage). Host on [Vercel](https://vercel.com/) (Hobby tier) which provides free HTTPS and CI/CD deployment. The domain *sewarthpathsansthanam.org* will point to the Vercel app.  
- **Database Schema:** Using Supabase (Postgres), define tables and Row-Level Security (RLS):  
  - `profiles`: fields `(id, user_id, full_name, email, phone, address, language_pref, membership_status, membership_expiry, volunteer_interests, created_at)`.  
  - `payments`: fields `(id, user_id, amount, currency, date, method, receipt_url, membership_period, status)`.  
  - `events`: fields `(id, title, date, description, location, image_url)`.  
  - `registrations`: fields `(id, user_id, event_id, timestamp)`.  
  - (Optional) `content`: for storing bilingual page text, fields `(id, page, lang, title, body)`.  
  Supabase Auth will manage `users`. Use foreign keys (e.g. `user_id`) to link profiles/payments to Auth users. Implement policies so users can only see their own data. Supabase free tier (500 MB DB) can store millions of rows【10†L39-L47】, and supports up to 50,000 monthly users【10†L47-L49】, which is sufficient for a small NGO website.  
- **Payment Gateway Integration:** Integrate Razorpay or Stripe via client-side or serverless functions. For Stripe, use Supabase’s [Stripe extension] or webhook (serverless functions) to create payment sessions and record transactions in the `payments` table. For Razorpay, use its checkout script and call a Supabase Function to log the result. Always verify payment status server-side before granting membership. Ensure the process is secure (use HTTPS on Vercel; verify webhooks with secrets).  
- **Authentication & Security:** Supabase Auth will handle sign-up/login. Enable email verification. Use HTTPS everywhere (Vercel provides SSL). Sanitize and validate all form inputs. Protect admin operations (if any) by RLS or separate admin login. Backups: note free tier has no automatic backups, so occasionally export DB or upgrade as needed.  
- **Internationalization (i18n):** Use a library like `react-i18next` or Next.js i18n routing. Store UI text and page content in translation files or the `content` table. Place a language switcher in the header. Load text based on user selection. Ensure RTL/Unicode support for Hindi. SEO: set `<html lang>` and `hreflang` tags for each language version.  
- **Deployment:** Code is deployed on Vercel from a GitHub repo. Environment variables store Supabase keys and any payment API keys. Configure Vercel to use free Hobby plan (or Upgrade if needed later). Use Supabase free project (as of 2026, free includes 500MB DB, 1GB storage)【10†L39-L48】. Optimize images (e.g. host in Supabase Storage/CDN or use Vercel’s image optimization) to stay within bandwidth limits.  
- **Scalability & Maintenance:** Use server-side rendering or incremental static regeneration for public pages (Next.js) to improve SEO and performance. Only secure pages (profile, payment) use client-side rendering/fetch. Implement monitoring (e.g. Vercel Analytics or open-source tools) to watch traffic. Supabase limits: note 2GB monthly egress may be low if traffic spikes【10†L43-L48】, so optimize data usage (e.g. compress images, use pagination, caching).  

### Example Data Model (Supabase Tables)

- **profiles:** `id (uuid, PK)`, `user_id (FK)`, `full_name (text)`, `email (text)`, `phone (text)`, `address (text)`, `language_pref (text)`, `membership_status (text)`, `membership_expiry (date)`, `volunteer_interests (text[])`, `created_at (timestamp)`.  
- **payments:** `id (uuid)`, `user_id (uuid)`, `amount (numeric)`, `currency (text)`, `date (timestamptz)`, `method (text)`, `receipt_url (text)`, `membership_period (text)`, `status (text)`.  
- **events:** `id`, `title`, `date`, `description`, `location`, `image_url`.  
- **registrations:** `id`, `user_id`, `event_id`, `timestamp`.  
- **site_content:** `id`, `page_id`, `lang (text)`, `title`, `html_content`.  

Each `user_id` ties back to Supabase Auth’s `users.id`. Row-Level Security policies ensure users only see or modify their own profile and payments. 

## Example UI/User Flows

- **Home Page:** Shows NGO mission (सेवाथ परमो धर्म), recent news/events, and prominent “Join” and “Donate” buttons. Language switcher is visible in the header (Hindi/English).  
- **Join as Member/Volunteer:** User clicks “Join Us” → chooses Member or Volunteer role → fills form and (if member) selects membership fee tier → if membership requires payment, they are led to a secure checkout (via Razorpay/Stripe) → upon success, profile updated.  
- **Member Dashboard:** Logged-in users see upcoming events, donation receipts, membership renewal alerts, and options to update their profile or sign up for events.  
- **Donation Page:** Provides an option for one-time donations (with predefined amounts and custom input) using the same payment gateway, and immediately emails a donation receipt.  
- **Contact/Info:** Show NGO address, registration (12A/80G) details, and contact form.  

## AI No-Code Builder Prompt

**Prompt:** 

```
Design and build a professional NGO website for "Sewarth Path Sansthanam" (domain: sewarthpathsansthanam.org) that supports both English and Hindi. The site must be fully responsive and user-friendly. Include a clear language switcher (Hindi/English) in the header so the user can toggle languages【16†L1-L4】. The homepage should display the NGO’s name, motto (“सेवा परमो धर्म”), mission statement, and high-quality volunteer/community images to inspire visitors. 

Include the following pages and features: 
- **About Us:** NGO background, registration details (12A/80G certificates), team info. 
- **Get Involved:** Information on volunteering and membership opportunities. Describe volunteer roles and impact, and include testimonials or photos【22†L120-L128】. Provide links/buttons to “Volunteer Signup” and “Become a Member.” 
- **Signup/Join Us:** A bilingual registration form where visitors can sign up as volunteers or members. Use the NGO’s branding (logo, colors) and add a hero image or graphic to make the form inviting【19†L163-L172】. For membership, include an option to pay a nominal annual fee (e.g. ₹365) via integrated payment. 
- **Donations/Membership Payment:** Implement a secure payment integration (e.g. Razorpay or Stripe) so users can donate or pay membership fees online【6†L105-L113】. Accept all major payment methods (cards, UPI, wallets). After payment, automatically generate a receipt (including 80G tax receipt for donors). Use prominent, well-labeled buttons (e.g. “Donate ₹500,” “Pay ₹365 Membership”). Ensure the form is simple, mobile-optimized, and clearly shows transaction success【3†L508-L513】【6†L113-L117】.
- **User Dashboard:** After login (via email auth), members should see a dashboard with their profile, membership status (expiry date), donation history, and upcoming event sign-ups. 
- **Events/News:** List upcoming events and latest news posts. Allow users to register for events (free or paid) from the dashboard. 
- **Contact:** A contact form, NGO address, phone, email, and social media links in footer. 
- **Multilingual Content:** All text (labels, paragraphs, etc.) must be available in Hindi and English. Use an appropriate i18n solution (like react-i18next or Next.js i18n). 

**Technical Instructions:** 
- Use [Supabase](https://supabase.com/) (free tier) for the backend: Auth for user accounts, a Postgres database for user profiles, membership records, events, and translations. Store any uploaded images (photos, documents) in Supabase Storage. 
- Use a modern frontend framework (preferably Next.js) deployed on [Vercel](https://vercel.com/) (Hobby tier). Configure the domain to the Vercel deployment. 
- Implement user authentication with Supabase Auth (email/password). After login, fetch and display user data from the Supabase database. Protect private routes (dashboard) accordingly. 
- For payments, integrate Razorpay or Stripe Checkout in the client. On success, record the payment in Supabase (via an API route or serverless function) and update the user’s membership status. Use secure, HTTPS endpoints and verify payment webhooks. 
- Follow NGO website best practices: ensure mobile responsiveness, fast loading (optimize images), clear navigation, and visible calls-to-action【3†L508-L513】【22†L120-L128】. Use the NGO’s color scheme and logo consistently. 
- Do not use any non-free services; the solution must run on Supabase and Vercel free plans. Ensure the database schema efficiently handles users, members, payments, and content (500 MB free DB is sufficient【10†L39-L47】). 
- Finally, generate automated bilingual content placeholders and structure so the site is production-ready. No manual coding errors – the code should be deployable directly to the free Vercel/Supabase setup and function end-to-end. 
```

