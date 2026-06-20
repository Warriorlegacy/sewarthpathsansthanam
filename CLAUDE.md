# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Sewarth Path Sansthanam is a bilingual (Hindi + English) NGO website and web application designed for volunteer onboarding, membership management, and donations.

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (Postgres, Auth, Storage, Row Level Security)
- **Payments:** Razorpay (primary) / Stripe
- **Hosting:** Vercel

## Architecture
- **Bilingual Support:** Implementation uses locale-aware routing (`/hi`, `/en`) or a language toggle, with dynamic content stored in the database using `_hi` and `_en` columns.
- **RBAC:** Role-Based Access Control managed via `profiles.role` (`public`, `volunteer`, `member`, `admin`, `super_admin`) and Supabase RLS policies.
- **Core Modules:**
    - Public Information Site (Home, About, Programs, Events, Impact Stories, Resources, Contact)
    - Volunteer & Membership System (Sign-up, Paid Tiers, Digital ID with QR verification)
    - Donations & Payments (Guest donations, payment webhooks)
    - Admin Dashboard (Volunteer/Member management, Content CMS, Donation reports)

## Database Schema (Supabase)
Key tables include:
- `profiles`: User profiles and roles.
- `volunteer_applications`: Application tracking for volunteers.
- `membership_plans`: Definition of membership tiers and fees.
- `memberships`: User membership status and validity.
- `payments`: Transaction logs for all payment types.
- `donations`: Specific donation details.
- `events`, `programs`, `stories`, `pages`: Bilingual content tables.
- `contact_messages`: Inquiries from the contact form.

## Common Development Tasks
- **Environment Variables:** Ensure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and payment provider keys (`RAZORPAY_KEY_ID`, etc.) are configured in Vercel.
- **Database Changes:** Use Supabase SQL Editor for migrations and schema updates.
- **Content Management:** Handled via the Admin Dashboard or directly in Supabase for seed data.
