import React from "react";
import Link from "next/link";
import { Coffee, Shirt, Palette, Sparkles, Laptop, Leaf } from "lucide-react";

// Types
interface Category {
  id: number;
  title: string;
  categoryDescriptions: string;
  description: string;
  icon: string;
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

// Icon mapping
const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Coffee,
  Shirt,
  Palette,
  Sparkles,
  Laptop,
  Leaf,
};

// CategoryCard Component (Reusable)
const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const Icon = iconMap[category.icon] ?? Coffee;

  return (
    <div
      className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 group animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* wrap clickable area with Link -> navigasi ke pageListUmkm dengan query */}
      <Link
        href={`/Directory?category=${encodeURIComponent(category.title)}`}
        className="block"
        aria-label={`Lihat UMKM kategori ${category.title}`}
      >
        <div className="relative rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 h-60 sm:h-64 md:h-72 lg:h-80 transition-all duration-500 ease-out cursor-pointer sm:bg-white md:bg-white lg:bg-white bg-[#2a9df4] hover:bg-[#2a9df4] shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-2">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 right-0 w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-white/5 rounded-full blur-lg"></div>
          </div>

          {/* Icon Container */}
          <div className="mb-4 sm:mb-5 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl sm:bg-gray-100 md:bg-gray-100 lg:bg-gray-100 bg-white/20 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500">
              <Icon
                aria-label="Lihat Kategori"
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 sm:text-[#2a9df4] md:text-[#2a9df4] lg:text-[#2a9df4] text-white group-hover:text-white transition-colors duration-300"
                strokeWidth={2}
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full h-full flex flex-col items-start justify-between mb-3 z-10">
            <div className="mb-[-20px]">
              <h3 className="text-lg font-anton sm:text-xl md:text-3xl md:text-black lg:text-black text-white mb-2 sm:mb-2 md:mb-2 group-hover:text-white transition-colors duration-300 leading-tight">
                {category.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed sm:text-gray-400 md:text-gray-400 lg:text-gray-400 text-white/60 group-hover:text-white/60 transition-colors duration-300">
                {category.description}
              </p>
            </div>
            {/* Category Description */}
            <p
              className="font-geist-mono font-medium text-xs sm:text-sm md:text-base leading-relaxed sm:text-[#515151] md:text-[#515151] lg:text-[#515151] text-white/90 group-hover:text-white/90 transition-colors duration-300"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {category.categoryDescriptions}
            </p>
            <div></div>
            <div></div>
          </div>

          {/* Animated Bottom Border */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-white/50 to-white transition-all duration-500 w-0 group-hover:w-full"></div>

          {/* Corner Accent with Pulse */}
          <div className="absolute top-6 right-6">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#2a9df4] group-hover:bg-white transition-all duration-500 group-hover:scale-150"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#2a9df4] group-hover:bg-white opacity-0 group-hover:opacity-50 group-hover:scale-[2] transition-all duration-700"></div>
            </div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CategoryCard;
