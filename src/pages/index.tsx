import { Geist, Geist_Mono } from "next/font/google";
import HomeSection from "@/components/HomePage/HomeSection";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} left-0 w-full h-full min-h-screen `}
    >
      <HomeSection />
    </div>
  );
}
