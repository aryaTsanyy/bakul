import React, { useEffect, useRef, useState } from "react";

interface StatItemProps {
  number: number;
  suffix: string;
  description: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({
  number,
  suffix,
  description,
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const currentElement = itemRef.current;
    let timer: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;

            // Counter animation
            const duration = 1500; // 1.5 seconds
            const steps = 60;
            const increment = number / steps;
            let current = 0;

            timer = setInterval(() => {
              current += increment;
              if (current >= number) {
                setCount(number);
                if (timer) clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [number]);

  return (
    <div
      ref={itemRef}
      className={`flex flex-col items-center sm:items-center md:items-center lg:items-start xl:items-start transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl font-anton font-normal sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-white mb-3 sm:mb-4">
        <span>{count.toLocaleString("id-ID")}</span>
        <span className="text-white">{suffix}</span>
      </div>
      <p className="text-white/90 font-inter font-medium text-xs text-center sm:text-center md:text-center lg:text-start xl:text-start sm:text-base lg:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      number: 250,
      suffix: "+",
      description: "Pelaku usaha lokal yang bergabung di platform kami",
    },
    {
      number: 1000,
      suffix: "+",
      description: "Pengguna yang menjelajahi UMKM tiap bulan.",
    },
    {
      number: 35,
      suffix: "+",
      description: "Wilayah di Indonesia yang telah terwakili oleh UMKM lokal.",
    },
    {
      number: 50,
      suffix: "+",
      description:
        "Partner, komunitas, dan inisiatif yang mendukung UMKM digital.",
    },
  ];

  return (
    <section className="relative flex items-center w-full bg-[#13569C] py-16 sm:py-20 md:py-24 lg:py-32 xl:py-36 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .float-slow {
          animation: float 20s ease-in-out infinite;
        }
        .float-slower {
          animation: float 25s ease-in-out infinite;
          animation-delay: -5s;
        }
      `}</style>

      {/* Background decorative elements - Optimized */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white rounded-full blur-3xl float-slow"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white rounded-full blur-3xl float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-white/50 rounded-full blur-2xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="w-full relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              <StatItem
                number={stat.number}
                suffix={stat.suffix}
                description={stat.description}
                delay={index * 150}
              />

              {/* Vertical divider - Hidden on mobile, shown on tablet+ between columns */}
              {index < stats.length - 1 && (
                <>
                  {/* Horizontal divider for mobile (between rows) */}
                  <div className="sm:hidden absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-y-4"></div>

                  {/* Vertical divider for tablet (2 columns) */}
                  {index % 2 === 0 && (
                    <div className="hidden sm:block lg:hidden absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent transform translate-x-5"></div>
                  )}

                  {/* Vertical divider for desktop (4 columns) */}
                  <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent transform translate-x-6 xl:translate-x-8"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
};

export default StatsSection;
