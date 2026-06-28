"use client";

import { Camera, GraduationCap, Lock, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { DashboardCourseCard } from "./course-card";
import { FeatureCard } from "./feature-card";
import { MentorSessionCard } from "./mentor-session-card";
import { ProgressCard } from "./progress-card";
import { SubscribeModal } from "./subscribe-modal";

const courses = [
  ["Digital Marketing Dasar untuk Pemula", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop", "14:20", 12],
  ["Strategi Konten yang Menjual", "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=900&auto=format&fit=crop", "22:08", 25],
  ["Meta Ads untuk Pemula", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop", "18:45", 40],
  ["Optimasi Marketplace Shopee & Tokopedia", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop", "26:11", 15],
  ["TikTok Ads Mastery", "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=900&auto=format&fit=crop", "31:04", 0]
] as const;

export function DashboardHome({ displayName }: { displayName: string }) {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const firstName = displayName.split(" ")[0] || "Sastra";

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#FF304F]">Hi, {firstName}!</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#07122D] md:text-5xl dark:text-white">
            Belajar. Berkarya. Berdampak.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Tingkatkan skill digitalmu dan kembangkan bisnismu bersama Red and Blue Creative Academy.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="Jasa Content Creator"
              description="Buat konten yang menarik dan berstrategi untuk brand Anda."
              action="Lihat Layanan"
              href="#creative-services"
              icon={Camera}
              variant="navy"
            />
            <FeatureCard
              title="Jasa E-Commerce / Marketplace"
              description="Kelola toko online Anda di berbagai marketplace secara profesional."
              action="Lihat Layanan"
              href="#ecommerce-services"
              icon={ShoppingCart}
              variant="red"
            />
            <FeatureCard
              title="Online Course"
              description="Belajar digital marketing, konten, ads, dan banyak lagi darinya."
              action="Mulai Belajar"
              href="#learning"
              icon={GraduationCap}
              variant="navy"
            />
          </div>
        </div>
        <ProgressCard />
      </section>

      <section id="learning">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#07122D] dark:text-white">Lanjutkan Belajar</h2>
            <p className="mt-1 text-sm text-slate-500">Semua video premium terkunci untuk user non-premium.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map(([title, image, duration, progress]) => (
            <DashboardCourseCard
              key={title}
              title={title}
              image={image}
              duration={duration}
              progress={progress}
              onLockedClick={() => setIsSubscribeOpen(true)}
            />
          ))}
        </div>
        <p className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5">
          Video premium dilindungi dengan overlay lock untuk non-premium. Akses sebenarnya wajib diverifikasi dari backend subscription sebelum video diizinkan diputar.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <InfoPanel title="Aktivitas Terbaru">
          <ActivityItem text='Kamu melanjutkan kelas "Meta Ads untuk Pemula"' />
          <ActivityItem text="Sertifikat baru diperoleh: Content Strategy Basic" />
          <ActivityItem text='Materi baru tersedia di kelas "TikTok Ads Mastery"' />
        </InfoPanel>
        <InfoPanel title="Materi Premium">
          {["Case Study Campaign Brand Lokal", "Template Content Calendar 2024", "Swipe File Iklan Meta Ads"].map((item) => (
            <div key={item} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-[#07122D] dark:bg-white/5 dark:text-white">
              <span>{item}</span>
              <span className="inline-flex items-center gap-1 text-xs font-black text-[#FF304F]">
                <Lock className="h-3.5 w-3.5" />
                Akses setelah upgrade
              </span>
            </div>
          ))}
        </InfoPanel>
        <InfoPanel title="Jadwal Mentor Session">
          <MentorSessionCard title="Strategi Scaling Meta Ads" mentor="@ahmadfdh" schedule="24 Mei 2024 - 19:00 WIB" />
          <MentorSessionCard title="Content That Converts" mentor="@ranimala" schedule="26 Mei 2024 - 15:00 WIB" />
        </InfoPanel>
      </section>

      <SubscribeModal isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
    </div>
  );
}

function InfoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
      <h2 className="font-black text-[#07122D] dark:text-white">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function ActivityItem({ text }: { text: string }) {
  return <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-200">{text}</div>;
}
