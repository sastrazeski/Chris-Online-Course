insert into public.courses (title, slug, description, cover_image_url, price, currency, is_published)
values
  (
    'Build Production SaaS with Next.js',
    'production-saas-nextjs',
    'A practical course for shipping a subscription-ready SaaS product with authentication, database design, payments, and deployment.',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
    499000,
    'IDR',
    true
  )
on conflict (slug) do nothing;

with course as (
  select id from public.courses where slug = 'production-saas-nextjs'
), inserted_modules as (
  insert into public.modules (course_id, title, position)
  select course.id, module_title, position
  from course,
  (values
    ('Foundation', 1),
    ('Payments and Access', 2)
  ) as v(module_title, position)
  returning id, title
)
insert into public.lessons (module_id, title, slug, description, video_url, duration_seconds, position, is_preview)
select id, lesson_title, slug, description, video_url, duration_seconds, position, is_preview
from inserted_modules
join (values
  ('Foundation', 'Course architecture', 'course-architecture', 'Plan the application boundaries and database model.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 600, 1, true),
  ('Foundation', 'Supabase Auth and RLS', 'supabase-auth-rls', 'Protect data with policies and server-side auth checks.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 900, 2, false),
  ('Payments and Access', 'Midtrans checkout', 'midtrans-checkout', 'Create payment transactions and process webhook callbacks.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 780, 1, false)
) as l(module_title, lesson_title, slug, description, video_url, duration_seconds, position, is_preview)
on inserted_modules.title = l.module_title
on conflict (module_id, slug) do nothing;
