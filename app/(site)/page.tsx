import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Lightbulb,
  LineChart,
  MessageCircle,
  Megaphone,
  Play,
  Rocket,
  ShoppingBag,
  Target,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  ["50+", "Klien Puas", Users],
  ["120+", "Project Selesai", CheckCircle2],
  ["3+", "Tahun Pengalaman", Target],
  ["10+", "Spesialis", Rocket]
];

const clients = ["Mitrato", "Wardah", "GREEBEL", "moxim", "Kahf"];

const services = [
  ["Digital Strategy", "Strategi digital terukur untuk mencapai tujuan bisnis Anda.", Lightbulb],
  ["Social Media Management", "Kelola media sosial untuk tingkatkan brand awareness.", Users],
  ["Performance Marketing", "Iklan efektif untuk hasil yang optimal dan terukur.", Megaphone],
  ["Web & SEO", "Website cepat, SEO friendly, dan ranking lebih baik.", Globe2],
  ["E-Commerce / Marketplace", "Kelola toko online di berbagai marketplace secara profesional.", ShoppingBag]
];

const portfolio = [
  [
    "Brand Launch",
    "Strategi peluncuran brand baru dengan campaign multi-channel.",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop"
  ],
  [
    "Growth Ads",
    "Optimasi iklan untuk meningkatkan leads dan conversion rate.",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop"
  ],
  [
    "SEO Website",
    "Company profile cepat, jelas, dan siap bersaing di pencarian.",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop"
  ]
];

const insights = [
  [
    "Cara membaca data campaign tanpa kehilangan konteks kreatif.",
    "20 Mei 2024",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop"
  ],
  [
    "Checklist website company profile yang siap menghasilkan leads.",
    "18 Mei 2024",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=300&auto=format&fit=crop"
  ],
  [
    "Kenapa konsistensi brand penting sebelum scale iklan.",
    "15 Mei 2024",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300&auto=format&fit=crop"
  ]
];

export default function LandingPage() {
  return (
    <div id="home" className="min-h-screen bg-white text-[#07122D] dark:bg-slate-950 dark:text-white">
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_10%,rgba(255,48,79,0.10),transparent_28%),radial-gradient(circle_at_16%_12%,rgba(7,18,45,0.06),transparent_24%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
            <div>
              <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase text-[#FF304F]">
                Digital Marketing Agency
              </span>
              <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.06] text-[#07122D] sm:text-6xl dark:text-white">
                Creative Ideas.
                <br />
                Digital Solutions.
                <br />
                <span className="text-[#FF304F]">Real Impact.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Kami membantu bisnis tumbuh melalui strategi digital yang kreatif, terukur, dan berdampak nyata.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/dashboard" className="inline-flex h-12 items-center gap-3 rounded-xl bg-[#FF304F] px-6 text-sm font-black text-white shadow-xl shadow-red-500/20">
                  Masuk ke Menu Utama
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
                alt="Tim Red and Blue sedang berdiskusi strategi digital"
                width={900}
                height={600}
                priority
                className="relative mx-auto aspect-[16/10] w-full rounded-[28px] object-cover shadow-2xl shadow-slate-900/12"
              />
              {[
                ["Digital Strategy", BarChart3, "right-4 top-8"],
                ["Content Creation", Play, "right-0 top-36"],
                ["Performance", LineChart, "right-7 bottom-8"]
              ].map(([label, Icon, position]) => (
                <div
                  key={label as string}
                  className={`absolute hidden w-36 rounded-2xl border border-white/75 bg-white/90 p-4 shadow-xl shadow-slate-900/10 backdrop-blur lg:block ${position}`}
                >
                  <Icon className="h-6 w-6 text-[#FF304F]" />
                  <p className="mt-3 text-sm font-black text-[#07122D]">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center dark:border-white/10 dark:bg-white/5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([value, label, Icon]) => (
                <div key={label as string} className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-[#FF304F] dark:bg-red-500/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-2xl font-black">{value as string}</span>
                    <span className="text-xs font-bold text-slate-500">{label as string}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 dark:border-white/10">
              <p className="text-xs font-semibold text-slate-500">Dipercaya oleh berbagai klien</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-xl font-black text-slate-400">
                {clients.map((client) => (
                  <span key={client}>{client}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[260px_1fr]">
          <div>
            <p className="text-xs font-black uppercase text-[#FF304F]">Layanan Kami</p>
            <h2 className="mt-4 text-3xl font-black leading-tight">Solusi Digital untuk Bisnismu</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Kami menyediakan layanan digital yang dirancang untuk membantu bisnismu tumbuh lebih cepat dan berkelanjutan.
            </p>
            <Link href="#contact" className="mt-6 inline-flex h-11 items-center gap-3 rounded-xl border border-slate-200 px-5 text-sm font-black transition hover:border-[#FF304F] hover:text-[#FF304F] dark:border-white/10">
              Lihat Semua Layanan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {services.map(([title, text, Icon]) => (
              <article key={title as string} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10 dark:border-white/10 dark:bg-white/5">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-[#FF304F] dark:bg-red-500/10">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-black leading-5">{title as string}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text as string}</p>
                <Link href="#contact" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#FF304F]">
                  Selengkapnya
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-[28px] bg-slate-50 p-6 sm:p-8 dark:bg-white/5">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                ["Strategi Berbasis Data", "Keputusan campaign dibuat dari insight, bukan asumsi."],
                ["Kreatif dan Terukur", "Ide kreatif disusun agar tetap punya arah bisnis yang jelas."],
                ["Eksekusi Profesional", "Tim mengelola campaign, konten, dan evaluasi dengan rapi."]
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/40">
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="max-w-sm">
                <p className="text-xs font-black uppercase text-[#FF304F]">Portfolio Pilihan</p>
                <h2 className="mt-3 text-3xl font-black leading-tight">Hasil Kerja yang Berbicara</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Contoh arah kerja kami untuk brand yang ingin terlihat, dipercaya, dan dipilih.
                </p>
              </div>
              <Link href="#contact" className="inline-flex h-11 items-center gap-3 rounded-xl border border-slate-200 px-5 text-sm font-black transition hover:border-[#FF304F] hover:text-[#FF304F] dark:border-white/10">
                Lihat Portfolio Lainnya
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {portfolio.map(([title, text, image]) => (
                <article key={title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
                  <Image src={image} alt={title} width={600} height={420} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="blog" className="xl:pt-10">
            <p className="text-xs font-black uppercase text-[#FF304F]">Insight Terbaru</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">Artikel & Tips Digital</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Panduan singkat untuk membantu bisnis mengambil keputusan digital yang lebih rapi dan terukur.
            </p>
            <Link href="#contact" className="mt-6 inline-flex h-11 items-center gap-3 rounded-xl border border-slate-200 px-5 text-sm font-black transition hover:border-[#FF304F] hover:text-[#FF304F] dark:border-white/10">
              Lihat Semua Artikel
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-7 space-y-4">
              {insights.map(([title, date, image]) => (
                <article key={title} className="grid grid-cols-[92px_1fr] gap-4">
                  <Image src={image} alt="" width={160} height={110} className="aspect-[4/3] rounded-xl object-cover" />
                  <div>
                    <h3 className="text-sm font-black leading-5">{title}</h3>
                    <p className="mt-2 text-xs font-semibold text-slate-500">{date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid gap-8 rounded-[28px] bg-[#07122D] p-8 text-white shadow-2xl shadow-slate-900/15 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-red-300">Siap Bertumbuh?</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">Bangun digital presence yang lebih jelas, kuat, dan terukur.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Ceritakan kebutuhan bisnis Anda. Tim Red and Blue akan membantu menyusun strategi yang realistis untuk tahap bisnis saat ini.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              {["Audit kebutuhan", "Rencana campaign", "Eksekusi kreatif", "Laporan performa"].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-red-300" />
                  <span>{item}</span>
                </div>
              ))}
              <Link href="mailto:hello@redandblue.agency" className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#FF304F] text-sm font-black text-white shadow-xl shadow-red-500/20">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Link href="#contact" className="fixed bottom-6 right-6 z-50 inline-flex h-14 items-center gap-3 rounded-full bg-[#FF304F] px-6 text-sm font-black text-white shadow-2xl shadow-red-500/30">
        <MessageCircle className="h-5 w-5" />
        Contact Us
      </Link>
    </div>
  );
}
