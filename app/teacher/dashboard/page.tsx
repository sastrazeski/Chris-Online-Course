import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileBarChart,
  MessageSquare,
  MoreVertical,
  PlayCircle,
  Star,
  Upload,
  Users,
  WalletCards
} from "lucide-react";

const kpis = [
  { label: "Total Kelas", value: "12", trend: "2 kelas baru bulan ini", icon: BookOpen, tone: "red" },
  { label: "Total Siswa", value: "1,248", trend: "18.3% dari bulan lalu", icon: Users, tone: "blue" },
  { label: "Total Penayangan", value: "24,560", trend: "25.4% dari bulan lalu", icon: PlayCircle, tone: "purple" },
  { label: "Pendapatan Bulan Ini", value: "Rp 24.560.000", trend: "32.7% dari bulan lalu", icon: WalletCards, tone: "green" }
] as const;

const classRows = [
  { title: "Meta Ads untuk Pemula", status: "Published", students: "512", views: "12.450", revenue: "Rp 12.450.000", color: "bg-blue-600" },
  { title: "Strategi Konten yang Menjual", status: "Published", students: "345", views: "7.820", revenue: "Rp 7.820.000", color: "bg-slate-800" },
  { title: "TikTok Ads Mastery", status: "Published", students: "287", views: "4.290", revenue: "Rp 4.290.000", color: "bg-purple-600" },
  { title: "Optimasi Marketplace Shopee & Tokopedia", status: "Published", students: "198", views: "3.120", revenue: "Rp 3.120.000", color: "bg-red-500" },
  { title: "Digital Marketing Dasar", status: "Draft", students: "164", views: "2.880", revenue: "Rp 2.880.000", color: "bg-amber-600" }
];

const topClasses = [
  ["Meta Ads untuk Pemula", "512 siswa", "Rp 12.450.000", "bg-blue-600"],
  ["Strategi Konten yang Menjual", "345 siswa", "Rp 7.820.000", "bg-slate-800"],
  ["TikTok Ads Mastery", "287 siswa", "Rp 4.290.000", "bg-purple-600"],
  ["Optimasi Marketplace Shopee & Tokopedia", "198 siswa", "Rp 3.120.000", "bg-red-500"],
  ["Digital Marketing Dasar", "164 siswa", "Rp 2.880.000", "bg-amber-600"]
] as const;

const reviews = [
  ["Rani Amelia", "Penjelasannya sangat mudah dipahami, terima kasih!", "di Meta Ads untuk Pemula", "2 jam yang lalu"],
  ["Putra Wijaya", "Materinya lengkap dan aplikatif.", "di Strategi Konten yang Menjual", "4 jam yang lalu"],
  ["Dewi Lestari", "Sangat membantu untuk pemula seperti saya.", "di TikTok Ads Mastery", "5 jam yang lalu"]
] as const;

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-7">
      <section>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Selamat datang kembali, Hendra! 👋</h1>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
          Kelola kelas, pantau performa, dan bantu siswa berkembang lebih jauh.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_350px]">
        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
          <ClassPerformance />
          <RecentActivity />
        </div>
        <RevenueWidget />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_350px]">
        <div className="space-y-5">
          <MyClassesTable />
          <QuickActions />
        </div>
        <aside className="space-y-5">
          <TopClasses />
          <RecentReviews />
        </aside>
      </section>
    </div>
  );
}

function KpiCard({ label, value, trend, icon: Icon, tone }: (typeof kpis)[number]) {
  const toneClass = {
    red: "bg-red-50 text-[#FF304F]",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-emerald-50 text-emerald-600"
  }[tone];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <div className="flex items-center gap-4">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-1 truncate text-2xl font-black">{value}</p>
        </div>
      </div>
      <p className="mt-4 text-xs font-bold text-emerald-600">Naik {trend}</p>
    </article>
  );
}

function ClassPerformance() {
  const points = [
    ["1 Mei", 28, 16],
    ["", 36, 20],
    ["", 58, 35],
    ["8 Mei", 46, 30],
    ["", 70, 48],
    ["", 42, 33],
    ["15 Mei", 50, 38],
    ["", 66, 42],
    ["", 55, 35],
    ["22 Mei", 62, 50],
    ["", 78, 56],
    ["29 Mei", 88, 64]
  ] as const;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-black">Performa Kelas</h2>
        <button className="h-9 rounded-xl border border-slate-200 px-3 text-xs font-black text-slate-600">30 Hari Terakhir</button>
      </div>
      <div className="mt-5 flex gap-5 text-xs font-black">
        <span className="flex items-center gap-2 text-[#FF304F]"><span className="h-2 w-2 rounded-full bg-[#FF304F]" />Penayangan</span>
        <span className="flex items-center gap-2 text-blue-600"><span className="h-2 w-2 rounded-full bg-blue-600" />Siswa Aktif</span>
      </div>
      <div className="mt-6 h-56 rounded-2xl bg-[linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[length:100%_44px]">
        <div className="flex h-full items-end gap-2 px-2">
          {points.map(([date, views, students], index) => (
            <div key={`${date}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-1">
              <div className="flex items-end justify-center gap-1">
                <span className="w-2 rounded-t-full bg-[#FF304F]" style={{ height: `${views}%` }} />
                <span className="w-2 rounded-t-full bg-blue-600" style={{ height: `${students}%` }} />
              </div>
              <span className="h-5 text-center text-[10px] font-bold text-slate-400">{date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentActivity() {
  const activities = [
    ["Siswa baru mendaftar di kelas Meta Ads untuk Pemula", "2 menit yang lalu", Users, "bg-emerald-50 text-emerald-600"],
    ["Review baru di kelas Strategi Konten yang Menjual", "15 menit yang lalu", Star, "bg-blue-50 text-blue-600"],
    ["Komentar baru di materi Cara Riset Audiens", "1 jam yang lalu", MessageSquare, "bg-purple-50 text-purple-600"],
    ["Penjualan baru di kelas TikTok Ads Mastery", "2 jam yang lalu", WalletCards, "bg-orange-50 text-orange-600"]
  ] as const;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">Aktivitas Terbaru</h2>
        <button className="text-xs font-black text-[#FF304F]">Lihat Semua</button>
      </div>
      <div className="mt-5 divide-y divide-slate-100">
        {activities.map(([title, time, Icon, tone]) => (
          <div key={title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${tone}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-black leading-5">{title}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RevenueWidget() {
  const bars = [36, 48, 44, 52, 38, 68, 59, 50, 84, 72, 68, 56];

  return (
    <section className="rounded-3xl bg-[#07122D] p-5 text-white shadow-2xl shadow-slate-900/20">
      <div className="flex items-center justify-between">
        <h2 className="font-black">Pendapatan</h2>
        <button className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-slate-300">Bulan Ini</button>
      </div>
      <p className="mt-4 text-3xl font-black">Rp 24.560.000</p>
      <p className="mt-2 text-xs font-bold text-red-300">Naik 32.7% dari bulan lalu</p>
      <div className="mt-8 flex h-32 items-end gap-2 border-b border-white/10 pb-2">
        {bars.map((height, index) => (
          <span key={index} className="flex-1 rounded-t-lg bg-gradient-to-t from-[#FF304F] to-red-300" style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[10px] font-bold text-slate-400">
        <span>1 Mei</span>
        <span>15 Mei</span>
        <span>29 Mei</span>
      </div>
    </section>
  );
}

function MyClassesTable() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-black">Kelas Saya</h2>
        <button className="text-xs font-black text-[#FF304F]">Lihat Semua</button>
      </div>
      <div className="mt-5 flex gap-6 border-b border-slate-200 text-sm font-black">
        {["Semua Kelas", "Published", "Draft", "Arsip"].map((tab, index) => (
          <button key={tab} className={`pb-3 ${index === 0 ? "border-b-2 border-[#FF304F] text-[#FF304F]" : "text-slate-500"}`}>{tab}</button>
        ))}
      </div>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-3 pr-4">Kelas</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Siswa</th>
              <th className="px-4 py-3">Penayangan</th>
              <th className="px-4 py-3">Pendapatan</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classRows.map((row) => (
              <tr key={row.title}>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white ${row.color}`}>{row.title.slice(0, 2)}</span>
                    <span className="font-black">{row.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-black ${row.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-black">{row.students}</td>
                <td className="px-4 py-3 font-black">{row.views}</td>
                <td className="px-4 py-3 font-black">{row.revenue}</td>
                <td className="px-4 py-3">
                  <button className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-slate-500">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TopClasses() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">Kelas Terlaris</h2>
        <button className="text-xs font-black text-[#FF304F]">Lihat Semua</button>
      </div>
      <div className="mt-5 space-y-4">
        {topClasses.map(([title, students, revenue, color], index) => (
          <div key={title} className="flex items-center gap-3">
            <span className="w-4 text-sm font-black">{index + 1}</span>
            <span className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white ${color}`}>{title.slice(0, 2)}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black">{title}</p>
              <p className="text-xs font-semibold text-slate-500">{students}</p>
            </div>
            <span className="text-xs font-black">{revenue}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentReviews() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">Review Terbaru</h2>
        <button className="text-xs font-black text-[#FF304F]">Lihat Semua</button>
      </div>
      <div className="mt-5 divide-y divide-slate-100">
        {reviews.map(([name, text, course, time]) => (
          <div key={name} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#07122D] text-xs font-black text-white">{name.slice(0, 2)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-black">{name}</p>
                  <span className="flex text-[#FF304F]">5/5</span>
                </div>
                <p className="mt-1 text-sm leading-5 text-slate-600">{text}</p>
                <div className="mt-1 flex flex-wrap justify-between gap-2 text-xs font-semibold text-slate-500">
                  <span>{course}</span>
                  <span>{time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickActions() {
  const actions = [
    ["Upload Konten", Upload, "bg-blue-50 text-blue-600"],
    ["Buat Kuis", ClipboardCheck, "bg-purple-50 text-purple-600"],
    ["Buat Tugas", FileBarChart, "bg-orange-50 text-orange-600"],
    ["Live Streaming", PlayCircle, "bg-red-50 text-[#FF304F]"],
    ["Pengumuman", MessageSquare, "bg-emerald-50 text-emerald-600"],
    ["Kelola Siswa", Users, "bg-blue-50 text-blue-600"],
    ["Lihat Analytics", BarChart3, "bg-purple-50 text-purple-600"]
  ] as const;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <h2 className="text-lg font-black">Aksi Cepat</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {actions.map(([label, Icon, tone]) => (
          <button key={label} className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black shadow-sm transition hover:border-[#FF304F]/40 hover:shadow-lg">
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-left">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
