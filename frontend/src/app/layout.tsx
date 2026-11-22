import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InitialSplashLoader } from "@/components/ui/InitialSplashLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://doomsday-backend1.vercel.app";

export const metadata: Metadata = {
  title: "Doomsday Ready — Cinematic Watch-Party & Rewatch Planner",
  description:
    "Browse the watch-party catalog, build prerequisite-aware rewatch orders, and calculate cinema group bundle quotes.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#050505] text-zinc-50 selection:bg-red-500/30 selection:text-red-200 overflow-x-hidden">
        <InitialSplashLoader durationMs={1500} />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
