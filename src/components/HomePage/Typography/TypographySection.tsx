import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TypographySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    const text = titleRef.current.textContent || "";
    titleRef.current.innerHTML = "";

    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.willChange = "filter, opacity";
      span.style.filter = isMobile ? "blur(5px)" : "blur(10px)";
      span.style.opacity = isMobile ? "0.5" : "0.3";
      if (char === " ") {
        span.style.width = "0.5em";
      }
      span.className = "char";
      titleRef.current?.appendChild(span);
      return span;
    });

    const animConfig = isMobile
      ? {
          duration: 0.3,
          stagger: 0.015,
          scrub: 0.5,
        }
      : {
          duration: 0.5,
          stagger: 0.02,
          scrub: 1,
        };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: animConfig.scrub,
        invalidateOnRefresh: true,
      },
    });

    tl.to(chars, {
      filter: "blur(0px)",
      opacity: 1,
      duration: animConfig.duration,
      stagger: {
        each: animConfig.stagger,
        from: "start",
      },
      ease: "power2.out",
      onComplete: () => {
        chars.forEach((char) => {
          char.style.willChange = "auto";
        });
      },
    });

    gsap.set(sectionRef.current, { opacity: 1 });

    gsap.from(sectionRef.current, {
      opacity: 0,
      y: isMobile ? 30 : 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: animConfig.scrub,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="flex items-center justify-center">
      <div className="max-w-xl sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-4 sm:mx-20 my-28 text-center">
        <div className="mb-28">
          <span className="inline-block font-geist-mono dark-text rounded-full text-sm font-medium tracking-wide uppercase">
            [ TENTANG KAMI ]
          </span>
        </div>

        <div className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl flex items-center justify-center">
          <h1
            ref={titleRef}
            className="text-xl md:text-4xl lg:text-5xl font-anton text-[#081F36] text-center font-normal leading-tight mb-28"
          >
            KAMI HADIR UNTUK MENGHUBUNGKAN KAMU DENGAN PELAKU UMKM LOKAL AGAR
            BERSAMA-SAMA TUMBUH DAN MENGGERAKKAN EKONOMI KREATIF INDONESIA.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default TypographySection;
