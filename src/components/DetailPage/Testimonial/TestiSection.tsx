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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-geist-mono">
          Apa Kata Mereka?
        </h2>
        <div className="flex items-center justify-center mx-auto gap-8">
          {/* 3. Loop (map) melalui array testimonials */}
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white p-8 max-w-[260px] sm:max-w-[300px] md:max-w-xl rounded-xl shadow-lg flex flex-col"
            >
              <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                {testi.komentar}
              </p>

              {/* Bagian Bawah Kartu */}
              <div className="flex items-center mt-auto">
                {/* 4. Render gambar owner */}
                <Image
                  src={testi.imageOwner}
                  alt={`Foto ${testi.nama}`}
                  width={50}
                  height={50}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testi.nama}
                  </h4>
                  <p className="text-sm text-gray-500">{testi.jabatan}</p>
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
