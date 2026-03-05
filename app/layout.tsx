import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZHE 哲 | The Flow Martial Arts School",
  description: "Master the kinetic poetry of movement and discipline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="selection:bg-zhe-red selection:text-white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>

        {/* PHYSICAL PARCHMENT TEXTURE: Fixed overlay to break digital flatness */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] bg-parchment-grain mix-blend-multiply" />

        <SmoothScroll>
          {/* THE ZHE SHADOW: Kinetic cursor following the user's path */}
          <CustomCursor />

          {/* MINIMALIST HUD: Floating navigation */}
          <Navbar />

          <main className="relative">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}