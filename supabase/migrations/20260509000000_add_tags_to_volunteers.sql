ALTER TABLE volunteer_applications ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
