import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "PSP Dashboard", description: "Student dashboard" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body>{children}</body>
    </html>
  );
}
