import { Geist, Geist_Mono } from "next/font/google";
import DirectorySection from "@/components/Directory/DirectorySection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Directory() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} left-0 w-full h-full min-h-screen `}
    >
      <DirectorySection />
    </div>
  );
}
