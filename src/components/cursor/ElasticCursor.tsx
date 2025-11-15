"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type GsapQuickSetter = ReturnType<typeof gsap.quickSetter>;
interface Position {
  x: number;
  y: number;
}

const JellyCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const pos = useRef<Position>({ x: 0, y: 0 });
  const vel = useRef<Position>({ x: 0, y: 0 });
  const targetPos = useRef<Position>({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  // Quick Setters untuk performa optimal
  const setters = useRef<{
    x: GsapQuickSetter | null;
    y: GsapQuickSetter | null;
    rotate: GsapQuickSetter | null;
    scaleX: GsapQuickSetter | null;
    scaleY: GsapQuickSetter | null;
    opacity: GsapQuickSetter | null;
  }>({
    x: null,
    y: null,
    rotate: null,
    scaleX: null,
    scaleY: null,
    opacity: null,
  });

  // Deteksi mobile & touch device
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      window.innerWidth < 768;

    setIsMobile(isTouchDevice);
  }, []);

  // Calculate scale based on velocity (Jelly Effect)
  const getScale = (diffX: number, diffY: number): number => {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return Math.min(distance / 100, 0.25);
  };

  // Calculate angle for rotation (Jelly Effect)
  const getAngle = (diffX: number, diffY: number): number => {
    return (Math.atan2(diffY, diffX) * 180) / Math.PI;
  };

  // Update cursor position and jelly effect
  const update = () => {
    if (!setters.current.x || !setters.current.y) return;

    const rotation = getAngle(vel.current.x, vel.current.y);
    const scale = getScale(vel.current.x, vel.current.y);

    // Update position & rotation
    setters.current.x(pos.current.x);
    setters.current.y(pos.current.y);
    setters.current.rotate?.(rotation);

    // Apply jelly scale effect (hanya kalau tidak hover)
    if (!isHoveringRef.current) {
      setters.current.scaleX?.(1 + scale);
      setters.current.scaleY?.(1 - scale);
    }
  };

  // Animation loop
  const animate = () => {
    const speed = 0.35;

    // Update position dengan elastic movement
    pos.current.x += (targetPos.current.x - pos.current.x) * speed;
    pos.current.y += (targetPos.current.y - pos.current.y) * speed;

    // Calculate velocity
    vel.current.x = targetPos.current.x - pos.current.x;
    vel.current.y = targetPos.current.y - pos.current.y;

    update();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Setup GSAP QuickSetters
  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;

    // Initialize QuickSetters
    setters.current.x = gsap.quickSetter(cursor, "x", "px");
    setters.current.y = gsap.quickSetter(cursor, "y", "px");
    setters.current.rotate = gsap.quickSetter(cursor, "rotate", "deg");
    setters.current.scaleX = gsap.quickSetter(cursor, "scaleX");
    setters.current.scaleY = gsap.quickSetter(cursor, "scaleY");
    setters.current.opacity = gsap.quickSetter(cursor, "opacity");

    // Initialize position di tengah screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    pos.current = { x: centerX, y: centerY };
    targetPos.current = { x: centerX, y: centerY };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  // Mouse move handler
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // Hover handlers untuk clickable elements
  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const clickableSelector =
      'a, button, input, textarea, select, [role="button"], .cursor-pointer';

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;

      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const handleMouseOver = (e: MouseEvent) => {
      if (isHoveringRef.current) return; // Jangan lakukan apapun jika sudah hover
      const target = e.target as HTMLElement;
      if (target.closest(clickableSelector)) {
        handleMouseEnter();
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      if (!isHoveringRef.current) return; // Jangan lakukan apapun jika tidak hover
      const target = e.target as HTMLElement;
      // 'relatedTarget' adalah elemen tujuan saat mouse keluar
      const relatedTarget = e.relatedTarget as HTMLElement;

      // Cek jika kita benar-benar "meninggalkan" elemen (bukan pindah ke anak)
      if (
        !relatedTarget ||
        !target.closest(clickableSelector) ||
        !relatedTarget.closest(clickableSelector)
      ) {
        handleMouseLeave();
      }
    };
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      // Hapus SATU kali dari document.body
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  // Hide/Show cursor saat leave/enter viewport
  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;

    const hideCursor = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    const showCursor = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    // Handle iframes
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.addEventListener("mouseenter", hideCursor);
      iframe.addEventListener("mouseleave", showCursor);
    });

    return () => {
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);

      iframes.forEach((iframe) => {
        iframe.removeEventListener("mouseenter", hideCursor);
        iframe.removeEventListener("mouseleave", showCursor);
      });
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Jelly Cursor */}
      <div
        ref={cursorRef}
        id="jelly-cursor"
        className="jelly-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          pointerEvents: "none",
          zIndex: 10000,
          willChange: "transform",
          transform: "translate(-50%, -50%)",
        }}
      />

      <style jsx>{`
        /* Hide default cursor */
        * {
          cursor: none !important;
        }

        /* Jelly Cursor */
        .jelly-cursor {
          mix-blend-mode: difference;
          filter: blur(0px);
          transition: filter 0.3s ease;
        }

        /* Performance optimizations */
        .jelly-cursor {
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
        }

        /* Mobile: restore default cursor */
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }

        /* Specific elements cursor override */
        input:focus,
        textarea:focus {
          cursor: text !important;
        }

        /* Remove default outline */
        *:focus {
          outline: none;
        }

        /* Text selection color */
        ::selection {
          background-color: rgba(42, 157, 244, 0.3);
          color: inherit;
        }

        ::-moz-selection {
          background-color: rgba(42, 157, 244, 0.3);
          color: inherit;
        }
      `}</style>
    </>
  );
};

export default JellyCursor;
