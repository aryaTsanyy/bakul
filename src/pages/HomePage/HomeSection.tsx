import React, { useEffect, useRef } from "react";
import StatsSection from "@/components/HomePage/StartStats/StatsSection";
import CategorySection from "@/components/HomePage/Category/CategorySection";
import TypographySection from "@/components/HomePage/Typography/TypographySection";
import ListSection from "@/components/HomePage/ListUMKM/ListSection";
import TestimonialSection from "@/components/HomePage/Testimonial/TestimonialSection";
import MapSection from "@/components/HomePage/Maps/Mapsection";
import HeroSection from "@/components/HomePage/Hero/HeroSection";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const HomeSection = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.config({
      nullTargetWarn: false,
      force3D: true,
    });
    document.documentElement.style.scrollBehavior = "smooth";
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        document.body.style.pointerEvents = "none";
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling.current = false;
        document.body.style.pointerEvents = "auto";
      }, 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    ScrollTrigger.refresh();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash) {
      // Delay untuk memastikan DOM sudah ter-render
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          scrollToSection(hash.substring(1));
        }
      }, 500);
    }
  }, []);
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80; // Sesuaikan dengan tinggi navbar
      const targetPosition = section.offsetTop - navbarHeight;

      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetPosition,
          autoKill: true,
        },
        ease: "power3.inOut",
        onStart: () => {
          // Optional: Disable scroll saat animasi
          document.body.style.overflow = "hidden";
        },
        onComplete: () => {
          document.body.style.overflow = "auto";
          // Update URL tanpa reload
          if (window.history.pushState) {
            window.history.pushState(null, "", `#${sectionId}`);
          }
        },
      });
    }
  };

  return (
    <div ref={mainRef} className="relative">
      <Navbar />

      <main className="w-full h-full pt-24">
        <section id="hero">
          <HeroSection />
        </section>

        <section id="category">
          <CategorySection />
        </section>

        <section id="about">
          <TypographySection />
        </section>

        <section id="stats">
          <StatsSection />
        </section>

        <section id="umkm-list">
          <ListSection />
        </section>

        <section id="testimonial">
          <TestimonialSection />
        </section>

        <section id="maps">
          <MapSection />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default HomeSection;
