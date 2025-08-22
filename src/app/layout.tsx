import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/Top";

export const metadata: Metadata = { title: "PSP Dashboard", description: "Student dashboard" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-black">
        <main className="px-4 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
