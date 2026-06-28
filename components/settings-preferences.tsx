"use client";

import { Languages, Monitor, Palette, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const languages = ["Indonesia", "English"];
const displays = ["Default", "Compact", "Comfort"];

export function SettingsPreferences() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("Indonesia");
  const [display, setDisplay] = useState("Default");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const storedLanguage = window.localStorage.getItem("language");
    const storedDisplay = window.localStorage.getItem("display");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme === "dark" || (!storedTheme && prefersDark) ? "dark" : "light";

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedDisplay) setDisplay(storedDisplay);
  }, []);

  function updateTheme(value: "light" | "dark") {
    document.documentElement.classList.toggle("dark", value === "dark");
    window.localStorage.setItem("theme", value);
    setTheme(value);
  }

  function updateLanguage(value: string) {
    window.localStorage.setItem("language", value);
    setLanguage(value);
  }

  function updateDisplay(value: string) {
    window.localStorage.setItem("display", value);
    setDisplay(value);
  }

  return (
    <div className="space-y-4">
      <SettingPanel icon={<Palette className="h-5 w-5" />} title="Tema" value={theme === "dark" ? "Gelap" : "Terang"}>
        <div className="grid grid-cols-2 gap-2 sm:w-80">
          <SegmentButton active={theme === "light"} onClick={() => updateTheme("light")}>
            Terang
          </SegmentButton>
          <SegmentButton active={theme === "dark"} onClick={() => updateTheme("dark")}>
            Gelap
          </SegmentButton>
        </div>
      </SettingPanel>

      <SettingPanel icon={<Languages className="h-5 w-5" />} title="Bahasa" value={language}>
        <div className="grid gap-2 sm:grid-cols-2">
          {languages.map((item) => (
            <SegmentButton key={item} active={language === item} onClick={() => updateLanguage(item)}>
              {item}
            </SegmentButton>
          ))}
        </div>
      </SettingPanel>

      <SettingPanel icon={<Monitor className="h-5 w-5" />} title="Tampilan" value={display}>
        <div className="grid gap-2 sm:grid-cols-3">
          {displays.map((item) => (
            <SegmentButton key={item} active={display === item} onClick={() => updateDisplay(item)}>
              {item}
            </SegmentButton>
          ))}
        </div>
      </SettingPanel>

      <SettingPanel icon={<Settings className="h-5 w-5" />} title="Pengaturan umum" value="Aktif">
        <div className="grid gap-3 sm:grid-cols-2">
          <ToggleRow title="Email update" storageKey="setting-email-update" />
          <ToggleRow title="Course reminder" storageKey="setting-course-reminder" />
        </div>
      </SettingPanel>
    </div>
  );
}

function SettingPanel({
  icon,
  title,
  value,
  children
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-panel dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-red-50 text-red-500 dark:bg-red-500/10">{icon}</span>
          <div>
            <h2 className="font-semibold text-ink dark:text-slate-100">{title}</h2>
            <p className="mt-1 text-sm text-muted">{value}</p>
          </div>
        </div>
        <div className="w-full sm:w-auto">{children}</div>
      </div>
    </section>
  );
}

function SegmentButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-md border px-4 text-sm font-semibold transition",
        active
          ? "border-red-500 bg-red-500 text-white"
          : "border-line bg-white text-slate-700 hover:border-red-500 hover:text-red-500 dark:border-white/15 dark:bg-white/5 dark:text-slate-200"
      )}
    >
      {children}
    </button>
  );
}

function ToggleRow({ title, storageKey }: { title: string; storageKey: string }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) setEnabled(stored === "true");
  }, [storageKey]);

  function toggle() {
    const nextValue = !enabled;
    window.localStorage.setItem(storageKey, String(nextValue));
    setEnabled(nextValue);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-11 items-center justify-between rounded-md border border-line bg-gray-50 px-3 text-sm font-semibold text-ink transition hover:border-red-500 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
    >
      {title}
      <span className={cn("h-5 w-9 rounded-full p-0.5 transition", enabled ? "bg-red-500" : "bg-gray-300")}>
        <span className={cn("block h-4 w-4 rounded-full bg-white transition", enabled ? "translate-x-4" : "translate-x-0")} />
      </span>
    </button>
  );
}
