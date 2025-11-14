import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface GallerySectionProps {
  photos: string[];
  title?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  photos,
  title = "LIHAT, KENALI, DUKUNG",
}) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 40;
    const rotateY = (centerX - x) / 40;

    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    setHoveredIndex(null);
  };

  // Ambil 5 foto pertama untuk gallery
  const galleryPhotos = photos.slice(0, 5);

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full h-full min-h-screen px-4 sm:px-10 md:px-12 lg:px-24 py-16 sm:py-20 lg:py-24 overflow-hidden relative"
    >
      <div className="w-full h-full mx-auto flex flex-col items-center justify-center gap-4 lg:gap-16 relative">
        {/* Title with reveal animation */}
        <div className="text-center">
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </h2>
        </div>

        {/* 3 Column Grid Layout */}
        <div className="grid w-full h-full grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
          {/* Column 1: 2 Gambar Vertikal */}
          <div className="flex h-full flex-col gap-4 lg:gap-6">
            {galleryPhotos[0] && (
              <ImageCard
                photo={galleryPhotos[0]}
                index={0}
                inView={inView}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                className="flex-1 min-h-[250px] md:min-h-[400px]"
              />
            )}
            {galleryPhotos[1] && (
              <ImageCard
                photo={galleryPhotos[1]}
                index={1}
                inView={inView}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                className="flex-1 min-h-[250px] md:min-h-[400px]"
              />
            )}
          </div>

          {/* Column 2: 1 Gambar Tinggi (Full Height) */}
          <div className="flex">
            {galleryPhotos[2] && (
              <ImageCard
                photo={galleryPhotos[2]}
                index={2}
                inView={inView}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                className="w-full min-h-[500px] md:min-h-0"
              />
            )}
          </div>

          {/* Column 3: 2 Gambar Vertikal */}
          <div className="flex flex-col gap-4 lg:gap-6">
            {galleryPhotos[3] && (
              <ImageCard
                photo={galleryPhotos[3]}
                index={3}
                inView={inView}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                className="flex-1 min-h-[250px] md:min-h-[400px]"
              />
            )}
            {galleryPhotos[4] && (
              <ImageCard
                photo={galleryPhotos[4]}
                index={4}
                inView={inView}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                className="flex-1 min-h-[250px] md:min-h-[400px]"
              />
            )}
          </div>
        </div>

        {/* Decorative Line */}
        <div className="relative mt-4">
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#2a9df4] to-transparent transition-all duration-1000 delay-700 ${
              inView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </div>
      </div>

      {/* Floating Decorations */}
      {inView && (
        <>
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float-slow" />
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-float-slower" />
          <div className="absolute top-1/3 right-10 w-16 h-16 bg-pink-500/10 rounded-full blur-lg animate-float-medium" />
        </>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-30px) translateX(-15px) scale(1.1);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) translateX(8px) rotate(180deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 10s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

// Komponen ImageCard yang reusable
interface ImageCardProps {
  photo: string;
  index: number;
  inView: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  photo,
  index,
  inView,
  hoveredIndex,
  setHoveredIndex,
  handleMouseMove,
  handleMouseLeave,
  className = "",
}) => {
  const delay = index * 150;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.95)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
      onMouseMove={(e) => handleMouseMove(e, index)}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image with parallax */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        <Image
          width={400}
          height={400}
          src={photo}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-${
              1500000000000 + index
            }?w=800&h=600&fit=crop`;
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated Border Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/40 transition-all duration-500 rounded-2xl group-hover:animate-pulse-glow" />

      {/* Shimmer Effect Loop */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          animation: hoveredIndex === index ? "shimmer 2s infinite" : "none",
        }}
      />

      {/* Corner Accents with Pulse */}
      <div
        className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-l-[40px] border-t-[#2a9df4] border-l-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-2xl"
        style={{
          filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-b-[#2a9df4] border-r-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-2xl"
        style={{
          filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
        }}
      />

      {/* Diagonal Line Animation */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            transform: "rotate(45deg) translateY(-50%)",
            animation:
              hoveredIndex === index
                ? "shimmer 3s ease-in-out infinite"
                : "none",
          }}
        />
      </div>
    </div>
  );
};

export default GallerySection;
