import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red and Blue Creative Agency",
  description: "Company profile digital marketing agency Red and Blue"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
