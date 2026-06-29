import {
  Award,
  BarChart3,
  CheckCircle2,
  Eye,
  FileBarChart,
  FileQuestion,
  FolderOpen,
  GraduationCap,
  ImageIcon,
  Lock,
  Mail,
  MessageSquare,
  Pencil,
  PlayCircle,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Tag,
  Upload,
  Users,
  WalletCards
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type PageType =
  | "courses"
  | "content"
  | "upload"
  | "categories"
  | "assignments"
  | "certificates"
  | "students"
  | "reviews"
  | "discussions"
  | "analytics"
  | "reports"
  | "revenue"
  | "profile-settings"
  | "account-settings";

const courseRows = [
  ["Meta Ads untuk Pemula", "Published", "512 siswa", "12.450 views", "Rp 12.450.000"],
  ["Strategi Konten yang Menjual", "Published", "345 siswa", "7.820 views", "Rp 7.820.000"],
  ["TikTok Ads Mastery", "Published", "287 siswa", "4.290 views", "Rp 4.290.000"],
  ["Digital Marketing Dasar", "Draft", "164 siswa", "2.880 views", "Rp 2.880.000"]
] as const;

const contentRows = [
  ["Cara Riset Audiens", "Meta Ads untuk Pemula", "Video", "Published"],
  ["Framework Hook Video Pendek", "TikTok Ads Mastery", "Video", "Draft"],
  ["Checklist Campaign Launch", "Strategi Konten yang Menjual", "PDF", "Published"],
  ["Optimasi Listing Marketplace", "Digital Marketing Dasar", "Video", "Published"]
] as const;

const studentRows = [
  ["Rani Amelia", "Meta Ads untuk Pemula", "72%", "Active"],
  ["Putra Wijaya", "Strategi Konten yang Menjual", "45%", "Active"],
  ["Dewi Lestari", "TikTok Ads Mastery", "28%", "Trial"],
  ["Bagus Pratama", "Digital Marketing Dasar", "0%", "Expired"]
] as const;

const pageCopy: Record<PageType, { eyebrow: string; title: string; description: string; icon: LucideIcon }> = {
  courses: {
    eyebrow: "Kelola Konten",
    title: "Kelas Saya",
    description: "List kelas, filter status, pencarian, create, edit, preview, dan akses analytics.",
    icon: GraduationCap
  },
  content: {
    eyebrow: "Materi",
    title: "Konten",
    description: "Kelola materi, video, status draft atau published, dan relasi ke kelas.",
    icon: FolderOpen
  },
  upload: {
    eyebrow: "Upload Studio",
    title: "Upload Content",
    description: "Flow upload seperti YouTube Studio: detail, video, thumbnail, visibility, dan publish.",
    icon: Upload
  },
  categories: {
    eyebrow: "Katalog",
    title: "Kategori",
    description: "Kelola kategori kelas supaya katalog lebih rapi dan mudah ditemukan siswa.",
    icon: Tag
  },
  assignments: {
    eyebrow: "Evaluasi",
    title: "Kuiz & Tugas",
    description: "Buat quiz, tugas, soal pilihan ganda, essay, deadline, dan nilai.",
    icon: FileQuestion
  },
  certificates: {
    eyebrow: "Kelulusan",
    title: "Sertifikat",
    description: "Kelola template sertifikat dan syarat kelulusan setiap kelas.",
    icon: Award
  },
  students: {
    eyebrow: "Kelola Siswa",
    title: "Siswa",
    description: "Pantau siswa, progress, kelas yang diikuti, dan status subscription.",
    icon: Users
  },
  reviews: {
    eyebrow: "Feedback",
    title: "Komentar & Review",
    description: "Kelola review, rating, dan balas ulasan siswa.",
    icon: MessageSquare
  },
  discussions: {
    eyebrow: "Forum",
    title: "Diskusi",
    description: "Pantau pertanyaan siswa dan status belum dijawab atau sudah dijawab.",
    icon: ShieldCheck
  },
  analytics: {
    eyebrow: "Insight",
    title: "Analytics",
    description: "Lihat grafik views, completion rate, retention, dan video terbaik.",
    icon: BarChart3
  },
  reports: {
    eyebrow: "Laporan",
    title: "Laporan",
    description: "Ringkasan performa bulanan untuk kelas, siswa, penjualan, dan engagement.",
    icon: FileBarChart
  },
  revenue: {
    eyebrow: "Finance",
    title: "Pendapatan",
    description: "Pantau grafik pendapatan, riwayat transaksi, dan payout.",
    icon: WalletCards
  },
  "profile-settings": {
    eyebrow: "Profil",
    title: "Pengaturan Profil",
    description: "Atur nama pengajar, foto, bio, keahlian, dan sosial media.",
    icon: Settings
  },
  "account-settings": {
    eyebrow: "Akun",
    title: "Pengaturan Akun",
    description: "Kelola email, password, keamanan, notifikasi, dan logout.",
    icon: Lock
  }
};

export function TeacherMenuPage({ type }: { type: PageType }) {
  const copy = pageCopy[type];
  const Icon = copy.icon;

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#FF304F]">{copy.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{copy.title}</h1>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-600">{copy.description}</p>
        </div>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#FF304F] shadow-xl shadow-slate-900/5">
          <Icon className="h-6 w-6" />
        </span>
      </section>

      {renderPageContent(type)}
    </div>
  );
}

function renderPageContent(type: PageType) {
  if (type === "courses") return <CoursesContent />;
  if (type === "content") return <ContentContent />;
  if (type === "upload") return <UploadContent />;
  if (type === "categories") return <CategoriesContent />;
  if (type === "assignments") return <AssignmentsContent />;
  if (type === "certificates") return <CertificatesContent />;
  if (type === "students") return <StudentsContent />;
  if (type === "reviews") return <ReviewsContent />;
  if (type === "discussions") return <DiscussionsContent />;
  if (type === "analytics") return <AnalyticsContent />;
  if (type === "reports") return <ReportsContent />;
  if (type === "revenue") return <RevenueContent />;
  if (type === "profile-settings") return <ProfileSettingsContent />;
  return <AccountSettingsContent />;
}

function Toolbar({ action }: { action: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <label className="relative min-w-0 flex-1 sm:max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 text-sm font-semibold outline-none focus:border-[#FF304F]" placeholder="Cari data..." />
      </label>
      <div className="flex gap-2">
        {["Published", "Draft", "Archived"].map((item, index) => (
          <button key={item} className={`h-10 rounded-xl px-4 text-sm font-black ${index === 0 ? "bg-[#07122D] text-white" : "bg-slate-100 text-slate-600"}`}>
            {item}
          </button>
        ))}
      </div>
      <button className="h-10 rounded-xl bg-[#FF304F] px-5 text-sm font-black text-white shadow-lg shadow-red-500/20">{action}</button>
    </div>
  );
}

function CoursesContent() {
  return (
    <>
      <Toolbar action="Create Kelas" />
      <Panel title="Daftar Kelas">
        <ResponsiveTable
          headers={["Kelas", "Status", "Siswa", "Preview", "Analytics", "Aksi"]}
          rows={courseRows.map(([title, status, students, views, revenue]) => [
            title,
            <Badge key={`${title}-status`} label={status} tone={status === "Published" ? "green" : "amber"} />,
            students,
            <IconButton key={`${title}-preview`} icon={Eye} label="Preview" />,
            <span key={`${title}-analytics`} className="font-black">{views}</span>,
            <div key={`${title}-actions`} className="flex gap-2"><IconButton icon={Pencil} label="Edit" /><span className="text-xs font-black text-slate-500">{revenue}</span></div>
          ])}
        />
      </Panel>
    </>
  );
}

function ContentContent() {
  return (
    <>
      <Toolbar action="Upload Konten" />
      <Panel title="Materi dan Video">
        <ResponsiveTable
          headers={["Judul", "Kelas", "Tipe", "Status", "Aksi"]}
          rows={contentRows.map(([title, course, type, status]) => [
            title,
            course,
            type,
            <Badge key={`${title}-status`} label={status} tone={status === "Published" ? "green" : "amber"} />,
            <div key={`${title}-actions`} className="flex gap-2"><IconButton icon={Eye} label="Preview" /><IconButton icon={Pencil} label="Edit" /></div>
          ])}
        />
      </Panel>
    </>
  );
}

function UploadContent() {
  const steps = [
    ["Detail", "Judul, deskripsi, dan kelas tujuan.", CheckCircle2],
    ["Video", "Upload file video utama dan cek durasi.", PlayCircle],
    ["Thumbnail", "Pilih thumbnail atau upload gambar custom.", ImageIcon],
    ["Visibility", "Draft, scheduled, private, atau published.", Lock],
    ["Publish", "Review final lalu publish ke siswa.", Send]
  ] as const;

  return (
    <section className="grid gap-5 xl:grid-cols-[360px_1fr]">
      <Panel title="Upload Flow">
        <div className="space-y-3">
          {steps.map(([title, desc, Icon], index) => (
            <div key={title} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${index === 0 ? "bg-[#FF304F] text-white" : "bg-white text-slate-500"}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-black">{index + 1}. {title}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Detail Konten">
        <div className="grid gap-4">
          <Input label="Judul konten" value="Cara Riset Audiens untuk Iklan Meta" />
          <Textarea label="Deskripsi" value="Materi ini membantu siswa memahami segmentasi audiens, interest, dan testing kreatif." />
          <Select label="Pilih kelas" value="Meta Ads untuk Pemula" />
          <div className="grid gap-4 sm:grid-cols-2">
            <UploadBox title="Upload Video" icon={Upload} />
            <UploadBox title="Upload Thumbnail" icon={ImageIcon} />
          </div>
          <button className="h-11 rounded-xl bg-[#FF304F] px-5 text-sm font-black text-white shadow-lg shadow-red-500/20">Publish Konten</button>
        </div>
      </Panel>
    </section>
  );
}

function CategoriesContent() {
  return (
    <Panel title="Kategori Kelas">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Digital Marketing", "Content Strategy", "Marketplace", "Paid Ads", "Social Media", "Branding"].map((item, index) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-black">{item}</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">{12 - index} kelas aktif</p>
            <button className="mt-4 h-9 rounded-xl bg-slate-100 px-4 text-xs font-black text-slate-600">Edit Kategori</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AssignmentsContent() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Panel title="Quiz dan Tugas">
        <ResponsiveTable
          headers={["Judul", "Tipe", "Deadline", "Soal", "Status"]}
          rows={[
            ["Quiz Funnel Ads", "Pilihan ganda", "24 Mei 2026", "20 soal", <Badge key="q1" label="Published" tone="green" />],
            ["Essay Riset Audiens", "Essay", "28 Mei 2026", "5 soal", <Badge key="q2" label="Draft" tone="amber" />],
            ["Tugas Campaign Plan", "Upload file", "2 Jun 2026", "Rubrik nilai", <Badge key="q3" label="Published" tone="green" />]
          ]}
        />
      </Panel>
      <Panel title="Buat Evaluasi">
        <Input label="Judul" value="Quiz Meta Ads Dasar" />
        <Select label="Tipe soal" value="Pilihan ganda" />
        <Input label="Deadline" value="30 Juni 2026" />
        <Textarea label="Instruksi" value="Kerjakan semua soal, nilai minimal 80 untuk lulus modul." />
        <button className="mt-4 h-11 w-full rounded-xl bg-[#FF304F] text-sm font-black text-white">Simpan Quiz</button>
      </Panel>
    </section>
  );
}

function CertificatesContent() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Panel title="Template Sertifikat">
        <div className="grid gap-4 md:grid-cols-3">
          {["Classic Navy", "Red Premium", "Minimal White"].map((item) => (
            <div key={item} className="aspect-[4/3] rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="h-full rounded-xl border-2 border-dashed border-slate-300 bg-white p-4">
                <p className="font-black">{item}</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">Red and Blue Creative Academy</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Syarat Kelulusan">
        <Input label="Minimal completion" value="90%" />
        <Input label="Nilai quiz minimal" value="80" />
        <Input label="Tugas wajib selesai" value="Semua tugas utama" />
        <button className="mt-4 h-11 w-full rounded-xl bg-[#07122D] text-sm font-black text-white">Simpan Syarat</button>
      </Panel>
    </section>
  );
}

function StudentsContent() {
  return (
    <Panel title="Daftar Siswa">
      <ResponsiveTable
        headers={["Siswa", "Kelas", "Progress", "Subscription", "Aksi"]}
        rows={studentRows.map(([name, course, progress, status]) => [
          name,
          course,
          <ProgressBar key={`${name}-progress`} value={Number(progress.replace("%", ""))} />,
          <Badge key={`${name}-status`} label={status} tone={status === "Active" ? "green" : status === "Trial" ? "blue" : "red"} />,
          <IconButton key={`${name}-mail`} icon={Mail} label="Email" />
        ])}
      />
    </Panel>
  );
}

function ReviewsContent() {
  return (
    <Panel title="Review dan Komentar">
      <div className="space-y-4">
        {["Penjelasannya sangat mudah dipahami.", "Materi lengkap dan aplikatif.", "Mohon tambah contoh campaign lokal."].map((text, index) => (
          <div key={text} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-black">Review #{index + 1}</p>
                <p className="mt-1 text-sm text-[#FF304F]">Rating {index === 2 ? "4" : "5"} / 5</p>
              </div>
              <button className="h-9 rounded-xl bg-[#07122D] px-4 text-xs font-black text-white">Balas Review</button>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DiscussionsContent() {
  return (
    <Panel title="Forum Diskusi">
      <ResponsiveTable
        headers={["Pertanyaan", "Kelas", "Status", "Terakhir"]}
        rows={[
          ["Bagaimana menentukan budget awal Meta Ads?", "Meta Ads untuk Pemula", <Badge key="d1" label="Belum dijawab" tone="red" />, "5 menit lalu"],
          ["Apa perbedaan hook dan CTA?", "Strategi Konten", <Badge key="d2" label="Sudah dijawab" tone="green" />, "1 jam lalu"],
          ["Kapan waktu terbaik upload TikTok?", "TikTok Ads Mastery", <Badge key="d3" label="Belum dijawab" tone="red" />, "3 jam lalu"]
        ]}
      />
    </Panel>
  );
}

function AnalyticsContent() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Panel title="Grafik Performa">
        <DummyBars labels={["Views", "Completion", "Retention", "Best Video"]} values={[88, 64, 52, 76]} />
      </Panel>
      <Panel title="Video Terbaik">
        {["Cara Riset Audiens", "Struktur Campaign Meta Ads", "Testing Creative"].map((item, index) => (
          <MetricRow key={item} label={item} value={`${8 - index}.2k views`} />
        ))}
      </Panel>
    </section>
  );
}

function ReportsContent() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        ["Kelas aktif", "12", "Naik 2 bulan ini"],
        ["Completion rate", "68%", "Stabil"],
        ["Revenue", "Rp 24.560.000", "Naik 32.7%"],
        ["Review rata-rata", "4.8/5", "312 review"]
      ].map(([label, value, meta]) => (
        <SummaryCard key={label} label={label} value={value} meta={meta} />
      ))}
    </section>
  );
}

function RevenueContent() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <Panel title="Grafik Pendapatan">
        <DummyBars labels={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"]} values={[34, 48, 42, 62, 78, 90]} />
      </Panel>
      <Panel title="Riwayat Transaksi & Payout">
        <MetricRow label="Payout berikutnya" value="Rp 18.500.000" />
        <MetricRow label="Transaksi berhasil" value="184" />
        <MetricRow label="Refund" value="3" />
        <button className="mt-4 h-11 w-full rounded-xl bg-[#FF304F] text-sm font-black text-white">Ajukan Payout</button>
      </Panel>
    </section>
  );
}

function ProfileSettingsContent() {
  return (
    <section className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <Panel title="Foto Pengajar">
        <div className="grid place-items-center rounded-3xl bg-slate-50 p-8">
          <span className="grid h-28 w-28 place-items-center rounded-full bg-[#07122D] text-3xl font-black text-white">HD</span>
          <button className="mt-5 h-10 rounded-xl bg-[#FF304F] px-5 text-sm font-black text-white">Upload Foto</button>
        </div>
      </Panel>
      <Panel title="Profil Publik">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nama pengajar" value="Hendra Darmawan" />
          <Input label="Keahlian" value="Digital Marketing, Meta Ads" />
          <Input label="Instagram" value="@hendradarmawan" />
          <Input label="LinkedIn" value="linkedin.com/in/hendra" />
          <div className="md:col-span-2">
            <Textarea label="Bio" value="Pengajar digital marketing dengan fokus pada growth, paid ads, dan strategi konten." />
          </div>
        </div>
      </Panel>
    </section>
  );
}

function AccountSettingsContent() {
  return (
    <section className="grid gap-5 xl:grid-cols-3">
      <Panel title="Email & Password">
        <Input label="Email" value="hendra@redandblue.id" />
        <Input label="Password" value="************" />
        <button className="mt-4 h-10 rounded-xl bg-[#07122D] px-5 text-sm font-black text-white">Update Login</button>
      </Panel>
      <Panel title="Keamanan">
        <Toggle label="Two-factor authentication" />
        <Toggle label="Login alert" />
        <Toggle label="Device approval" />
      </Panel>
      <Panel title="Notifikasi & Logout">
        <Toggle label="Email notification" />
        <Toggle label="Komentar siswa" />
        <button className="mt-4 h-10 rounded-xl bg-[#FF304F] px-5 text-sm font-black text-white">Logout</button>
      </Panel>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <h2 className="text-lg font-black">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-slate-500">
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3 first:pl-0">{header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-4 first:pl-0 font-semibold">{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ label, tone }: { label: string; tone: "green" | "amber" | "red" | "blue" }) {
  const className = {
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-[#FF304F]",
    blue: "bg-blue-50 text-blue-600"
  }[tone];

  return <span className={`rounded-full px-2.5 py-1 text-xs font-black ${className}`}>{label}</span>;
}

function IconButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <button className="inline-flex h-9 items-center gap-2 rounded-xl bg-slate-50 px-3 text-xs font-black text-slate-600">
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function Input({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-sm font-black">
      {label}
      <input defaultValue={value} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:border-[#FF304F]" />
    </label>
  );
}

function Textarea({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-sm font-black">
      {label}
      <textarea defaultValue={value} className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-[#FF304F]" />
    </label>
  );
}

function Select({ label, value }: { label: string; value: string }) {
  return (
    <label className="block text-sm font-black">
      {label}
      <select defaultValue={value} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none focus:border-[#FF304F]">
        <option>{value}</option>
        <option>Strategi Konten yang Menjual</option>
        <option>TikTok Ads Mastery</option>
      </select>
    </label>
  );
}

function UploadBox({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <button className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#FF304F] shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-3 block font-black">{title}</span>
      <span className="text-xs font-semibold text-slate-500">Klik untuk upload file</span>
    </button>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="min-w-36">
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[#FF304F]" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-1 text-xs font-black text-slate-500">{value}%</p>
    </div>
  );
}

function DummyBars({ labels, values }: { labels: string[]; values: number[] }) {
  return (
    <div className="flex h-72 items-end gap-3 rounded-2xl bg-slate-50 p-5">
      {values.map((value, index) => (
        <div key={labels[index]} className="flex h-full flex-1 flex-col justify-end gap-2">
          <span className="rounded-t-xl bg-gradient-to-t from-[#FF304F] to-red-300" style={{ height: `${value}%` }} />
          <span className="text-center text-xs font-black text-slate-500">{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
      <span className="font-semibold text-slate-600">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}

function SummaryCard({ label, value, meta }: { label: string; value: string; meta: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{meta}</p>
    </article>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <button className="mt-3 flex h-11 w-full items-center justify-between rounded-2xl bg-slate-50 px-4 text-sm font-black">
      {label}
      <span className="h-5 w-9 rounded-full bg-[#FF304F] p-0.5">
        <span className="block h-4 w-4 translate-x-4 rounded-full bg-white" />
      </span>
    </button>
  );
}
