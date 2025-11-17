import Image from "next/image";
import React from "react";
import { Umkm } from "@/pages/api/umkm";

interface UMKMDetailPageProps {
  umkm: Umkm;
}

const StorySection: React.FC<UMKMDetailPageProps> = ({ umkm }) => {
  return (
    <section className="description bg-white w-full h-full px-4 py-8 md:px-24 md:py-20 flex flex-col md:flex-row items-center justify-center lg:grid-cols-4 gap-20">
      <div className="left-section col-span-1">
        <div className="w-[250px] h-[250px] md:w-[500px] md:h-[300px] rounded-3xl overflow-hidden bg-gray-100 group cursor-pointer">
          <Image
            width={500}
            height={500}
            src={umkm.photos[1]}
            alt={umkm.name}
            className="w-full h-full object-cover transition-all duration-5ss00 ease-out group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop";
            }}
          />
        </div>
      </div>
      <div className="right-section col-span-3">
        <div className="w-full h-full flex flex-col items-center md:items-start justify-evenly gap-4.5">
          <h2 className="font-anton font-normal text-center md:text-start text-4xl text-[#081F36] leading-[120%] tracking-[-2%]">
            {umkm.tagline}
          </h2>
          <p className="font-inter font-medium text-center md:text-start text-xs sm:text-sm md:text-2xl max-w-5/6 leading-[150%] tracking-[-2%]">
            {umkm.description}
          </p>
          <p className="font-inter font-medium text-center md:text-start text-xs sm:text-sm md:text-2xl max-w-5/6 leading-[150%] tracking-[-2%]">
            {umkm.story}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
