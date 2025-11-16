// components/Directory/UmkmCard.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Umkm } from "@/pages/api/umkm";

interface UmkmCardProps {
  umkm: Umkm;
  style?: React.CSSProperties;
  className?: string;
}

const UmkmCard: React.FC<UmkmCardProps> = ({ umkm, style, className = "" }) => {
  return (
    <Link
      href={`/${umkm.slug}`}
      style={style}
      className={`group bg-transparent rounded-2xl shadow-md sm:shadow-none shadow-[#2A9DF4] h-full overflow-hidden ${className}`}
    >
      <div className="relative h-full group flex flex-col bg-transparent rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up cursor-pointer">
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            width={400}
            height={400}
            src={umkm.photos[0]}
            alt={umkm.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=350&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-sm font-semibold text-gray-800">
              {umkm.averageRating}
            </span>
          </div>
        </div>
        {/* ContentContainer */}
        <div className="flex flex-1 flex-col p-3">
          <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
            {umkm.categories.join(" · ")}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2A9DF4] transition-colors line-clamp-2">
            {umkm.name}
          </h3>
          <div
            className="relative overflow-hidden"
            style={{ minHeight: "2.5rem" }}
          >
            <p className="md:hidden text-sm text-gray-600 italic line-clamp-2">
              {umkm.tagline}
            </p>

            {/* Desktop: Show on Hover dengan Smooth Animation */}
            <div className="hidden md:block">
              <p className="text-sm text-gray-600 italic line-clamp-2 transition-all duration-300 transform group-hover:translate-y-0 group-hover:opacity-100 translate-y-2 opacity-0">
                {umkm.tagline}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[2px] bg-[#2A9DF4]"></div>
      </div>
    </Link>
  );
};

export default UmkmCard;
