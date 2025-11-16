// components/DetailPage/UmkmSuggestions.tsx

"use client"; // Diperlukan untuk hook

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";
import { umkmList } from "@/data/umkmList";
import UmkmCard from "@/components/DetailPage/Suggest/UmkmCard";
import type { Umkm, Category } from "@/pages/api/umkm";
import CircleExpandButton from "@/components/button/PrimaryButton";

interface UmkmSuggestionsProps {
  currentSlug: string;
  limit?: number;
  category?: Category | null;
}

const UmkmSuggestions: React.FC<UmkmSuggestionsProps> = ({
  currentSlug,
  limit = 3,
  category = null,
}) => {
  const [suggestions, setSuggestions] = useState<Umkm[]>([]);
  const router = useRouter();

  useEffect(() => {
    let filtered = umkmList.filter((umkm) => umkm.slug !== currentSlug);

    if (category) {
      filtered = filtered.filter((umkm) => umkm.categories.includes(category));
    }

    if (filtered.length === 0) {
      filtered = umkmList.filter((umkm) => umkm.slug !== currentSlug);
    }

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    setSuggestions(shuffled.slice(0, limit));
  }, [currentSlug, limit, category]);

  const handleViewAll = () => {
    router.push("/directory");
  };

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-geist-mono">
              JELAJAHI UMKM LAIN
            </h2>
            <p className="text-gray-600 text-lg">
              Temukan UMKM lokal lainnya yang mungkin Anda suka
            </p>
          </div>

          <CircleExpandButton className="max-w-[210px]" />
        </div>

        {/* Grid UMKM Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 9. Render UmkmCard (tanpa onVisit, karena card sudah jadi Link) */}
          {suggestions.map((umkm) => (
            <UmkmCard key={umkm.id} umkm={umkm} />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden text-center">
          <button
            onClick={handleViewAll} // 10. Gunakan handler
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            LIHAT LAINNYA
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UmkmSuggestions;
