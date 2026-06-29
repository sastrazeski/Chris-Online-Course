import Link from "next/link";
import { Award, BookOpen, CalendarClock, CheckCircle2, CreditCard, Heart, Lock, MessageCircle, PlayCircle, ShoppingBag, Sparkles, Users, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SubscribeButton } from "./subscribe-provider";

type SectionKey =
  | "online-course"
  | "creative-services"
  | "ecommerce-services"
  | "my-learning"
  | "favorite"
  | "certificates"
  | "community"
  | "mentor-session"
  | "billing";

const sections: Record<
  SectionKey,
  {
    eyebrow: string;
    title: string;
    description: string;
    icon: LucideIcon;
    action?: { label: string; href: string };
    cards: Array<{ title: string; description: string; meta?: string; icon: LucideIcon; locked?: boolean; plan?: "monthly" | "yearly" }>;
  }
> = {
  "online-course": {
    eyebrow: "Creative Academy",
    title: "Online Course",
    description: "Pusat kelas digital marketing, content strategy, ads, marketplace, dan materi premium.",
    icon: BookOpen,
    action: { label: "Buka katalog course", href: "/courses" },
    cards: [
      { title: "Digital Marketing Dasar", description: "Fondasi funnel, channel, dan strategi campaign.", meta: "12% selesai", icon: PlayCircle, locked: true },
      { title: "Meta Ads untuk Pemula", description: "Belajar struktur campaign, targeting, dan evaluasi iklan.", meta: "40% selesai", icon: PlayCircle, locked: true },
      { title: "TikTok Ads Mastery", description: "Riset kreatif, testing hook, dan scale iklan video pendek.", meta: "0% selesai", icon: PlayCircle, locked: true }
    ]
  },
  "creative-services": {
    eyebrow: "Agency Services",
    title: "Jasa Kreatif",
    description: "Kelola kebutuhan konten brand dari ide, produksi, kalender konten, sampai evaluasi performa.",
    icon: Video,
    cards: [
      { title: "Content Planning", description: "Rencana konten bulanan yang selaras dengan target bisnis.", meta: "Strategi", icon: Sparkles },
      { title: "Video Production", description: "Produksi video pendek untuk Reels, TikTok, dan ads creative.", meta: "Produksi", icon: Video },
      { title: "Creative Report", description: "Review performa konten dan rekomendasi perbaikan.", meta: "Evaluasi", icon: CheckCircle2 }
    ]
  },
  "ecommerce-services": {
    eyebrow: "Marketplace Growth",
    title: "E-Commerce Services",
    description: "Pantau layanan pengelolaan toko online, optimasi katalog, promo, dan performa marketplace.",
    icon: ShoppingBag,
    cards: [
      { title: "Optimasi Katalog", description: "Judul, foto, deskripsi, dan keyword produk dibuat lebih siap jual.", meta: "Shopee/Tokopedia", icon: ShoppingBag },
      { title: "Campaign Marketplace", description: "Rencana promo dan flash sale agar traffic lebih terarah.", meta: "Promo", icon: Sparkles },
      { title: "Laporan Toko", description: "Ringkasan traffic, order, conversion, dan rekomendasi mingguan.", meta: "Report", icon: CheckCircle2 }
    ]
  },
  "my-learning": {
    eyebrow: "Learning Path",
    title: "My Learning",
    description: "Lanjutkan materi yang sedang berjalan dan lihat progress kelas kamu.",
    icon: Sparkles,
    cards: [
      { title: "Meta Ads untuk Pemula", description: "Lanjutkan modul struktur campaign.", meta: "40% selesai", icon: PlayCircle, locked: true },
      { title: "Strategi Konten yang Menjual", description: "Lanjutkan materi content angle dan CTA.", meta: "25% selesai", icon: PlayCircle, locked: true },
      { title: "Marketplace Optimization", description: "Mulai modul optimasi listing produk.", meta: "15% selesai", icon: PlayCircle, locked: true }
    ]
  },
  favorite: {
    eyebrow: "Saved Items",
    title: "Favorite",
    description: "Materi, kelas, dan mentor session yang kamu simpan untuk dibuka lagi nanti.",
    icon: Heart,
    cards: [
      { title: "Swipe File Iklan Meta Ads", description: "Referensi visual dan copy untuk eksperimen campaign.", meta: "Materi premium", icon: Heart, locked: true },
      { title: "Content Calendar Framework", description: "Kerangka editorial untuk brand dan campaign bulanan.", meta: "Template", icon: Heart, locked: true },
      { title: "Scaling Checklist", description: "Checklist sebelum menaikkan budget iklan.", meta: "Ads", icon: Heart, locked: true }
    ]
  },
  certificates: {
    eyebrow: "Achievements",
    title: "Certificates",
    description: "Sertifikat yang sudah didapat dan progress menuju sertifikat berikutnya.",
    icon: Award,
    cards: [
      { title: "Content Strategy Basic", description: "Sertifikat diperoleh setelah menyelesaikan kelas dasar strategi konten.", meta: "Diperoleh", icon: Award },
      { title: "Meta Ads Foundation", description: "Selesaikan semua modul dan quiz untuk membuka sertifikat.", meta: "40% progress", icon: Award, locked: true },
      { title: "Marketplace Growth", description: "Sertifikat untuk pengelolaan marketplace profesional.", meta: "Belum mulai", icon: Award, locked: true }
    ]
  },
  community: {
    eyebrow: "Member Area",
    title: "Community",
    description: "Ruang diskusi member Red and Blue Creative Academy.",
    icon: Users,
    cards: [
      { title: "Diskusi Campaign", description: "Bahas ide campaign, hook, dan evaluasi iklan bersama member.", meta: "Forum", icon: MessageCircle },
      { title: "Creative Review", description: "Ajukan creative untuk direview di sesi komunitas.", meta: "Weekly", icon: Users },
      { title: "Member Showcase", description: "Lihat hasil campaign dan konten dari member lain.", meta: "Inspirasi", icon: Sparkles }
    ]
  },
  "mentor-session": {
    eyebrow: "Live Session",
    title: "Mentor Session",
    description: "Jadwal mentoring group untuk strategi ads, konten, dan marketplace.",
    icon: CalendarClock,
    cards: [
      { title: "Strategi Scaling Meta Ads", description: "Bersama @ahmadfdh.", meta: "24 Mei 2024 - 19:00 WIB", icon: CalendarClock },
      { title: "Content That Converts", description: "Bersama @ranimala.", meta: "26 Mei 2024 - 15:00 WIB", icon: CalendarClock },
      { title: "Marketplace Audit Clinic", description: "Review toko dan listing produk bersama mentor.", meta: "30 Mei 2024 - 16:00 WIB", icon: CalendarClock }
    ]
  },
  billing: {
    eyebrow: "Subscription",
    title: "Billing & Subscription",
    description: "Kelola paket premium, akses kelas, dan status subscription.",
    icon: CreditCard,
    cards: [
      { title: "Monthly", description: "Akses semua kelas premium dan materi eksklusif.", meta: "Rp99.000 / bulan", icon: CreditCard, plan: "monthly" },
      { title: "Yearly", description: "Paket tahunan dengan value terbaik untuk member aktif.", meta: "Rp799.000 / tahun", icon: CreditCard, plan: "yearly" },
      { title: "Benefit Premium", description: "Materi premium, sesi mentor group, dan sertifikat kelulusan.", meta: "Upgrade", icon: Sparkles, plan: "yearly" }
    ]
  }
};

export function DashboardSectionPage({ section }: { section: SectionKey }) {
  const data = sections[section];
  const Icon = data.icon;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-[#07122D] p-8 text-white shadow-2xl shadow-slate-900/15">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-red-300">{data.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">{data.title}</h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">{data.description}</p>
          </div>
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
            <Icon className="h-8 w-8 text-red-300" />
          </span>
        </div>
        {data.action ? (
          <Link href={data.action.href} className="mt-7 inline-flex h-11 items-center rounded-2xl bg-[#FF304F] px-5 text-sm font-black text-white shadow-lg shadow-red-500/20">
            {data.action.label}
          </Link>
        ) : null}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.cards.map((card) => {
          const CardIcon = card.icon;
          const content = (
            <>
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-[#FF304F] dark:bg-red-500/10">
                  <CardIcon className="h-5 w-5" />
                </span>
                {card.locked ? <Lock className="h-4 w-4 text-slate-400" /> : null}
              </div>
              <h2 className="mt-5 text-xl font-black text-[#07122D] dark:text-white">{card.title}</h2>
              <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.description}</p>
              {card.meta ? (
                <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 dark:bg-white/5 dark:text-slate-200">
                  {card.meta}
                </p>
              ) : null}
            </>
          );

          if (card.plan) {
            return (
              <SubscribeButton
                key={card.title}
                plan={card.plan}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:border-[#FF304F]/50 hover:shadow-2xl hover:shadow-slate-900/10 focus:outline-none focus:ring-4 focus:ring-red-500/15 dark:border-white/10 dark:bg-white/5"
              >
                {content}
              </SubscribeButton>
            );
          }

          return (
            <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
              {content}
            </article>
          );
        })}
      </section>
    </div>
  );
}
