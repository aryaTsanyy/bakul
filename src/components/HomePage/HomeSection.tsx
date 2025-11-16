import React, { useRef } from "react";
import StatsSection from "@/components/HomePage/StartStats/StatsSection";
import CategorySection from "@/components/HomePage/Category/CategorySection";
import TypographySection from "@/components/HomePage/Typography/TypographySection";
import ListSection from "@/components/HomePage/ListUMKM/ListSection";
import TestimonialSection from "@/components/HomePage/Testimonial/TestimonialSection";
import MapSection from "@/components/HomePage/Maps/Mapsection";
import HeroSection from "@/components/HomePage/Hero/HeroSection";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

const HomeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".pin-section",
        pin: true,
        start: "top top",
        end: "+=500",
        markers: false,
      });
      gsap.from(".fade-in", {
        scrollTrigger: {
          trigger: ".fade-in",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          markers: false,
        },
        opacity: 0,
        y: 100,
      });
      gsap.utils.toArray<HTMLElement>(".parallax").forEach((element) => {
        const speed = element.dataset.speed || "1";
        gsap.to(element, {
          y: () => (1 - parseFloat(speed)) * ScrollTrigger.maxScroll(window),
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            invalidateOnRefresh: true,
            scrub: 0,
          },
        });
      });
      const footerSelector = "footer";
      const spacerSelector = ".footer-spacer";
      gsap.set(footerSelector, { yPercent: -50 });

      gsap.to(footerSelector, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: spacerSelector,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          markers: false,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      <main className="w-full h-auto relative pt-32 z-10">
        <section id="hero" data-speed="0.9" className=" relative z-10">
          <HeroSection />
        </section>
        <section
          id="category"
          data-speed="0.8"
          className="min-h-screen fade-in flex items-center justify-center z-10"
        >
          <CategorySection />
        </section>

        <section id="stats" data-speed="1.2" className="z-10">
          <TypographySection />
          <StatsSection />
        </section>

        <section id="umkm-list" data-speed="1.1" className="z-10">
          <ListSection />
        </section>

        <section id="testimonial" data-speed="1" className="z-10">
          <TestimonialSection />
        </section>

        <div id="last-section-wrapper" className="relative z-10 bg-[#f6f6f6]">
          <section id="maps" data-speed="1" className="min-h-screen">
            <MapSection />
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomeSection;
