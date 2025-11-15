import React from "react";
import DomeGallery from "@/components/domeGallery/DomeGallery";
import CircleExpandButton from "@/components/button/PrimaryButton";

const HeroSection = () => {
  return (
    <div className="w-full h-screen sm:h-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mb-0 lg:mb-28">
      <div className="top-section w-full min-h-0 md:min-h-[45vh] mt-2 sm:mt-10 md:mt-12 lg:mt-14 flex flex-col items-center justify-center gap-6 sm:gap-8">
        <div className="top-content w-full flex flex-col px-4 sm:px-4 md:px-16 lg:px-16 xl:px-32 pt-0 sm:pt-0 md:pt-0 lg:pt-36 items-center gap-3 sm:gap-4">
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
          <CircleExpandButton
            href="/directory"
            className="max-w-52 sm:max-w-xs md:max-w-md"
          />
        </div>
      </div>
      <div className="bot-section mx-auto mt-6 w-full max-w-full fade-in">
        <div className="w-full h-[40vh] sm:h-[50vh] md:h-[50vh] lg:h-[100vh] xl:h-[100vh] overflow-hidden">
          <DomeGallery />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
