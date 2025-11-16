import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface UMKM {
  id: number;
  slug: string;
  name: string;
  tagline?: string;
  categories: string[];
  description: string;
  photos: string[];
  averageRating?: number;
}

interface UMKMCardProps {
  umkm: UMKM;
  index: number;
}

const ListCard: React.FC<UMKMCardProps> = ({ umkm, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex flex-col gap-9 pb-9">
      <div
        className="group relative overflow-hidden rounded-xl cursor-pointer animate-fadeInRight"
        style={{ animationDelay: `${index * 150}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <style>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center md:items-center lg:items-center gap-4 sm:gap-6 md:gap-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-4 sm:p-0">
          {/* Content */}
          <div className="flex-1 py-2 relative overflow-hidden w-full">
            <h3 className="font-anton text-2xl sm:text-2xl md:text-3xl font-normal text-[#161D04] mb-3 sm:mb-4 group-hover:text-[#2A9DF4] transition-colors duration-500 line-clamp-2">
              {umkm.name}
            </h3>
            <p className="text-[#515151] font-geist-mono text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 md:mb-8 line-clamp-3 sm:line-clamp-3">
              {umkm.description}
            </p>

            {/* Buttons Container */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative min-h-[44px]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href={`/${umkm.slug}`}
                  className={`inline-block transition-all duration-500 ease-out ${
                    isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8 pointer-events-none"
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                >
                  <button className="px-4 sm:px-6 py-2 sm:py-2.5 cursor-pointer bg-white border-2 border-[#161D04] text-[#161D04] rounded-full font-semibold hover:bg-[#161D04] hover:text-white transition-all duration-300 whitespace-nowrap text-sm sm:text-base">
                    LIHAT DETAIL
                  </button>
                </Link>
                <span
                  className={`inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-200 text-gray-800 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-500 ease-out ${
                    isHovered
                      ? "opacity-100 translate-x-0 delay-75"
                      : "opacity-0 -translate-x-8"
                  }`}
                >
                  {umkm.categories[0]}
                </span>
              </div>
              {/* Default Category Tag - Fades out on hover */}
              <span
                className={`absolute left-0 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-200 text-gray-800 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? "opacity-0 translate-x-4 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                {umkm.categories[0]}
              </span>
            </div>
          </div>
          <Link href={`/${umkm.slug}`} className="w-full sm:w-auto">
            <div className="relative flex-shrink-0 w-full h-52 sm:w-52 md:w-52 lg:w-52 rounded-xl overflow-hidden">
              <Image
                width={80}
                height={80}
                src={umkm.photos[0]}
                alt={umkm.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`transition-all duration-500 ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full h-[2px] rounded-full bg-[#e2e2e2]"></div>
    </div>
  );
};
export default ListCard;
