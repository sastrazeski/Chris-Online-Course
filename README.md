# CourseStack

Online course web app built with Next.js App Router, Supabase Auth/Postgres/RLS, Tailwind CSS, and Midtrans Snap payments.

## Features

- Landing page for selling courses
- Supabase email/password authentication
- Student dashboard for purchased courses
- Course detail pages with modules and lessons
- Protected lesson pages with embedded video player
- Lesson completion tracking
- Midtrans checkout and webhook fulfillment
- Admin dashboard for creating courses, modules, and lessons
- Paid route protection through middleware, server checks, and Supabase RLS

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project and run:

   - `supabase/schema.sql` in the SQL editor
   - `supabase/seed.sql` for demo course content

3. Copy `.env.example` to `.env.local` and fill in:

   ```bash
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   MIDTRANS_SERVER_KEY=...
   MIDTRANS_CLIENT_KEY=...
   MIDTRANS_IS_PRODUCTION=false
   ```

4. In Supabase Auth settings, set the site URL to `http://localhost:3000`.

5. Make your first admin:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = 'YOUR_USER_ID';
   ```

6. Configure Midtrans:

   - Use sandbox keys for local testing.
   - Set the payment notification URL to:

     ```text
     https://your-public-url.com/api/midtrans/webhook
     ```

   - For local webhook testing, expose your app with a tunnel such as ngrok and use the tunnel URL.

7. Run the app:

   ```bash
   npm run dev
   ```

## Important Routes

- `/` landing page
- `/courses` course catalog
- `/courses/[slug]` course detail
- `/checkout/[courseId]` Midtrans checkout creation
- `/dashboard` purchased courses
- `/learn/[courseSlug]/[lessonSlug]` protected lesson page
- `/admin` course/module/lesson admin
- `/api/midtrans/webhook` Midtrans notification endpoint
- `/api/progress` lesson progress endpoint

## Database Notes

The schema enables row level security on every application table. Public users can read published course metadata, but paid lessons require an active enrollment or admin role. The webhook uses `SUPABASE_SERVICE_ROLE_KEY` because Midtrans calls it without a user session and it must update orders and create enrollments server-side.

Preview lessons can be watched without enrollment. Non-preview lessons redirect unauthenticated users to sign in and signed-in users without access to checkout.
