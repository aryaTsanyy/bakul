import React, { useRef, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const router = useRouter();

  useGSAP(
    () => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });
    },
    {
      scope: mainRef,
    }
  );
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const hash = url.split("#")[1];
      if (hash && smootherRef.current) {
        setTimeout(() => {
          smootherRef.current?.scrollTo("#" + hash, true, "center center");
        }, 300);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, smootherRef]);

  return (
    <div ref={mainRef}>
      <Navbar smootherRef={smootherRef} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="relative z-10 bg-[#f6f6f6]">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SmoothScroll;
