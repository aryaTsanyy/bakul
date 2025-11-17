"use client"; // Pastikan Anda memiliki ini jika menggunakan App Router

import React, { useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";

// 1. Ganti nama 'interface'
interface SecondaryButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode; // 2. Tambahkan 'children' untuk teks
  target?: string; // 3. Tambahkan 'target' untuk _blank
  rel?: string; // 4. Tambahkan 'rel' untuk noopener
}

// 5. Ganti nama komponen
const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  href = "/", // Default href
  onClick,
  className = "",
  children, // Terima children
  target,
  rel,
}) => {
  // Semua ref GSAP dan logic useEffect SAMA PERSIS
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const flairRef = useRef<HTMLDivElement>(null);
  const textDefaultRef = useRef<HTMLSpanElement>(null);
  const textHoverRef = useRef<HTMLSpanElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const iconDefaultRef = useRef<SVGSVGElement>(null);
  const iconHoverRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !flairRef.current) return;

    const button = buttonRef.current;
    const flair = flairRef.current;

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const diameter = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2;

      gsap.set(flair, { left: x, top: y, width: 0, height: 0 });
      gsap.to(flair, {
        width: diameter,
        height: diameter,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap
        .timeline()
        .to(
          textDefaultRef.current,
          {
            rotateX: 90,
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          0
        )
        .fromTo(
          textHoverRef.current,
          { rotateX: -90, y: 20, opacity: 0 },
          { rotateX: 0, y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          0.2
        );

      gsap
        .timeline()
        .to(
          iconContainerRef.current,
          {
            backgroundColor: "#2A9DF4", // Warna hover ikon
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )
        .to(
          iconDefaultRef.current,
          {
            rotateX: 90,
            y: -10,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        )
        .fromTo(
          iconHoverRef.current,
          { rotateX: -90, y: 10, opacity: 0 },
          { rotateX: 0, y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          0.15
        );
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let exitX = x,
        exitY = y;

      if (x < rect.width * 0.2) exitX = -100;
      else if (x > rect.width * 0.8) exitX = rect.width + 100;
      if (y < rect.height * 0.2) exitY = -100;
      else if (y > rect.height * 0.8) exitY = rect.height + 100;

      gsap.killTweensOf(flair);
      gsap.killTweensOf(textDefaultRef.current);
      gsap.killTweensOf(textHoverRef.current);
      gsap.killTweensOf(iconContainerRef.current);
      gsap.killTweensOf(iconDefaultRef.current);
      gsap.killTweensOf(iconHoverRef.current);

      gsap.to(flair, {
        left: exitX,
        top: exitY,
        width: 0,
        height: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      gsap
        .timeline()
        .to(
          textHoverRef.current,
          {
            rotateX: 90,
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        )
        .fromTo(
          textDefaultRef.current,
          { rotateX: -90, y: -20, opacity: 0 },
          { rotateX: 0, y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          0.15
        );

      gsap
        .timeline()
        .to(
          iconContainerRef.current,
          {
            backgroundColor: "#f6f6f6", // Warna default ikon
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )
        .to(
          iconHoverRef.current,
          {
            rotateX: -90,
            y: 10,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        )
        .fromTo(
          iconDefaultRef.current,
          { rotateX: 90, y: -10, opacity: 0 },
          { rotateX: 0, y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          0.15
        );
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // Dependensi kosong sudah benar

  // === INI BAGIAN YANG DIMODIFIKASI ===

  // Tentukan apakah ini link eksternal (http:// atau https://)
  const isExternal = href.startsWith("http");

  // Kumpulkan semua props yang sama
  const commonProps = {
    ref: buttonRef,
    onClick: onClick,
    className: `relative overflow-hidden w-full flex items-center gap-2 sm:gap-4 bg-[#2A9DF4] border-2 border-[#2A9DF4] hover:border-gray-900 rounded-full pr-1 pl-2 py-2 sm:pr-2 sm:pl-4 sm:py-2 cursor-pointer transition-colors duration-300 ${className}`,
    style: { perspective: "1000px" },
  };

  // Konten internal tombol
  const buttonContent = (
    <>
      <div
        ref={flairRef}
        className="button__flair absolute pointer-events-none bg-[#f6f6f6] rounded-full z-0"
        style={{
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 flex items-center gap-4 w-full">
        <div
          className="relative font-geist-mono font-semibold line-clamp-1 text-[16px] uppercase"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* 6. Ganti teks hardcoded dengan 'children' */}
          <span
            ref={textDefaultRef}
            className="block font-geist-mono font-semibold text-[12px] sm:text-[16px] tracking-[-2%] text-white"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {children}
          </span>

          {/* 7. Ganti teks hardcoded dengan 'children' */}
          <span
            ref={textHoverRef}
            className="absolute font-geist-mono font-semibold text-[12px] sm:text-[16px] tracking-[-2%] inset-0 text-black opacity-0"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transform: "rotateX(-90deg)",
            }}
          >
            {children}
          </span>
        </div>

        {/* Ikon panah (tetap sama) */}
        <div
          ref={iconContainerRef}
          className="relative ml-auto bg-white rounded-full p-1 sm:p-2.5"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transition: "background-color 0.3s ease",
          }}
        >
          <svg
            ref={iconDefaultRef}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="block w-2 h-2 sm:h-4 sm:w-4"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <path
              d="M14.0306 8.53061L9.53063 13.0306C9.38973 13.1715 9.19863 13.2507 8.99938 13.2507C8.80012 13.2507 8.60902 13.1715 8.46813 13.0306C8.32723 12.8897 8.24807 12.6986 8.24807 12.4994C8.24807 12.3001 8.32723 12.109 8.46813 11.9681L11.6875 8.74999H2.5C2.30109 8.74999 2.11032 8.67097 1.96967 8.53032C1.82902 8.38967 1.75 8.1989 1.75 7.99999C1.75 7.80108 1.82902 7.61031 1.96967 7.46966C2.11032 7.329 2.30109 7.24999 2.5 7.24999H11.6875L8.46937 4.02999C8.32848 3.88909 8.24932 3.69799 8.24932 3.49874C8.24932 3.29948 8.32848 3.10838 8.46937 2.96749C8.61027 2.82659 8.80137 2.74744 9.00062 2.74744C9.19988 2.74744 9.39098 2.82659 9.53187 2.96749L14.0319 7.46749C14.1018 7.53726 14.1573 7.62016 14.1951 7.71142C14.2329 7.80269 14.2523 7.90052 14.2522 7.99931C14.252 8.09809 14.2324 8.19588 14.1944 8.28706C14.1564 8.37824 14.1007 8.46101 14.0306 8.53061Z"
              fill="#2A9DF4"
            />
          </svg>
          <svg
            ref={iconHoverRef}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="absolute inset-0 m-auto w-2 h-2 sm:h-4 sm:w-4 opacity-0"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transform: "rotateX(-90deg)",
            }}
          >
            <path
              d="M14.0306 8.53061L9.53063 13.0306C9.38973 13.1715 9.19863 13.2507 8.99938 13.2507C8.80012 13.2507 8.60902 13.1715 8.46813 13.0306C8.32723 12.8897 8.24807 12.6986 8.24807 12.4994C8.24807 12.3001 8.32723 12.109 8.46813 11.9681L11.6875 8.74999H2.5C2.30109 8.74999 2.11032 8.67097 1.96967 8.53032C1.82902 8.38967 1.75 8.1989 1.75 7.99999C1.75 7.80108 1.82902 7.61031 1.96967 7.46966C2.11032 7.329 2.30109 7.24999 2.5 7.24999H11.6875L8.46937 4.02999C8.32848 3.88909 8.24932 3.69799 8.24932 3.49874C8.24932 3.29948 8.32848 3.10838 8.46937 2.96749C8.61027 2.82659 8.80137 2.74744 9.00062 2.74744C9.19988 2.74744 9.39098 2.82659 9.53187 2.96749L14.0319 7.46749C14.1018 7.53726 14.1573 7.62016 14.1951 7.71142C14.2329 7.80269 14.2523 7.90052 14.2522 7.99931C14.252 8.09809 14.2324 8.19588 14.1944 8.28706C14.1564 8.37824 14.1007 8.46101 14.0306 8.53061Z"
              fill="#f6f6f6"
            />
          </svg>
        </div>
      </div>
    </>
  );

  // 8. Render <a> atau <Link> secara kondisional
  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        {...commonProps} // Terapkan props umum
      >
        {buttonContent}
      </a>
    );
  }

  // Ini untuk link internal seperti /directory
  return (
    <Link href={href} {...commonProps}>
      {buttonContent}
    </Link>
  );
};

// 9. Ganti nama 'export'
export default SecondaryButton;
