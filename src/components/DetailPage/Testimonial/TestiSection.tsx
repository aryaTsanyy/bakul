// components/HomePage/Testimonial/TestimonialSection.tsx

import React from "react";
import Image from "next/image";
import { testimonialsDummy } from "@/pages/api/umkm";

interface TestimonialSectionProps {
  testimonials: testimonialsDummy[];
}

const TestiSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl font-normal text-[#081f36] mb-12 text-center">
          Apa Kata Mereka?
        </h2>
        <div className="flex items-center justify-center mx-auto gap-8">
          {/* 3. Loop (map) melalui array testimonials */}
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white p-8 max-w-[260px] sm:max-w-[400px] md:max-w-xl gap-6 rounded-xl shadow-lg flex flex-col"
            >
              <p className="text-gray-600 mb-6 italic text-lg text-center leading-relaxed">
                {testi.komentar}
              </p>

              {/* Bagian Bawah Kartu */}
              <div className="flex flex-col gap-6 items-center justify-center mt-auto">
                {/* 4. Render gambar owner */}
                <Image
                  src={testi.imageOwner}
                  alt={`Foto ${testi.nama}`}
                  width={50}
                  height={50}
                  className="rounded-full mr-4 object-cover"
                />
                <div className="transition-all flex items-center gap-3 justify-center duration-500">
                  <h4 className="text-[12px] sm:text-lg font-geist-mono font-medium text-[#19395F]">
                    {testi.nama}
                  </h4>
                  <div className="w-1 h-1 items-center bg-[#2A9DF4] rounded-full"></div>
                  <p className="text-[12px] sm:text-lg text-[#19395F] font-geist-mono font-medium">
                    {testi.jabatan}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestiSection;
