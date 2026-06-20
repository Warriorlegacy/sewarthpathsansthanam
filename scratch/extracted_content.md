# --- Extracting Sewarth Path Sansthanam NGO Website_ PRD & TRD.pdf ---

## Page 1

Sewarth Path Sansthanam NGO Website: PRD &
TRD
Overview: Sewarth Path Sansthanam (मotto “सवे ा परमो धमर्म”) is a community-service NGO. The website should
showcase its mission, allow volunteers/members to join, and process membership fees or donations. It
must be bilingual (Hindi/English) with a clear language toggle 1 , and follow nonprofit web best practices:
responsive, fast, and secure 2 . The design should use the NGO’s branding (logo, colors, photos) to
welcome users and build trust 3 . Key pages include Home (mission, impact), About Us, Get Involved
(Volunteer/Member Signup), Donation/Membership Payment, Events/News, and Contact.
Functional Requirements (PRD):
• Multilingual Support: The site must offer Hindi and English versions of all content with a persistent
toggle (e.g. top-right) so users can switch languages easily 1 . Both versions should have identical
structure and features 4 1 .
• Responsive, User-Friendly Design: Follow NGO best-practices: mobile-optimized layout, fast load
times, clear calls to action, and straightforward navigation 2 . Use a consistent color scheme and
logo on all pages 3 . Include trust signals (contact address, SSL, newsletters, transparency reports)
to enhance credibility 5 6 .
• Get Involved / Volunteer Page: Clearly describe volunteer roles, commitments, and impacts.
Incorporate real testimonials or images of volunteers 7 . The page should link to related actions
(e.g. “Donate” and “Volunteer Signup”) so visitors can take the next step easily 7 .
Volunteers and community members should see clear calls-to-action on how to join or help the NGO, with
inspirational images and concise descriptions of each opportunity 7 3 .
1

--- Page Break ---

## Page 2

• Membership Signup Form: Provide an intuitive, branded registration form for new members/
volunteers. Include only essential fields (name, contact, interests) and a brief description of
membership benefits 3 . Use friendly copy and visuals to make applicants feel welcome. Optionally
offer membership tiers (e.g. basic free membership vs paid annual member with perks). Ensure the
form is fully bilingual and validates inputs.
• Payment & Donation Integration: Integrate a secure payment gateway for membership fees and
donations. For example, use Razorpay or Stripe Checkout embedded on the site to accept cards, UPI,
wallets, etc 8 2 . Generate digital receipts (including 80G tax receipts in India) automatically after
payment 6 . The “Donate/Membership Fee” page should explain suggested amounts (₹0 to ₹500 or
higher tiers) and include clear buttons (“Pay ₹365 for Annual Membership,” etc.). Ensure one-click
payment links or buttons are mobile-friendly and PCI-compliant 8 2 .
The payment interface must be simple and secure: integrating Razorpay (for INR) provides multiple
payment options (credit/debit, UPI, wallets) with PCI-DSS security and auto-80G receipts 8 . A prominent,
trustworthy donation form with minimal fields will boost contributions 2 6 .
• User Authentication & Profiles: Use Supabase Auth for user accounts (email/password login or
OAuth if desired). After login, members should see a profile/dashboard showing their membership
status, upcoming events, and donation history. New members might receive a confirmation email
and welcome kit. Volunteers can sign up for events through their profile.
• Content & Media: Include an About page with NGO registration details (e.g. 12A/80G certificates),
team bios, and a photo gallery (using the provided event photos). A News or Blog section for updates
is recommended. A contact form and social media links must be present. All static content should be
editable (e.g. via a simple CMS or markdown files) in both languages.
Technical Requirements (TRD):
• Tech Stack: Build with a modern JavaScript framework (e.g. Next.js or React) and Tailwind or Chakra
UI for responsive layout. Use Supabase for backend (Auth, Postgres DB, and Storage). Host on Vercel
(Hobby tier) which provides free HTTPS and CI/CD deployment. The domain
sewarthpathsansthanam.org will point to the Vercel app.
• Database Schema: Using Supabase (Postgres), define tables and Row-Level Security (RLS):
2

--- Page Break ---

## Page 3

• profiles : fields (id, user_id, full_name, email, phone, address, language_pref,
membership_status, membership_expiry, volunteer_interests, created_at) .
• payments : fields (id, user_id, amount, currency, date, method, receipt_url,
membership_period, status) .
• events : fields (id, title, date, description, location, image_url) .
• registrations : fields (id, user_id, event_id, timestamp) .
• (Optional) content : for storing bilingual page text, fields (id, page, lang, title, body) .
Supabase Auth will manage users . Use foreign keys (e.g. user_id ) to link profiles/payments to
Auth users. Implement policies so users can only see their own data. Supabase free tier (500 MB DB)
can store millions of rows 9 , and supports up to 50,000 monthly users 10 , which is sufficient for a
small NGO website.
• Payment Gateway Integration: Integrate Razorpay or Stripe via client-side or serverless functions.
For Stripe, use Supabase’s [Stripe extension] or webhook (serverless functions) to create payment
sessions and record transactions in the payments table. For Razorpay, use its checkout script and
call a Supabase Function to log the result. Always verify payment status server-side before granting
membership. Ensure the process is secure (use HTTPS on Vercel; verify webhooks with secrets).
• Authentication & Security: Supabase Auth will handle sign-up/login. Enable email verification. Use
HTTPS everywhere (Vercel provides SSL). Sanitize and validate all form inputs. Protect admin
operations (if any) by RLS or separate admin login. Backups: note free tier has no automatic backups,
so occasionally export DB or upgrade as needed.
• Internationalization (i18n): Use a library like react-i18next or Next.js i18n routing. Store UI
text and page content in translation files or the content table. Place a language switcher in the
header. Load text based on user selection. Ensure RTL/Unicode support for Hindi. SEO: set <html
lang> and hreflang tags for each language version.
• Deployment: Code is deployed on Vercel from a GitHub repo. Environment variables store Supabase
keys and any payment API keys. Configure Vercel to use free Hobby plan (or Upgrade if needed
later). Use Supabase free project (as of 2026, free includes 500MB DB, 1GB storage) 11 . Optimize
images (e.g. host in Supabase Storage/CDN or use Vercel’s image optimization) to stay within
bandwidth limits.
• Scalability & Maintenance: Use server-side rendering or incremental static regeneration for public
pages (Next.js) to improve SEO and performance. Only secure pages (profile, payment) use client-
side rendering/fetch. Implement monitoring (e.g. Vercel Analytics or open-source tools) to watch
traffic. Supabase limits: note 2GB monthly egress may be low if traffic spikes 12 , so optimize data
usage (e.g. compress images, use pagination, caching).
Example Data Model (Supabase Tables)
• profiles: id (uuid, PK) , user_id (FK) , full_name (text) , email (text) , phone
(text) , address (text) , language_pref (text) , membership_status (text) ,
membership_expiry (date) , volunteer_interests (text[]) , created_at
(timestamp) .
• payments: id (uuid) , user_id (uuid) , amount (numeric) , currency (text) , date
(timestamptz) , method (text) , receipt_url (text) , membership_period (text) ,
status (text) .
3

--- Page Break ---

## Page 4

• events: id , title , date , description , location , image_url .
• registrations: id , user_id , event_id , timestamp .
• site_content: id , page_id , lang (text) , title , html_content .
Each user_id ties back to Supabase Auth’s users.id . Row-Level Security policies ensure users only see
or modify their own profile and payments.
Example UI/User Flows
• Home Page: Shows NGO mission (सवे ाथ परमो धमर्म), recent news/events, and prominent “Join” and
“Donate” buttons. Language switcher is visible in the header (Hindi/English).
• Join as Member/Volunteer: User clicks “Join Us” → chooses Member or Volunteer role → fills form
and (if member) selects membership fee tier → if membership requires payment, they are led to a
secure checkout (via Razorpay/Stripe) → upon success, profile updated.
• Member Dashboard: Logged-in users see upcoming events, donation receipts, membership
renewal alerts, and options to update their profile or sign up for events.
• Donation Page: Provides an option for one-time donations (with predefined amounts and custom
input) using the same payment gateway, and immediately emails a donation receipt.
• Contact/Info: Show NGO address, registration (12A/80G) details, and contact form.
AI No-Code Builder Prompt
Prompt:
Design and build a professional NGO website for "Sewarth Path
Sansthanam" (domain: sewarthpathsansthanam.org) that supports both English and
Hindi. The site must be fully responsive and user-friendly. Include a clear
language switcher (Hindi/English) in the header so the user can toggle languages
1 . The homepage should display the NGO’s name, motto (“सवे ा परमो धम”र्म ), mission
statement, and high-quality volunteer/community images to inspire visitors.
Include the following pages and features:
- **About Us:** NGO background, registration details (12A/80G certificates),
team info.
- **Get Involved:** Information on volunteering and membership opportunities.
Describe volunteer roles and impact, and include testimonials or photos 7 .
Provide links/buttons to “Volunteer Signup” and “Become a Member.”
- **Signup/Join Us:** A bilingual registration form where visitors can sign up
as volunteers or members. Use the NGO’s branding (logo, colors) and add a hero
image or graphic to make the form inviting
3 . For membership, include an option to pay a nominal annual fee (e.g. ₹365)
via integrated payment.
- **Donations/Membership Payment:** Implement a secure payment integration (e.g.
Razorpay or Stripe) so users can donate or pay membership fees online
8 . Accept all major payment methods (cards, UPI, wallets). After payment,
automatically generate a receipt (including 80G tax receipt for donors). Use
4

--- Page Break ---

## Page 5

prominent, well-labeled buttons (e.g. “Donate ₹500,” “Pay ₹365 Membership”).
Ensure the form is simple, mobile-optimized, and clearly shows transaction
success 2 6 .
- **User Dashboard:** After login (via email auth), members should see a
dashboard with their profile, membership status (expiry date), donation history,
and upcoming event sign-ups.
- **Events/News:** List upcoming events and latest news posts. Allow users to
register for events (free or paid) from the dashboard.
- **Contact:** A contact form, NGO address, phone, email, and social media links
in footer.
- **Multilingual Content:** All text (labels, paragraphs, etc.) must be
available in Hindi and English. Use an appropriate i18n solution (like react-
i18next or Next.js i18n).
**Technical Instructions:**
- Use [Supabase](https://supabase.com/) (free tier) for the backend: Auth for
user accounts, a Postgres database for user profiles, membership records,
events, and translations. Store any uploaded images (photos, documents) in
Supabase Storage.
- Use a modern frontend framework (preferably Next.js) deployed on [Vercel]
(https://vercel.com/) (Hobby tier). Configure the domain to the Vercel
deployment.
- Implement user authentication with Supabase Auth (email/password). After
login, fetch and display user data from the Supabase database. Protect private
routes (dashboard) accordingly.
- For payments, integrate Razorpay or Stripe Checkout in the client. On success,
record the payment in Supabase (via an API route or serverless function) and
update the user’s membership status. Use secure, HTTPS endpoints and verify
payment webhooks.
- Follow NGO website best practices: ensure mobile responsiveness, fast loading
(optimize images), clear navigation, and visible calls-to-action 2 7 . Use the
NGO’s color scheme and logo consistently.
- Do not use any non-free services; the solution must run on Supabase and Vercel
free plans. Ensure the database schema efficiently handles users, members,
payments, and content (500 MB free DB is sufficient 9 ).
- Finally, generate automated bilingual content placeholders and structure so
the site is production-ready. No manual coding errors – the code should be
deployable directly to the free Vercel/Supabase setup and function end-to-end.
1 4 Top 10 best practices for multilingual websites | Digital.gov
https://digital.gov/resources/top-10-best-practices-for-multilingual-websites
2 5 8 Essential Digital Needs for NGOs | Vardot
https://www.vardot.com/en/ideas/blog/8-essential-digital-needs-ngos
3 10 Best Practices for Online Membership Application Forms - Neon One
https://neonone.com/resources/blog/online-membership-application-form/
5

--- Page Break ---

## Page 6

6 8 Payment Gateway For NGOs: How NGOs Can Accept Donations?
https://razorpay.com/learn/payment-gateway-for-ngos/
7 Get Involved Pages: Top 5 Nonprofit Examples for Inspiration - Wired Impact
https://wiredimpact.com/blog/5-inspiring-nonprofit-get-involved-pages/
9 10 11 12 Supabase Pricing in 2026: What the Free Tier Actually Gets You
https://cotera.co/articles/supabase-pricing-guide
6

--- Page Break ---

# --- Extracting NGO वेबसाइट निर्माण हेतु विस्तृत योजना.pdf ---

## Page 1

Strategic Architecture and Digital
Transformation Blueprint for Sewarth
Path Sansthanam
The imperative for non-governmental organizations to establish a robust, scalable digital
presence has evolved from a supplementary operational advantage to a fundamental
prerequisite for survival and impact. This extensive analysis presents a comprehensive
strategic, product, and technical architecture for the digital transformation of "सेवाथ  पथ सस्ं थानम"्
(Sewarth Path Sansthanam), an organization governed by the foundational philosophy of "सेवा
परमो धम"  (Service is the Highest Duty). By synthesizing the legal mandates extracted from the
organization's foundational trust deeds with contemporary digital product methodologies, this
report outlines a zero-capital-expenditure deployment strategy utilizing Vercel, Supabase, and
Next.js 15. Furthermore, it constructs an exhaustive framework for implementing bilingual
interfaces, automating tax-compliant financial transactions, and deploying a psychologically
optimized tiered membership and volunteer onboarding system.
1. Legal Foundation and Operational Mandate: An
Analysis of the Trust Deed
The architectural blueprint of any digital platform must be intrinsically aligned with the legal and
operational boundaries established by its founding documents. A meticulous examination of the
provided registration and trust deed documents reveals the structural and philosophical
framework governing Sewarth Path Sansthanam.
The organization is formally registered under the Indian Trusts Act, 1882, establishing it as a
public charitable trust. The trust deed explicitly positions the organization as a non-profit,
non-political, and voluntary entity dedicated to public welfare across the entirety of India ("सम्पणू  
भारत"). The physical and administrative locus of the organization is situated at Plot No. 516,
Kamlesh Nagar, Bhagwanpur, Lanka, Varanasi, placing it within a region of profound cultural
and historical significance. The trust is spearheaded by its founder and chief trustee, Shri
Mahesh Kumar Pandey, who initiated the organization with a foundational corpus fund of
₹1,00,000 (One Lakh Rupees). The governing body further includes key trustees such as
Madhu Pandey, Komal Devi, Amarnath Pandey, and Priti Kumari, establishing a localized and
highly committed leadership structure.
The trust deed delineates an exhaustive list of socio-economic objectives that must directly
inform the content architecture and user experience of the prospective web platform. These
objectives encompass a vast spectrum of philanthropic interventions. In the domain of
education, the trust is mandated to establish Gurukuls, Vedic schools, and libraries, alongside
promoting modern technical and vocational education. Environmental and agricultural initiatives
form another core pillar, with specific provisions for promoting organic farming, environmental
conservation, and the establishment of Gaushalas (cow shelters). The healthcare and social
welfare mandates require the organization to operate dispensaries, promote Ayurveda and
Yoga, support the visually impaired and disabled, eradicate social evils such as the dowry
system, and facilitate the marriages of underprivileged women. Furthermore, the trust operates

--- Page Break ---

## Page 2

with a fundamentally secular and inclusive ethos, explicitly stating its commitment to the welfare
of all religious communities, including Hindus, Muslims, Sikhs, Jains, Buddhists, and Christians.
To digitally represent this expansive operational scope, the web platform must possess a highly
organized, modular content architecture. The user interface must seamlessly categorize these
diverse initiatives—ranging from Vedic education to healthcare—into distinct, easily navigable
portfolios that communicate the NGO's multifaceted impact to prospective volunteers and global
donors.
2. The Economics and Psychology of Volunteer
Onboarding and Membership Tiers
The mobilization of human capital is the critical engine of a grassroots NGO. However, the
unstructured induction of volunteers frequently leads to high attrition rates, administrative bloat,
and resource depletion. To mitigate these risks, implementing a structured, financially calibrated
tiered membership system is essential. This strategy aligns the psychological commitment of the
volunteer with the administrative sustainability of the organization.
2.1 The Strategic Utility of the Nominal Volunteer Fee
In the Indian non-profit sector, the implementation of a nominal administrative fee for basic
volunteer onboarding—typically ranging from ₹0 to ₹500, with a widely adopted standard of
₹365 per year—serves as a highly effective filtration and commitment mechanism.
Economically, the ₹365 figure represents exactly ₹1 per day, a sum that is universally accessible
across diverse socio-economic demographics in India, yet significant enough to induce a
psychological shift in the registrant.
The psychological principle of sunk cost commitment dictates that individuals who invest
financial resources, however minimal, into an endeavor are statistically more likely to follow
through with their commitments. Volunteer programs that operate entirely without financial or
structural barriers frequently suffer from the "phantom volunteer" phenomenon; individuals
register on a whim but fail to participate in on-ground activities, thereby wasting the
organization's time and administrative resources.
Furthermore, the ₹365 fee is not merely a psychological tool; it is an economic necessity for cost
recovery. The onboarding of a volunteer incurs tangible administrative expenses. These
overheads include the generation and physical dispatch of identity cards, the execution of basic
background verifications, the provision of onboarding training materials, and the digital
maintenance of volunteer management software and communication infrastructure. By
collecting this nominal fee, Sewarth Path Sansthanam ensures that its core charitable corpus
remains untouched by internal administrative expenses, thereby maximizing the capital
deployed directly toward its philanthropic objectives.
2.2 Structuring Premium and Lifetime Memberships
While the volunteer tier mobilizes localized human capital, the financial sustainability of the
NGO relies heavily on higher-tier memberships designed for philanthropic donors and corporate
partners. These premium tiers generally range from ₹1,000 to ₹5,000 per year, escalating to
₹10,000, ₹25,000, or more for lifelong patron memberships.
The implementation of these tiers requires careful categorization and distinct value propositions.

--- Page Break ---

## Page 3

The following table illustrates a strategically optimized membership architecture suitable for
Sewarth Path Sansthanam:
Membership Tier Financial Commitment Target Demographic Strategic Purpose and
Associated Benefits
Active Volunteer ₹365 / Year Grassroots workers, Filters out uncommitted
students, local applicants. Covers the
community members in cost of ID cards, basic
Varanasi. training, and
administrative software.
Grants participation
rights in local initiatives.
Associate Member ₹1,100 - ₹2,500 / Year Working professionals, Generates recurring
mid-level donors, annual revenue.
diaspora. Members receive
quarterly impact
reports, invitations to
major events, and
digital certificates of
appreciation.
Lifetime Patron ₹5,000 - ₹25,000+ High Net Worth Builds the long-term
(One-time) Individuals (HNIs), corpus fund. Patrons
philanthropists, receive lifelong
corporate executives. recognition on the
NGO's digital honor
roll, VIP access to
organizational events,
and detailed annual
financial audits.
Corporate/InstitutionaCustom (₹50,000+) Corporate Social Facilitates large-scale
l Responsibility (CSR) project funding.
divisions, partner Benefits include
organizations. co-branding
opportunities on
specific projects (e.g.,
funding a specific
Gurukul) and
comprehensive CSR
compliance reporting.
2.3 Tax Compliance and 80G Receipt Automation
A critical component of this financial architecture is strict adherence to Indian tax regulations.
For Sewarth Path Sansthanam to attract significant domestic funding, it must leverage Section
80G of the Income Tax Act, 1961. This section permits donors to claim a tax deduction of 50%
on their charitable contributions to qualifying NGOs.
Historically, the administrative burden of manually generating and dispatching 80G compliance
receipts has overwhelmed smaller NGOs, often resulting in delays of weeks or months, which
severely degrades donor trust. Therefore, the digital architecture must completely automate this

--- Page Break ---

## Page 4

workflow. When a donor or patron member processes a payment through the platform, the
system must autonomously capture their Permanent Account Number (PAN), validate the
transaction, and instantly generate a PDF receipt containing the NGO's 80G registration
number, the transaction ID, and the authorized signatory's digital stamp. This zero-touch
financial pipeline is non-negotiable for a modern, scalable non-profit organization.
3. Comprehensive Product Requirements Document
(PRD)
The Product Requirements Document (PRD) delineates the functional scope, user journeys,
and feature specifications necessary to translate the strategic objectives of Sewarth Path
Sansthanam into a deployable digital product. The platform, hosted at
sewarthpathsansthanam.org, must operate as a highly secure, bilingual application capable of
handling high-traffic fundraising campaigns while remaining entirely autonomous in its
administrative functions.
3.1 Core Product Objectives
The primary objective of the application is to establish a globally accessible, highly credible
digital identity that seamlessly converts passive visitors into active volunteers and recurring
donors. The platform must operate seamlessly across mobile and desktop environments,
reflecting the reality that a vast majority of grassroots volunteers in India will access the site via
low-bandwidth mobile networks, while institutional donors may utilize desktop interfaces.
A secondary, yet equally critical objective is the complete elimination of manual administrative
overhead. The system must autonomously handle the full lifecycle of volunteer
onboarding—from initial data capture and fee collection to identity verification—as well as the
end-to-end processing of donations and tax compliance documentation.
3.2 Target User Personas and Interaction Journeys
The platform architecture must accommodate three distinct user personas, each with highly
specific interaction paradigms and technological proficiencies.
The first persona is the Grassroots Volunteer. This user is typically a local resident, student, or
community worker, predominantly utilizing a mobile device. Their primary language preference
is Hindi. The user journey for this persona must be characterized by extreme simplicity and low
friction. Upon landing on the platform, they must be able to easily locate the volunteer
registration portal, input their basic demographic details, upload necessary identification
documents (such as an Aadhaar card), and process the ₹365 annual fee via a highly familiar
interface, such as UPI (Unified Payments Interface). Upon successful payment, the system
should instantly provision a digital volunteer dashboard and a downloadable digital ID card.
The second persona is the Philanthropic Donor. This individual may be a high-net-worth
individual, a corporate CSR representative, or a member of the Indian diaspora. They are likely
to utilize the English interface and will scrutinize the platform for indicators of transparency, legal
compliance, and organizational impact. Their user journey involves navigating through the
NGO's project portfolios (e.g., Vedic education, healthcare initiatives), selecting a specific cause
or general corpus fund, and executing a secure, high-value transaction. For this persona, the
immediate, automated delivery of an 80G-compliant tax receipt via email is the most critical

--- Page Break ---

## Page 5

touchpoint for establishing long-term trust and encouraging recurring contributions.
The third persona is the NGO Administrator. This user requires secure, role-based access to a
comprehensive backend dashboard. The administrator's journey involves monitoring real-time
financial inflows, reviewing and approving volunteer applications, analyzing traffic and
engagement metrics, and exporting structured financial data for statutory auditing and
compliance purposes. The dashboard must abstract away complex database management,
presenting actionable insights through intuitive data visualizations.
3.3 Functional Feature Specifications
The development of the platform requires the implementation of several core functional
modules, detailed in the table below, prioritizing the user experience, financial security, and
linguistic accessibility.
Module Feature Specification Implementation Rationale
Internationalization (i18n) Persistent, stateful toggle Fulfills the dual mandate of
between Hindi and English serving the vernacular
across all UI components, legal grassroots demographic in
documents, and automated Varanasi while maintaining an
emails. accessible interface for global
donors and corporate partners.
Volunteer Onboarding Engine Multi-step form capturing KYC Automates the filtration of
data, skill profiling, and uncommitted applicants and
integration with a payment ensures immediate cost
gateway for the ₹365 fee recovery for administrative
collection. overhead.
Donation Processing System Dynamic payment component Streamlines the contribution
supporting predefined tiers pipeline, significantly reducing
(e.g., ₹1000, ₹5000), custom cart abandonment rates during
amounts, and mandatory PAN the donation flow.
card collection.
80G Automated Compliance Webhook-triggered generation Eliminates manual accounting
of cryptographically secure delays, ensuring instant legal
PDF receipts bearing the compliance and fostering
NGO's registration details and immense trust among the donor
authorized signatures. base.
Authentication & RBAC Passwordless login via Email Enhances security by
OTP or OAuth (Google), eliminating password fatigue
backed by strict Row Level while ensuring that sensitive
Security (RLS) policies. donor and volunteer data
remains strictly
compartmentalized.
Administrative Control Panel Unified dashboard displaying Centralizes organizational
aggregate metrics, transaction oversight, allowing leadership
logs, and tabular data of all to make data-driven decisions
registered volunteers and without requiring dedicated IT
members. or accounting staff.

--- Page Break ---

## Page 6

4. Technical Requirements Document (TRD) and
Infrastructure Strategy
Deploying a highly scalable, production-grade application for Sewarth Path Sansthanam while
maintaining a zero-capital-expenditure infrastructure requires meticulous architectural
orchestration. The chosen technology stack leverages Next.js 15 (utilizing the App Router) for
the frontend framework, Supabase for the PostgreSQL database and authentication layer,
Vercel for global edge network hosting, and Razorpay as the financial processing engine.
Operating strictly within the boundaries of the Vercel Hobby Tier and the Supabase Free Tier
demands a thorough understanding of their respective limitations and the implementation of
specific engineering mitigations.
4.1 Frontend Architecture: Next.js 15 and Server-Side
Internationalization
The application will be engineered using Next.js 15, capitalizing on the performance benefits of
React Server Components (RSC) and the App Router architecture. For the critical requirement
of bilingual support (Hindi and English), the next-intl library presents the most optimal solution in
the modern React ecosystem, superseding legacy libraries such as react-i18next.
The i18n Implementation Paradigm: The integration of next-intl within the Next.js 15 App
Router fundamentally shifts how localization is handled. Instead of loading massive translation
dictionaries on the client side—which degrades performance, particularly on slower mobile
networks in rural India—next-intl processes translations natively on the server.
The routing mechanism relies on a middleware.ts file that intercepts all incoming traffic. This
middleware analyzes the user's Accept-Language HTTP header or stored browser cookies to
determine their preference, subsequently rewriting the URL to the appropriate localized
sub-path (e.g., /hi/volunteer or /en/volunteer). Given the localized operational base of the NGO
in Varanasi, the default locale will be strictly configured to Hindi (hi).
The textual content of the platform will be decoupled entirely from the React components and
maintained within isolated JSON dictionary files (messages/hi.json and messages/en.json). This
separation of concerns ensures that non-technical NGO administrators can easily update
mission statements, event details, or policy text without requiring direct modifications to the
application's source code. Furthermore, the system will dynamically inject hreflang metadata
tags into the document head, instructing search engine crawlers on the relationship between the
Hindi and English pages, thereby optimizing the domain for international SEO without incurring
duplicate content penalties.
4.2 Backend Architecture: Optimizing the Supabase Free Tier
Supabase provides a powerful, open-source alternative to Firebase, offering a fully managed
PostgreSQL database, an authentication service, and object storage. However, deploying a
production application on the Supabase Free Tier requires precise architectural discipline to
avoid exceeding hard limits and triggering service interruptions.
Supabase Free Tier Constraints (2026 Limits): To engineer a resilient system, the following
limitations must be rigorously accounted for:
● Database Capacity: The PostgreSQL database is capped at a strict 500 MB limit,

--- Page Break ---

## Page 7

operating on a shared CPU environment.
● Authentication Volume: The system permits a maximum of 50,000 Monthly Active Users
(MAUs).
● Storage Quotas: Object storage is restricted to 1 GB, with individual file uploads capped
at a maximum of 50 MB.
● Bandwidth Restrictions: Database egress and cached egress are both limited to 5 GB
per month.
● Inactivity Pausing: Crucially, any Free Tier project that experiences zero API activity for
a continuous period of 7 days is automatically paused by Supabase, rendering the
application offline.
Strategic Engineering Mitigations: To ensure continuous, unimpeded operation, the
architecture must implement several critical optimizations. First, to protect the 500 MB database
limit, large binary data—such as volunteer profile pictures or uploaded identification documents
(Aadhaar cards)—must never be stored directly within the PostgreSQL tables as base64
strings. Instead, all media must be uploaded to the Supabase Storage bucket, with only the
lightweight, relational URL reference strings saved in the database tables.
Second, to circumvent the devastating 7-day inactivity pause mechanism , an automated
"keep-alive" protocol must be instituted. A cron job, easily configurable via Vercel Cron or
GitHub Actions, will be programmed to execute a nominal SELECT query against the database
every 48 to 72 hours, guaranteeing continuous project uptime regardless of organic traffic
fluctuations.
Finally, data security will be enforced at the deepest architectural level using PostgreSQL's Row
Level Security (RLS) policies. These policies will be coded to ensure that an authenticated
volunteer can only perform read or write operations on their specific row within the profiles table.
Conversely, users authenticated with an 'admin' role will be granted elevated permissions to
query and aggregate data across the entire database schema.
4.3 Hosting and Network Delivery: Vercel Hobby Tier Constraints
Vercel provides an unparalleled deployment environment for Next.js applications, offering a
global edge network that ensures low-latency delivery. The project will be deployed on the
Vercel Hobby Tier, which allows for the integration of custom domains at no financial cost.
Vercel Hobby Tier Limitations (2026):
● Bandwidth Allowance: 100 GB of data transfer per month.
● Edge Processing: A maximum of 1,000,000 edge requests per month.
● Compute Duration: Serverless functions are restricted to a default execution time of 10
seconds, configurable up to a maximum of 60 seconds.
● Domain Management: The tier supports up to 50 custom domains per project.
Deployment and Domain Configuration Strategy: The domain sewarthpathsansthanam.org
will be connected to the Vercel project by updating the DNS configuration at the domain
registrar. For the apex domain configuration, an A Record will be established pointing to Vercel's
primary IP address (76.76.21.21). Simultaneously, a CNAME record will be configured for the
www subdomain, directing traffic to cname.vercel-dns.com. Upon successful DNS propagation,
Vercel's infrastructure will autonomously provision, attach, and continuously renew SSL
certificates, guaranteeing that all donor and volunteer data is transmitted over secure, encrypted
HTTPS connections.
To protect the 1,000,000 edge request limit and the 100 GB bandwidth cap, aggressive caching
strategies must be implemented. Next.js Incremental Static Regeneration (ISR) will be utilized

--- Page Break ---

## Page 8

for static content pages (such as the mission statement and objectives derived from the trust
deed), ensuring that these pages are served directly from the edge cache without invoking
costly serverless functions on every request. Furthermore, the Next.js <Image /> component will
be strictly utilized across the application to automatically compress, resize, and convert images
into next-generation formats like WebP, drastically reducing bandwidth consumption.
4.4 Financial Infrastructure: Razorpay Integration and Compliance
The selection of a payment gateway is a critical architectural decision, heavily influencing both
operational costs and user experience. An exhaustive comparison between the leading Indian
payment processors, Razorpay and Instamojo, indicates that Razorpay provides a superior
technical and economic framework for non-profit operations.
Comparative Analysis Matrix:
Financial Parameter / Razorpay Architecture Instamojo Architecture Strategic Justification
Feature for Sewarth Path
Sansthanam
Base Transaction 2% + 18% GST (on 2% + ₹3 + 18% GST Razorpay's omission of
Fees platform fee) the fixed ₹3 flat fee per
transaction makes it
significantly more
viable for processing
micro-donations and
the nominal ₹365
volunteer fee.
Capital Expenditure Zero Setup Fee, Zero Zero Setup Fee, Zero Both platforms align
Annual Maintenance Maintenance Charge perfectly with the
Charge (AMC) zero-capital-expenditur
e requirement.
Settlement Velocity T+2 Working Days T+3 Working Days Razorpay ensures
faster liquidity, allowing
the NGO to rapidly
deploy incoming capital
toward philanthropic
activities.
80G Compliance Native automation; Limited to basic email This is the decisive
Automation generates customized, confirmations; lacks factor. Razorpay
secure PDFs with native, completely eradicates
digital signatures upon compliance-grade PDF the administrative
successful webhook automation. nightmare of manual
triggers. receipt generation,
providing instant legal
documentation to
donors.
Technical Implementation of the Financial Flow: The financial architecture will utilize
Razorpay's Node.js SDK on the server side and their checkout script on the client side. When a
user initiates a payment (either the ₹365 membership fee or a custom donation), a Next.js
Server Action will securely communicate with the Razorpay API to generate a unique order_id.

--- Page Break ---

## Page 9

This ID is returned to the client, triggering the Razorpay checkout modal.
Crucially, the system will utilize Razorpay Webhooks to ensure transactional integrity. An API
route (/api/webhooks/razorpay) will be established to listen for the payment.captured event.
Upon receiving the payload, the server will cryptographically verify the webhook signature using
crypto.createHmac to prevent spoofing. Once verified, the system will autonomously update the
Supabase donations or volunteers table, marking the transaction as complete. Simultaneously,
Razorpay's native systems will process the collected PAN data, generate the 80G
tax-exemption PDF, and email it directly to the donor, requiring zero human intervention from the
NGO staff.
5. The Autonomous System Architecture Prompt
To execute the deployment of the aforementioned infrastructure using contemporary, AI-assisted
"vibe-coding" or autonomous web builders (such as Lovable, Bolt.new, or Cursor), a highly
deterministic, context-rich instruction set is required. The following prompt synthesizes the entire
strategic, legal, and technical framework into a comprehensive mandate designed to generate a
production-ready codebase.
You are an elite, Staff-Level Full-Stack Engineer and Systems Architect. Your mandate is to
autonomously build a fully production-ready, highly scalable, and structurally optimized bilingual
(Hindi/English) web application for an Indian non-governmental organization named "सेवाथ  पथ
सस्ं थानम"् (Sewarth Path Sansthanam), operating under the guiding philosophy of "सेवा परमो
धम"  .
This platform will be deployed entirely on the Vercel edge network utilizing the Next.js 15 App
Router. It will leverage Supabase as a comprehensive Backend-as-a-Service (BaaS) providing a
PostgreSQL database, Authentication, and Storage. Furthermore, the application must natively
integrate Razorpay to process tiered volunteer onboarding fees and general donations,
specifically supporting automated 80G tax-exempt receipt workflows.
Execute this build sequentially, adhering strictly to the architectural constraints and schema
definitions provided below. Do not ask for permission to proceed or offer high-level summaries;
implement the full, exhaustive codebase, including all necessary configuration files, strictly
typed interfaces, SQL migration schemas, and fully responsive UI components.
<design_system>
● Primary Color Palette: Saffron/Orange (hex: #F97316) representing Indian spiritual and
social service heritage, complemented by crisp White and slate grays for elevated
contrast.
● Typography: Implement a clean, highly legible sans-serif font (e.g., 'Inter' or 'Noto Sans')
that provides flawless, aesthetically pleasing rendering of Devanagari script.
● UI Framework: Utilize Tailwind CSS comprehensively, augmented with Shadcn UI
components for complex interactive elements (modals, dropdowns, forms). Ensure every
component adheres to a strict mobile-first responsive design philosophy.
</design_system>
<tech_stack>
● Core Framework: Next.js 15 (utilizing the App Router and React Server Components).
● Language Environment: TypeScript (Strict mode enabled, explicitly defining interfaces for
all database queries and API payloads).
● Internationalization Strategy: next-intl (Configured for server-side dictionary loading to
minimize client bundle size).

--- Page Break ---

## Page 10

● Backend & Authentication: @supabase/ssr and @supabase/supabase-js.
● Financial Processing: razorpay (Node SDK for server-side order generation and webhook
verification). </tech_stack>
<i18n_architecture>
1. Initialize and configure next-intl. Create the central configuration file at src/i18n/request.ts
to dynamically load JSON dictionaries based on the active locale.
2. Implement a Next.js middleware at src/middleware.ts to handle locale detection and
routing. The supported locales must be ['en', 'hi']. The default locale must be strictly set to
'hi' (Hindi).
3. Generate the dictionary files at messages/en.json and messages/hi.json. Populate these
files with comprehensive baseline keys covering: navigation elements (Home, About Us,
Volunteer, Donate), form labels (Full Name, Email, Phone Number, PAN Card, Amount),
and descriptions of the NGO's core objectives (Vedic education, women's empowerment,
healthcare, environmental protection).
4. Ensure the [locale] dynamic segment correctly wraps the entire internal app directory
structure.
5. Engineer a persistent, client-side <LanguageSwitcher /> component situated within the
global navigation bar. This component must utilize usePathname and useRouter from the
next-intl routing configuration to seamlessly update the URL locale without triggering a full
page reload or losing application state. </i18n_architecture>
<database_schema_and_rls> Generate a comprehensive SQL migration script
(supabase/migrations/00_init.sql) to be executed within the Supabase SQL editor. The schema
must include:
1. Table profiles: A table linked via trigger to the auth.users table. Columns must include: id
(uuid, primary key), full_name (text), phone (text), role (text, defaulting to 'user', utilized for
RBAC), and created_at (timestamp with time zone).
2. Table volunteers: Columns must include: id (uuid, primary key), user_id (uuid, foreign key
referencing profiles.id), dob (date), skills_profile (text), residential_address (text),
membership_tier (text - restricted to 'volunteer_365' or 'lifetime_patron_5000'),
payment_verified (boolean, default false), and razorpay_order_id (text).
3. Table donations: Columns must include: id (uuid, primary key), donor_name (text), email
(text), pan_number (text - mandatory for 80G compliance), amount_inr (numeric),
razorpay_payment_id (text), and receipt_dispatched (boolean).
4. Implement rigorous Row Level Security (RLS) policies:
○ Standard users must be granted privileges to read and update ONLY their specific
rows within the profiles and volunteers tables.
○ Administrative users (identified by role = 'admin' in the profiles table) must be
granted unrestricted read access to ALL rows across the volunteers and donations
tables for reporting purposes. </database_schema_and_rls>
<core_features_and_routes> Implement the following comprehensive pages and API endpoints
under the src/app/[locale]/ directory:
1. Global Landing Page (/):
○ A high-impact hero section prominently featuring the NGO's name "सेवाथ  पथ
सस्ं थानम"् and the motto "सेवा परमो धम"  . Implement clear, primary calls-to-action to
either 'Donate Now' or 'Become a Volunteer'.
○ A structured mission statement section detailing the core grassroots objectives
(Education, Healthcare, Organic Farming) derived from the trust deed.
2. Volunteer Onboarding Pipeline (/volunteer):

--- Page Break ---

## Page 11

○ A progressive, multi-step registration form.
○ Step 1: Core demographic data collection (Name, Phone, Email, Date of Birth).
○ Step 2: Membership Tier Selection. Present two distinct options: Option A - "Annual
Active Volunteer Fee (₹365) - Covers administrative processing and identity card
issuance". Option B - "Lifetime Patron Membership (₹5,000+)".
○ Step 3: Financial Processing. Submitting this step must invoke a Next.js Server
Action that communicates with the Razorpay API (razorpay.orders.create) to
securely generate an order. The server action returns the order_id to the client
component, which subsequently initializes and mounts the Razorpay Checkout
modal.
3. Secure Donation Portal (/donate):
○ A dynamic form collecting the donor's Name, Email, Contribution Amount, and
explicitly demanding the PAN Number, noting its requirement for 80G tax
exemption.
○ Seamless integration with the Razorpay checkout flow.
4. Financial Webhook Processor (src/app/api/webhooks/razorpay/route.ts):
○ Establish an API route to listen for Razorpay events.
○ Implement cryptographic verification of the webhook signature using
crypto.createHmac to ensure payload authenticity.
○ Upon receiving a payment.captured event: Parse the payload metadata and
autonomously update the corresponding records in the Supabase donations or
volunteers tables, marking the financial transaction as verified. (Note: The actual
dispatch of the 80G PDF receipt is handled natively by Razorpay, but the database
must accurately log the state for internal auditing).
5. Administrative Operations Dashboard (/admin):
○ Secure this layout with server-side validation ensuring the authenticated user
possesses the role === 'admin' attribute.
○ Engineer a comprehensive data table interface displaying all registered volunteers
and successful financial donations, providing the NGO leadership with actionable,
real-time oversight. </core_features_and_routes>
<vercel_and_supabase_optimizations>
● Enforce the strict usage of the Next.js <Image /> component for all graphical assets to
guarantee automatic edge caching and format optimization (WebP), preserving Vercel
bandwidth limits.
● Engineer a vital "keep-alive" API route at src/app/api/cron/keepalive/route.ts. This route
must execute a nominal SELECT count(*) FROM profiles query against the database.
This prevents the Supabase Free Tier from automatically pausing the project due to 7
days of inactivity. Include extensive code comments explaining how to tether this route to
Vercel Cron. </vercel_and_supabase_optimizations>
Commence the generation of the application architecture immediately. Begin by outputting the
package.json dependencies, proceed to the middleware.ts i18n routing logic, deliver the
Supabase SQL migration schema, and subsequently generate the core page components,
server actions, and API webhooks. Ensure all outputs represent polished, error-handled, and
elegantly styled production code.
6. Synthesis and Conclusion

--- Page Break ---

## Page 12

The strategic transition of Sewarth Path Sansthanam from a localized, manually administered
trust into a globally accessible, digitally optimized philanthropic entity requires a profound
synthesis of legal understanding, economic strategy, and modern software architecture. By
meticulously aligning the digital platform's content with the extensive socio-economic objectives
outlined in the organization's foundational trust deed—spanning education, healthcare, and
environmental conservation—the NGO ensures complete operational fidelity to its legal
mandate.
Economically, the deployment of a structured, tiered membership system resolves the persistent
challenges of volunteer attrition and administrative resource depletion. The strategic
enforcement of a nominal ₹365 annual fee for basic volunteers establishes a psychological
commitment barrier, filtering uncommitted individuals while providing necessary capital for
identity verification and administrative overhead. Concurrently, the integration of Razorpay
facilitates the seamless processing of high-value lifetime memberships and corporate donations,
fundamentally revolutionizing the organization's financial compliance by fully automating the
generation and dispatch of 80G tax-exemption receipts.
From an infrastructure perspective, the specified technological stack—Next.js 15, Vercel, and
Supabase—provides an elite, highly scalable architecture at zero initial capital expenditure. By
implementing rigorous engineering optimizations, such as server-side internationalization via
next-intl, aggressive edge caching, and automated database keep-alive protocols, the platform
circumvents the strict limitations of free-tier hosting environments. Through the deployment of
the provided autonomous generation prompt, Sewarth Path Sansthanam can bypass traditional,
cost-prohibitive development cycles, rapidly establishing a secure, bilingual, and fully automated
digital ecosystem that honors and amplifies the eternal ethos of "सेवा परमो धम"  .
Works cited
1. Samoon Membership Form | Samoon Fondation - Top NGO India | Charity Foundations in
Uttarakhand for Women and Child Education and Health,
https://www.samoonfoundation.org/samoon-membership-form.html 2. Costs - India Volunteer
Care, https://www.indiavolunteercare-org.in/costs.html 3. Volunteer organisation requiring
volunteers to pay a "sign up fee"? - Reddit,
https://www.reddit.com/r/volunteer/comments/9kjqyv/volunteer_organisation_requiring_voluntee
rs_to/ 4. Volunteer Onboarding Process 101 | ACME Ticketing,
https://www.acmeticketing.com/blog/volunteer-onboarding-process-101 5. NGO Membership -,
https://hindlifetrust.com/ngo-membership/ 6. Membership Options and Benefits - Daisy Forum of
India, https://daisyindia.org/membership-options/ 7. Members – Indian Red Cross Society | Join
& Benefits, https://www.indianredcross.org/ircs/aboutus/members/ 8. 12A and 80G Registration
for NGOs: Tax Benefits and Process - IncorpX,
https://www.incorpx.io/blog/12a-80g-registration-ngo-tax-benefits 9. NGO 80G Donation
Receipts Made Simple with Razorpay Payment Pages,
https://razorpay.com/blog/automated-80g-receipts-ngo/ 10. Introducing Automated Receipts On
Razorpay Payment Pages, https://razorpay.com/blog/automated-payment-pages-receipts/ 11.
Configure Tax Exemption Payment Button Receipt | Razorpay Docs,
https://razorpay.com/docs/payments/payment-button/80g-receipt/ 12. How Responsenet Saved
100+ Manhours Using Automated 80G Receipts - Razorpay Payment Pages,
https://razorpay.com/blog/responsenet-payments-pages-automated-80g-receipts/ 13. Best i18n
Libraries for Next.js, React & React Native in 2026 (Honest Comparison),
https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-

--- Page Break ---

## Page 13

3m8f 14. A Complete Guide to i18n in Next.js 15 App Router with next-intl (Supporting 8
Languages),
https://dev.to/mukitaro/a-complete-guide-to-i18n-in-nextjs-15-app-router-with-next-intl-supporting
-8-languages-1lgj 15. Next.js i18n Made Easy: Build Multilingual Apps with App Router in 2026 -
Eray Gündoğmuş,
https://gundogmuseray.medium.com/next-js-i18n-made-easy-build-multilingual-apps-with-app-ro
uter-in-2026-236151f37d60 16. Guides: Internationalization - Next.js,
https://nextjs.org/docs/app/guides/internationalization 17. Next.js Multilingual SEO Optimization:
Ensuring Every Language Gets Indexed,
https://eastondev.com/blog/en/posts/dev/20251225-nextjs-i18n-seo/ 18. Supabase Pricing in
2026: Plans, Free Tier Limits & Full Breakdown | UI Bakery Blog,
https://uibakery.io/blog/supabase-pricing 19. Pricing & Fees - Supabase,
https://supabase.com/pricing 20. Supabase Pricing: Real Costs at 10K-100K Users -
DesignRevision, https://designrevision.com/blog/supabase-pricing 21. Platforms with a real free
tier for developers in 2026 - Render,
https://render.com/articles/platforms-with-a-real-free-tier-for-developers-in-2026 22. Vercel
Hobby Plan, https://vercel.com/docs/plans/hobby 23. Limits - Vercel,
https://vercel.com/docs/limits 24. Setting up a custom domain - Vercel,
https://vercel.com/docs/domains/set-up-custom-domain 25. Adding & Configuring a Custom
Domain - Vercel, https://vercel.com/docs/domains/working-with-domains/add-a-domain 26.
Introducing Simplified Online Donations & 80G Receipts for NGOs - Razorpay Payment Pages,
https://razorpay.com/blog/accept-online-donations-with-80g-receipts/ 27. How to create
Razorpay Donation Page as a Nonprofit - Neki Help Center,
https://help.neki.io/en/article/how-to-create-razorpay-donation-page-as-a-nonprofit

--- Page Break ---

