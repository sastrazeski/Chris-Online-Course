-- Run in Supabase SQL Editor to make lesson video storage private.
-- Existing public video URLs should be re-uploaded from the admin page so they are stored as supabase:// protected URLs.

update storage.buckets
set public = false
where id = 'lesson-videos';
