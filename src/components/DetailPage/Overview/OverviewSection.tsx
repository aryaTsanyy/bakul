import { Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Umkm } from "@/pages/api/umkm";

interface UMKMDetailPageProps {
  umkm: Umkm;
}

const OverviewSection: React.FC<UMKMDetailPageProps> = ({ umkm }) => {
  const [isImageHovered, setIsImageHovered] = useState(false);
  useState(isImageHovered);
  return (
    <section className="bg-white min-h-screen flex items-center justify-center w-full h-full">
      <div className="w-full h-full mx-auto px-10 sm:px-20 lg:px-24 py-12 sm:py-16">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24 items-start">
          {/* Info Section */}
          <div className="space-y-6 flex flex-col items-start justify-evenly gap-5 h-full lg:col-span-2">
            {/* Category Badge */}
            <div className=" lex items-center gap-4">
              <span className="px-4 py-2 font-geist-mono bg-gray-100 text-gray-800 text-sm font-semibold rounded-full uppercase tracking-wide">
                {umkm.categories[0]}
              </span>
              <span className="px-4 py-2 font-geist-mono bg-gray-100 text-gray-800 text-sm font-semibold rounded-full uppercase tracking-wide">
                {umkm.categories[1]}
              </span>
            </div>
            <div className="w-full flex flex-col items-start justify-between gap-2">
              {/* Name */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-anton font-normal text-gray-900 leading-[120%] tracking-[-2%] mb-4">
                  {umkm.name}
                </h1>
              </div>
              {/* Description */}
              <div className="prose prose-gray max-w-none">
                <p className="text-base font-inter sm:text-lg text-[#515151] leading-[150%] tracking-[-2%]">
                  {umkm.tagline}
                </p>
              </div>
              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href={umkm.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary-blue text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 text-base sm:text-lg"
                >
                  <span className="font-geist-mono text-white font-semibold">
                    KUNJUNGI LOKASI
                  </span>
                </a>
              </div>
            </div>
            {/* Contact Info */}
            <div className="grid grid-cols-3 bg-secondary-blue p-3 rounded-2xl sm:p-4 md:p-5 gap-4 pt-6">
              {/* Phone */}
              <div className="text-white rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold uppercase mb-2 opacity-90">
                  Nomor Telepon
                </p>
                <p className="font-bold text-sm sm:text-base break-all">
                  {umkm.phone || "-"}
                </p>
              </div>
              {/* Operating Hours */}
              <div className="text-white rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold uppercase mb-2 opacity-90">
                  Jam Operasional
                </p>
                <p className="font-bold text-sm sm:text-base">
                  {umkm.operatingHours}
                </p>
              </div>
              {/* Social Media */}
              <div className="text-white rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold uppercase mb-2 opacity-90">
                  Social Media
                </p>
                <p className="font-bold text-sm sm:text-base break-all">
                  {umkm.instagram || "-"}
                </p>
              </div>
            </div>
          </div>
          {/* Right Column - Single Image with Iconic Animation */}
          <div className="relative w-full lg:sticky lg:col-span-2 lg:top-24">
            <div
              className="relative w-[700px] h-[600px] rounded-3xl overflow-hidden bg-gray-100 group cursor-pointer"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              {/* Main Image with Multiple Animation Layers */}
              <Image
                width={500}
                height={500}
                src={umkm.photos[0]}
                alt={umkm.name}
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop";
                }}
              />
              {/* ANIMATION 1: Diagonal Slide Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* ANIMATION 2: Corner Accent Lines */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-32 group-hover:h-32" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-32 group-hover:h-32" />

              {/* ANIMATION 3: Glowing Border Pulse */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl border-4 border-white/50 animate-pulse-glow" />
              </div>
              {/* ANIMATION 4: Floating Particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-white rounded-full animate-float-particle-1" />
                <div className="absolute top-[40%] right-[20%] w-3 h-3 bg-white/70 rounded-full animate-float-particle-2" />
                <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-white/50 rounded-full animate-float-particle-3" />
                <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-white rounded-full animate-float-particle-4" />
              </div>
              {/* ANIMATION 5: Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
              </div>
              {/* Rating Badge - Always Visible */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-xl z-10 transition-transform duration-300 group-hover:scale-110">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-900 text-lg">
                  {umkm.averageRating}
                </span>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Hover Text */}
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white font-bold text-lg drop-shadow-lg">
                  Klik untuk melihat lebih detail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
          }
        }
        @keyframes float-particle-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(20px, -30px) scale(1.5);
            opacity: 1;
          }
        }
        @keyframes float-particle-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(-25px, -40px) scale(1.3);
            opacity: 1;
          }
        }
        @keyframes float-particle-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(30px, -25px) scale(1.2);
            opacity: 1;
          }
        }
        @keyframes float-particle-4 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(-20px, -35px) scale(1.4);
            opacity: 1;
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-float-particle-1 {
          animation: float-particle-1 3s ease-in-out infinite;
        }
        .animate-float-particle-2 {
          animation: float-particle-2 3.5s ease-in-out infinite 0.5s;
        }
        .animate-float-particle-3 {
          animation: float-particle-3 4s ease-in-out infinite 1s;
        }
        .animate-float-particle-4 {
          animation: float-particle-4 3.8s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
};

export default OverviewSection;
