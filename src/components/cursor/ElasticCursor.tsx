"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const ElasticCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const mousePosition = useRef<CursorPosition>({ x: 0, y: 0 });
  const dotPosition = useRef<CursorPosition>({ x: 0, y: 0 });
  const ringPosition = useRef<CursorPosition>({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lerp (Linear Interpolation) function for smooth movement
  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  // Animation loop dengan RAF (optimized untuk server)
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      // Elastic animation untuk dot (lebih cepat)
      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        0.25
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        0.25
      );

      // Elastic animation untuk ring (lebih lambat - efek elastic)
      ringPosition.current.x = lerp(
        ringPosition.current.x,
        mousePosition.current.x,
        0.15
      );
      ringPosition.current.y = lerp(
        ringPosition.current.y,
        mousePosition.current.y,
        0.15
      );

      // Update DOM
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPosition.current.x}px, ${dotPosition.current.y}px)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringPosition.current.x}px, ${ringPosition.current.y}px)`;
      }
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  // Mouse move handler (throttled)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Mouse down/up handlers
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // Mouse enter/leave handlers
  const handleMouseEnter = useCallback(() => {
    setIsHidden(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHidden(true);
  }, []);

  // Hover detection untuk interactive elements
  useEffect(() => {
    if (isMobile) return;

    const handleHoverElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer'
      );

      const handleMouseEnterElement = () => setIsHovering(true);
      const handleMouseLeaveElement = () => setIsHovering(false);

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterElement);
        el.addEventListener("mouseleave", handleMouseLeaveElement);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnterElement);
          el.removeEventListener("mouseleave", handleMouseLeaveElement);
        });
      };
    };

    const cleanup = handleHoverElements();

    // Re-attach listeners on DOM changes (untuk dynamic content)
    const observer = new MutationObserver(handleHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [isMobile]);

  // Setup event listeners dan animation
  useEffect(() => {
    if (isMobile) return;

    // Initialize positions
    mousePosition.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    dotPosition.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    ringPosition.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    isMobile,
    animate,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
  ]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className={`cursor-dot ${isHidden ? "hidden" : ""} ${
          isClicking ? "clicking" : ""
        }`}
        style={{
          position: "fixed",
          top: "-6px",
          left: "-6px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#000",
          pointerEvents: "none",
          zIndex: 10000,
          transition: "transform 0.15s ease-out, opacity 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Cursor Ring (Donut) */}
      <div
        ref={cursorRingRef}
        className={`cursor-ring ${isHidden ? "hidden" : ""} ${
          isHovering ? "hovering" : ""
        } ${isClicking ? "clicking" : ""}`}
        style={{
          position: "fixed",
          top: "-20px",
          left: "-20px",
          width: "40px",
          height: "40px",
          border: "2px solid #000",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
        }}
      />

      <style jsx>{`
        /* Hide default cursor */
        * {
          cursor: none !important;
        }

        /* Cursor states */
        .cursor-dot.hidden,
        .cursor-ring.hidden {
          opacity: 0;
        }

        .cursor-dot.clicking {
          transform: scale(0.8) !important;
        }

        .cursor-ring.clicking {
          transform: scale(0.85) !important;
          border-width: 3px;
        }

        .cursor-ring.hovering {
          width: 60px !important;
          height: 60px !important;
          top: -30px !important;
          left: -30px !important;
          border-color: #13569c;
          background-color: rgba(19, 86, 156, 0.1);
          border-width: 2.5px;
        }

        /* Smooth scale animation for hover */
        .cursor-ring {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Performance optimizations */
        .cursor-dot,
        .cursor-ring {
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

        /* Smooth transitions for interactive elements */
        a,
        button,
        [role="button"],
        .cursor-pointer {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        a:hover,
        button:hover,
        [role="button"]:hover,
        .cursor-pointer:hover {
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
};

export default ElasticCursor;
