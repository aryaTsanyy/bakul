import React from "react";

const DirectoryTopSection = () => {
  return (
    <div className="w-full h-full mb-10 sm:mb-6 md:mb-7 lg:mb-8">
      <div className="w-full mt-2 sm:mt-10 md:mt-12 lg:mt-14 flex flex-col items-center justify-center gap-6 sm:gap-8 text-center">
        <div className="top-content w-full flex flex-col items-center px-4 sm:px-4 md:px-16 lg:px-16 xl:px-32 gap-6 sm:gap-8 text-center">
          <h1 className="font-anton leading-[120%] uppercase font-normal text-[36px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] text-[#081F36] tracking-[-2%]">
            Temukan UMKM Lokal, Mulai dari Sekitar Kamu
          </h1>
          <p className="font-inter sm:w-11/12 md:w-10/12 lg:w-9/12 w-10/12 leading-[150%] font-medium text-[14px] sm:text[14px] md:text-[16px] lg:text-[18px] text-[#515151] tracking-[-2%]">
            Bakul menghubungkan kamu dengan pelaku UMKM di daerahmu. Jelajahi
            produk dan layanan yang tumbuh dari semangat lokal karena dukungan
            kecil bisa berdampak besar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DirectoryTopSection;
