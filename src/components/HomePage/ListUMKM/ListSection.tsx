import React from "react";
import ListCard from "@/components/HomePage/ListUMKM/ListCard";
import { umkmList } from "@/data/umkmList";
import CircleExpandButton from "@/components/button/PrimaryButton";

const ListSection = () => {
  const topUMKMs = umkmList
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);
  return (
    <div className="min-h-screen bg-transparent py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

      <div className="w-full h-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-5 xl:col-span-6">
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <p className="font-geist-mono text-xs sm:text-xl text-[#19395F] tracking-wider">
                [ TOP UMKM ]
              </p>
            </div>
            <div className="lg:sticky lg:top-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black text-[#081F36] mb-4 sm:mb-5 lg:mb-6 leading-tight max-w-full lg:max-w-[90%]">
                MENJADI WADAH BAGI UMKM TERBAIK NEGERI
              </h2>

              <p className="text-[#515151] text-base sm:text-lg lg:text-base xl:text-lg leading-relaxed mb-6 sm:mb-8 max-w-full lg:max-w-[85%]">
                Temukan deretan UMKM yang paling banyak diminati dan mendapat
                ulasan positif. Dukung mereka dengan mengenal produk serta kisah
                di balik usahanya.
              </p>

              <CircleExpandButton href="/directory" className="max-w-[210px]" />
            </div>
          </div>

          {/* Right Content - UMKM List */}
          <div className="w-full lg:col-span-7 xl:col-span-6">
            <div className="space-y-4 sm:space-y-6">
              {topUMKMs.map((umkm, index) => (
                <ListCard key={umkm.id} umkm={umkm} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSection;
