import type { AppProps } from "next/app";
import { Anton, Inter, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useGSAP } from "@gsap/react";

const ElasticCursor = dynamic(
  () => import("@/components/cursor/ElasticCursor"),
  {
    ssr: false, // Disable server-side rendering
  }
);
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <div
        className={`${anton.variable} ${inter.variable} ${geistMono.variable}`}
      >
        <Component {...pageProps} />
      </div>
      <ElasticCursor />
    </>
  );
}
