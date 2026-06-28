import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Crosshair,
  LineChart,
  Megaphone,
  PenTool,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  Users,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";

const services = [
  {
    title: "Digital Strategy",
    text: "Strategi digital terukur untuk mencapai tujuan bisnis Anda.",
    icon: BarChart3
  },
  {
    title: "Social Media Management",
    text: "Kelola media sosial untuk tingkatkan brand awareness.",
    icon: Megaphone
  },
  {
    title: "Performance Marketing",
    text: "Iklan efektif untuk hasil yang optimal dan terukur.",
    icon: LineChart
  },
  {
    title: "Web & SEO",
    text: "Website cepat, SEO friendly, dan ranking lebih baik.",
    icon: Search
  }
];

const stats = [
  ["50+", "Klien Puas", Users],
  ["120+", "Project Selesai", CheckCircle2],
  ["3+", "Tahun Pengalaman", Target],
  ["10+", "Spesialis", Rocket]
];

const reasons = [
  ["Strategi Berbasis Data", "Keputusan campaign dibuat dari insight, bukan asumsi.", BarChart3],
  ["Tim Berpengalaman", "Spesialis kreatif dan performance bekerja dalam satu arah.", Users],
  ["Hasil Terukur", "Setiap aktivitas punya KPI, laporan, dan evaluasi jelas.", Zap]
];

const clients = ["Mitrato", "Wardah", "GREEBEL", "moxim", "Kahf"];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-950 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <section id="home" className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_22%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_22%_18%,rgba(255,31,61,0.10),transparent_24%)] dark:bg-[radial-gradient(circle_at_70%_18%,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_28%_12%,rgba(255,31,61,0.11),transparent_24%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-14 pt-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20 lg:pt-16">
          <div>
            <div className="inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-500 dark:bg-red-500/10">
              Digital Marketing Agency
            </div>
            <h1 className="mt-6 max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-[#071126] sm:text-6xl dark:text-slate-100">
              Creative Ideas. Digital Solutions. <span className="text-red-500">Real Impact.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-300">
              Kami membantu bisnis tumbuh melalui strategi digital yang kreatif, terukur, dan berdampak nyata.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#services" className="gap-2">
                Lihat Layanan Kami
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/courses" variant="secondary" className="gap-2">
                <Crosshair className="h-4 w-4" />
                Belajar di Online Course
              </LinkButton>
            </div>
          </div>

          <div className="relative min-h-[420px]">
            <div className="absolute left-8 top-14 h-56 w-56 rounded-[45%_55%_58%_42%] bg-red-500 dark:bg-red-600" />
            <div className="absolute bottom-14 right-20 h-60 w-72 rounded-[55%_45%_43%_57%] bg-blue-700" />
            <div className="absolute right-10 top-8 grid grid-cols-8 gap-3 opacity-75">
              {Array.from({ length: 64 }).map((_, index) => (
                <span key={index} className="h-1.5 w-1.5 rounded-full bg-blue-700" />
              ))}
            </div>
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
              alt="Tim Red and Blue sedang berdiskusi strategi digital"
              width={900}
              height={650}
              priority
              className="relative z-10 mx-auto aspect-[4/3] max-h-[460px] w-full max-w-[620px] rounded-[2rem] object-cover object-center shadow-panel"
            />
            {[
              ["Digital Strategy", BarChart3, "right-4 top-16"],
              ["Content Creation", Play, "right-0 top-44"],
              ["Performance", LineChart, "right-8 bottom-20"]
            ].map(([label, Icon, position]) => (
              <div
                key={label as string}
                className={`absolute z-20 hidden w-36 rounded-lg border border-white/70 bg-white/90 p-4 shadow-panel backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/80 lg:block ${position}`}
              >
                <Icon className="h-6 w-6 text-red-500" />
                <p className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white/80 p-5 shadow-panel backdrop-blur sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-700/70 dark:bg-slate-800/70">
          {stats.map(([value, label, Icon]) => (
            <div key={label as string} className="flex items-center gap-4 px-2 py-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/15">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-3xl font-black">{value as string}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-black tracking-tight">Layanan Kami</h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            Kami menyediakan solusi digital yang disesuaikan dengan kebutuhan bisnis Anda.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-panel dark:border-slate-700/70 dark:bg-slate-800/70">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/15">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
              <Link href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-500">
                Selengkapnya
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 text-slate-400 dark:text-slate-500">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Dipercaya oleh berbagai klien</span>
          {clients.map((client) => (
            <span key={client} className="text-2xl font-black tracking-tight">
              {client}
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="bg-slate-50 dark:bg-slate-800/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Kenapa Memilih Red&Blue?</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
              Kami bukan sekadar agency, kami adalah partner yang siap tumbuh bersama bisnis Anda.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {reasons.map(([title, text, Icon]) => (
                <div key={title as string} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700/70 dark:bg-slate-800/80">
                  <Icon className="h-6 w-6 text-red-500" />
                  <h3 className="mt-4 font-black">{title as string}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{text as string}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop"
            alt="Ruang kerja kreatif Red and Blue"
            width={900}
            height={560}
            className="aspect-[16/10] rounded-lg object-cover shadow-panel"
          />
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Portfolio Pilihan</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Contoh arah kerja kami untuk brand yang ingin terlihat, dipercaya, dan dipilih.</p>
          </div>
          <LinkButton href="#contact" variant="secondary">Diskusi Project</LinkButton>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Brand Launch", "Strategi peluncuran brand baru dengan campaign multi-channel."],
            ["Growth Ads", "Optimasi iklan untuk meningkatkan leads dan conversion rate."],
            ["SEO Website", "Company profile cepat, jelas, dan siap bersaing di pencarian."]
          ].map(([title, text], index) => (
            <article key={title} className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700/70 dark:bg-slate-800/70">
              <Image
                src={`https://images.unsplash.com/photo-${["1559136555-9303baea8ebd", "1556761175-b413da4baf72", "1460925895917-afdab827c52f"][index]}?q=80&w=900&auto=format&fit=crop`}
                alt={title}
                width={700}
                height={460}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="blog" className="bg-slate-50 dark:bg-slate-800/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-black tracking-tight">Insight Terbaru</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              "Cara membaca data campaign tanpa kehilangan konteks kreatif.",
              "Checklist website company profile yang siap menghasilkan leads.",
              "Kenapa konsistensi brand penting sebelum scale iklan."
            ].map((title) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700/70 dark:bg-slate-800/70">
                <PenTool className="h-6 w-6 text-red-500" />
                <h3 className="mt-5 font-black leading-6">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Panduan singkat untuk membantu bisnis mengambil keputusan digital yang lebih rapi dan terukur.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 rounded-xl bg-slate-800 p-8 text-slate-100 lg:grid-cols-[1fr_360px] lg:items-center dark:bg-slate-800">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-red-400">Siap bertumbuh?</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Bangun digital presence yang lebih jelas, kuat, dan terukur.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Ceritakan kebutuhan bisnis Anda. Tim Red and Blue akan membantu menyusun strategi yang realistis untuk tahap bisnis saat ini.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            {["Audit kebutuhan", "Rencana campaign", "Eksekusi kreatif", "Laporan performa"].map((item) => (
              <div key={item} className="flex items-center gap-3 py-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-red-400" />
                <span>{item}</span>
              </div>
            ))}
            <LinkButton href="mailto:hello@redandblue.agency" className="mt-5 w-full gap-2">
              Hubungi Kami
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
