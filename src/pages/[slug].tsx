import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import UMKMDetailPage from "@/components/DetailPage/UMKMDetailPage";
import { umkmList } from "@/data/umkmList";
import type { Umkm } from "@/pages/api/umkm";
import { Geist, Geist_Mono } from "next/font/google";

interface DetailPageProps {
  umkm: Umkm | null;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DetailPage({ umkm }: DetailPageProps) {
  // Jika UMKM tidak ditemukan
  if (!umkm) {
    return (
      <div
        className={`${geistSans.className} ${geistMono.className} min-h-screen flex items-center justify-center bg-gray-50`}
      >
        <div className="text-center px-4">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            UMKM Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Maaf, UMKM yang Anda cari tidak tersedia atau mungkin sudah tidak
            aktif.
          </p>
          <Link
            href="/Directory"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Directory
          </Link>
        </div>
      </div>
    );
  }

  // Render halaman detail UMKM
  return <UMKMDetailPage umkm={umkm} />;
}

// Generate static paths untuk semua UMKM slugs
export const getStaticPaths: GetStaticPaths = async () => {
  // Generate path untuk setiap UMKM berdasarkan slug
  const paths = umkmList.map((umkm) => ({
    params: { slug: umkm.slug },
  }));

  return {
    paths,
    // fallback: false = 404 jika slug tidak ada di paths
    // fallback: 'blocking' = generate page on-demand jika slug baru
    fallback: "blocking",
  };
};

// Fetch data UMKM berdasarkan slug
export const getStaticProps: GetStaticProps<DetailPageProps> = async ({
  params,
}) => {
  // Get slug from params
  const slug = params?.slug as string;

  // Find UMKM by slug
  const umkm = umkmList.find((item) => item.slug === slug);

  // Jika UMKM tidak ditemukan, return 404
  if (!umkm) {
    return {
      notFound: true,
    };
  }

  // Return UMKM data as props
  return {
    props: {
      umkm,
    },
    // ISR: Revalidate setiap 60 detik (optional)
    revalidate: 60,
  };
};
