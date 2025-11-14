import DomeGallery from "@/components/domeGallery/DomeGallery";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full h-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      <div className="top-section w-full mt-2 sm:mt-10 md:mt-12 lg:mt-14 flex flex-col items-center gap-6 sm:gap-8">
        <div className="top-content w-full flex flex-col px-4 sm:px-4 md:px-16 lg:px-16 xl:px-32 items-center gap-3 sm:gap-4">
          <h2 className="uppercase text-[#081F36] font-anton font-normal tracking-[-2%] text-center text-[18px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] leading-[120%]">
            Temukan & Dukung UMKM Lokal di Sekitarmu Jelajahi berbagai usaha
            kecil yang tumbuh di daerahmu
          </h2>
          <p className="font-inter sm:w-11/12 md:w-10/12 lg:w-9/12 max-w-4xl text-[#515151] text-[10px] sm:text-base md:text-lg lg:text-[18px] leading-[150%] tracking-[-0.02em] text-center font-medium break-words">
            Jelajahi berbagai usaha kecil di sekitar kamu, dari kuliner rumahan
            hingga produk kreatif. Setiap dukunganmu membantu bisnis lokal
            berkembang dan memperkuat ekonomi masyarakat.
          </p>
        </div>
        <div className="bot-content w-full flex items-center justify-center flex-col sm:flex-row gap-3 sm:gap-2 sm:w-auto px-2 sm:px-0">
          <Link
            href={"/Directory"}
            passHref
            className="w-full sm:w-auto min-w-0"
          >
            <button className="w-full primary-button sm:w-auto min-w-0 px-6 sm:px-8 py-2 sm:py-3.5 uppercase font-geist-mono text-sm sm:text-base lg:text-[16px] bg-[#13569C] text-white rounded-full tracking-[-0.02em] hover:bg-[#0f4580] transition-colors duration-200 active:scale-95 whitespace-nowrap">
              Jelajahi UMKM
            </button>
          </Link>
          <button className="w-full sm:w-auto min-w-0 px-6 sm:px-8 py-2 sm:py-3.5 uppercase font-geist-mono text-sm sm:text-base lg:text-[16px] rounded-full bg-[#FFF] border border-[#161D04] tracking-[-0.02em] hover:bg-gray-50 transition-colors duration-200 active:scale-95 whitespace-nowrap">
            Lihat Kategori
          </button>
        </div>
      </div>
      <div className="bot-section mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 w-full max-w-full">
        <div className="w-full h-[40vh] sm:h-[50vh] md:h-[50vh] lg:h-[60vh] xl:h-[90vh] overflow-hidden">
          <DomeGallery />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
