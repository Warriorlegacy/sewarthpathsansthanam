-- Set Piyush Raj Singh as admin
-- Run this migration after the core schema is in place

UPDATE profiles
SET role = 'admin', updated_at = NOW()
WHERE email = 'piyushrajsingh092@gmail.com';

-- If the user doesn't exist yet, create a placeholder (they'll need to sign up first)
-- The website login will create the profile row; this migration ensures it becomes admin once email matches
-- For safety, we can also verify the update count
