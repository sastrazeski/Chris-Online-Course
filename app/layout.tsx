import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CourseStack",
  description: "A Next.js, Supabase, and Midtrans online course platform"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
