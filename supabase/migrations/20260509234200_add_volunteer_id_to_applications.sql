-- Add volunteer_id column for sequential volunteer IDs
ALTER TABLE volunteer_applications ADD COLUMN IF NOT EXISTS volunteer_id text UNIQUE;

-- Create index for fast lookup by volunteer_id
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_volunteer_id ON volunteer_applications(volunteer_id);
