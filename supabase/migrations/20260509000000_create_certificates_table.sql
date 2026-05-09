/*
  # Certificates - Award certificates to volunteers/members

  ## Overview
  This migration creates the certificates table for storing generated certificates
  with their metadata and storage references.

  ## New Tables

  1. **certificates** — Certificate records
     - recipient_name, recipient_name_hindi (bilingual)
     - certificate_type: 'appreciation' | 'participation' | 'completion' | 'service'
     - event_name (optional)
     - issue_date, volunteer_hours
     - user_id (FK to profiles, nullable for guest certificates)
     - volunteer_application_id (FK for volunteer-based certificates)
     - storage_path (Supabase Storage path), public_url
     - created_at

  ## Storage
  Creates a `certificates` bucket in Supabase Storage for PDF files.
  RLS policies allow public read for certificates, service role write.

  ## Indexes
  - idx_certificates_user_id
  - idx_certificates_volunteer_application_id
  - idx_certificates_certificate_type
*/

-- Enable storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name text NOT NULL,
  recipient_name_hindi text NOT NULL,
  certificate_type text NOT NULL CHECK (certificate_type IN ('appreciation', 'participation', 'completion', 'service')),
  event_name text,
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  volunteer_hours numeric(5,1),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  volunteer_application_id uuid REFERENCES volunteer_applications(id) ON DELETE SET NULL,
  storage_path text NOT NULL,
  public_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policies: Service role can do everything
CREATE POLICY "Service role can manage certificates"
  ON certificates FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can view their own certificates
CREATE POLICY "Users can view own certificates"
  ON certificates FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Public can view published certificates (if needed, optional)
-- CREATE POLICY "Anyone can view certificates by public URL"
--   ON certificates FOR SELECT
--   TO anon
--   USING (true);

-- Storage policies for certificates bucket
CREATE POLICY "Public can view certificate files"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'certificates');

CREATE POLICY "Service role can upload certificate files"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'certificates');

CREATE POLICY "Service role can update certificate files"
  ON storage.objects FOR UPDATE
  TO service_role
  USING (bucket_id = 'certificates');

CREATE POLICY "Service role can delete certificate files"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'certificates');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_volunteer_application_id ON certificates(volunteer_application_id);
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_type ON certificates(certificate_type);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at DESC);
