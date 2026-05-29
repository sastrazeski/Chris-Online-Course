import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Video
} from "lucide-react";
import Image from "next/image";
import { CourseCard } from "@/components/course-card";
import { SetupNotice } from "@/components/setup-notice";
import { LinkButton } from "@/components/ui/button";
import { getPublishedCourses } from "@/lib/courses";
import { isSupabaseConfigured } from "@/lib/env";
import { formatPrice } from "@/lib/utils";

export default async function LandingPage() {
  const courses = await getPublishedCourses();
  const configured = isSupabaseConfigured();
  const featuredCourse = courses[0];
  const lessonCount = featuredCourse?.modules.reduce((total, module) => total + (module.lessons?.length ?? 0), 0) ?? 24;

  return (
    <div className="bg-white">
      <section className="overflow-hidden border-b border-line bg-[#F8FAFC]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              <Sparkles className="h-4 w-4" />
              Belajar skill digital dengan materi terstruktur
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Kuasai skill yang bisa langsung dipakai untuk project, karier, dan bisnis.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Ikuti course video step-by-step, akses dashboard belajar pribadi, dan pantau progres sampai setiap modul
              selesai. Materi dirancang ringkas, praktis, dan fokus pada implementasi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={featuredCourse ? `/courses/${featuredCourse.slug}` : "/courses"} className="gap-2">
                Mulai belajar
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/auth/sign-up" variant="secondary">
                Daftar gratis
              </LinkButton>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
              {[
                [`${courses.length || 1}+`, "Course aktif"],
                [`${lessonCount}+`, "Video lesson"],
                ["Lifetime", "Akses materi"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-line bg-white p-4 shadow-panel">
                  <p className="text-xl font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-sm text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-5 shadow-panel">
            <div className="relative overflow-hidden rounded-lg bg-ink">
              <Image
                src={
                  featuredCourse?.cover_image_url ??
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                }
                alt=""
                width={900}
                height={560}
                className="aspect-[16/10] w-full object-cover opacity-85"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand-700 shadow-panel">
                  <PlayCircle className="h-8 w-8" />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Featured course</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">
                {featuredCourse?.title ?? "Build Production SaaS with Next.js"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {featuredCourse?.description ??
                  "Pelajari cara membangun aplikasi modern dari nol sampai siap digunakan user."}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-gray-50 p-3">
                  <p className="font-semibold text-ink">{lessonCount} lessons</p>
                  <p className="mt-1 text-muted">Video terstruktur</p>
                </div>
                <div className="rounded-md bg-gray-50 p-3">
                  <p className="font-semibold text-ink">
                    {featuredCourse ? formatPrice(featuredCourse.price, featuredCourse.currency) : "Mulai dari IDR"}
                  </p>
                  <p className="mt-1 text-muted">Sekali bayar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        {!configured ? (
          <div className="mb-6">
            <SetupNotice />
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Belajar terarah", "Materi dibagi menjadi modul pendek supaya progres terasa jelas setiap hari.", BookOpen],
            ["Video praktis", "Ikuti penjelasan langsung dari lesson video, lalu terapkan pada project sendiri.", Video],
            ["Akses aman", "Course berbayar hanya bisa dibuka oleh student yang sudah aktif/enrolled.", ShieldCheck]
          ].map(([title, text, Icon]) => (
            <div key={title as string} className="rounded-lg border border-line bg-white p-5 shadow-panel">
              <Icon className="h-6 w-6 text-brand-600" />
              <h2 className="mt-4 font-semibold text-ink">{title as string}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Kenapa ikut course ini</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              Bukan cuma nonton video, tapi punya jalur belajar.
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Dashboard student menyimpan course yang sudah dibeli, lesson page punya video player, dan progres bisa
              ditandai selesai supaya proses belajar lebih rapi.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Mulai dari fundamental", "Bangun pemahaman dasar sebelum masuk ke materi yang lebih kompleks.", CheckCircle2],
              ["Progress tracking", "Tandai lesson yang selesai dan lanjutkan dari dashboard kapan saja.", BarChart3],
              ["Preview sebelum beli", "Admin bisa membuka beberapa lesson sebagai free preview.", BadgeCheck],
              ["Belajar fleksibel", "Akses materi dari browser dan ulangi video sesuai kebutuhan.", Clock]
            ].map(([title, text, Icon]) => (
              <div key={title as string} className="rounded-lg border border-line bg-white p-5">
                <Icon className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 font-semibold text-ink">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Course tersedia</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Pilih materi yang ingin kamu kuasai</h2>
            <p className="mt-2 text-muted">Lihat detail kurikulum, preview lesson, dan harga sebelum checkout.</p>
          </div>
          <LinkButton href="/courses" variant="secondary">
            Lihat semua
          </LinkButton>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-line bg-white p-8 text-center shadow-panel">
            <h3 className="text-lg font-semibold text-ink">Course akan tampil di sini</h3>
            <p className="mt-2 text-muted">
              Setelah Supabase schema dan seed dijalankan, course yang published akan muncul otomatis.
            </p>
          </div>
        )}
      </section>

      <section className="border-t border-line bg-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-white lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">Siap mulai?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Buat akun, pilih course, lalu lanjut belajar dari dashboard.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-300">
              Semua course yang sudah dibeli akan tersimpan di akun student. Owner bisa mengelola konten, video,
              harga, dan status publish dari admin dashboard.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="space-y-3">
              {["Daftar akun student", "Checkout course", "Akses lesson berbayar", "Pantau progres belajar"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-brand-100" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <LinkButton href="/auth/sign-up">Daftar</LinkButton>
              <LinkButton href="/courses" variant="secondary">
                Browse course
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
