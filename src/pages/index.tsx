import { Geist, Geist_Mono } from "next/font/google";
import HomeSection from "./HomePage/HomeSection";

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
