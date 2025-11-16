import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  smootherRef?: React.RefObject<ScrollSmoother | null>;
}

const Navbar: React.FC<NavbarProps> = ({ smootherRef }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = currentScrollY - lastScrollY.current;
          setIsScrolled(currentScrollY > 50);
          if (navbarRef.current) {
            if (scrollDifference > 10 && currentScrollY > 100) {
              gsap.to(navbarRef.current, {
                y: -120,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else if (scrollDifference < -5) {
              gsap.to(navbarRef.current, {
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery("");
    }
    if (navbarRef.current && !isOpen) {
      gsap.to(navbarRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/directory?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const handleNavigate = (path: string) => {
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (path.startsWith("#")) {
      const sectionId = path.substring(1);
      if (router.pathname === "/") {
        if (smootherRef && smootherRef.current) {
          smootherRef.current.scrollTo("#" + sectionId, true, "center center");
        } else {
          const section = document.getElementById(sectionId);
          if (section) {
            const navbarHeight = 80;
            const targetPosition = section.offsetTop - navbarHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      } else {
        router.push("/" + path);
      }
    } else {
      router.push(path);
    }
    setIsOpen(false);
  };
  const dynamicIsScrolled = isClient && isScrolled;

  return (
    <>
      <nav
        ref={navbarRef}
        className="bg-transparent w-full fixed top-0 left-0 z-50 font-geist-mono"
        style={{
          paddingLeft: dynamicIsScrolled ? "2rem" : "1rem",
          paddingRight: dynamicIsScrolled ? "2rem" : "1rem",
        }}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            dynamicIsScrolled
              ? "py-2 px-4 md:py-3 md:px-6 lg:px-12"
              : "py-3 px-6 md:py-5 md:px-6 lg:px-10"
          }`}
        >
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center p-2 md:p-3 rounded-full bg-transparent hover:scale-105 transition-transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 md:w-12 md:h-12"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clipPath="url(#clip0_1_847)">
                  <path
                    d="M24 22.4V9.6C24 8.71632 23.2837 8 22.4 8H22.3195C21.8952 8 21.4883 8.16872 21.1883 8.46872L8.46872 21.1883C8.16872 21.4883 8 21.8952 8 22.3195V32H0V22.3195C1.7225e-05 19.7734 1.01138 17.3316 2.81172 15.5313L15.5313 2.81172C17.3316 1.01138 19.7734 1.70984e-05 22.3195 0H22.4C27.7019 0 32 4.29806 32 9.6V22.4C32 27.7019 27.7019 32 22.4 32H11.2V24H22.4C23.2837 24 24 23.2837 24 22.4ZM0 0H13.6L5.6 8H0V0Z"
                    fill="#2A9DF4"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_847">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>

            {/* Desktop/Tablet */}
            <div className="hidden bg-white shadow-lg p-2.5 rounded-full sm:flex items-center gap-3 md:gap-2">
              {/* Menu Items Container */}
              <div
                className={`bg-white rounded-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isOpen
                    ? "max-w-md opacity-100 bg-transparent"
                    : "max-w-0 opacity-0 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 px-4 py-3 md:gap-3 md:px-5 md:py-3.5 lg:gap-4 lg:pl-6 lg:pr-2 whitespace-nowrap">
                  <Link
                    href="/"
                    className="relative text-gray-700 font-medium text-xs md:text-sm lg:text-base transition-all duration-300 overflow-hidden group px-2 py-1 transform"
                    style={{ perspective: "100px" }}
                  >
                    <span
                      className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full group-hover:rotate-x-90 text-gray-700"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      BERANDA
                    </span>
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[#2A9DF4] transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      BERANDA
                    </span>
                  </Link>

                  <Link
                    href="/directory"
                    className="relative text-gray-700 font-medium text-xs md:text-sm lg:text-base transition-all duration-300 overflow-hidden group px-2 py-1 transform"
                    style={{ perspective: "100px" }}
                  >
                    <span
                      className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full group-hover:rotate-x-90 text-gray-700"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      UMKM
                    </span>
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[#2A9DF4] transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      UMKM
                    </span>
                  </Link>
                  <a
                    href="#maps"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate("#maps");
                    }}
                    className="relative text-gray-700 font-medium text-xs md:text-sm lg:text-base transition-all duration-300 overflow-hidden group px-2 py-1 transform"
                    style={{ perspective: "100px" }}
                  >
                    <span
                      className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full group-hover:rotate-x-90 text-gray-700"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      PETA
                    </span>
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[#2A9DF4] transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      PETA
                    </span>
                  </a>
                </div>
              </div>

              {/* Menu Icon Button - Hamburger to X Animation */}
              <button
                onClick={handleToggle}
                className="bg-white rounded-full p-3 md:p-3.5 lg:p-4 hover:scale-105 hover:rotate-12 active:scale-95 transition-transform duration-200 flex-shrink-0"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 md:w-6 md:h-5 relative flex flex-col justify-center items-center">
                  {/* Top Line */}
                  <span
                    className={`absolute w-full h-0.5 bg-[#19395F] rounded-full transition-all duration-700 ease-in-out ${
                      isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : "top-0"
                    }`}
                  />
                  {/* Middle Line */}
                  <span
                    className={`absolute w-full h-0.5 bg-[#19395F] rounded-full transition-all duration-700 ease-in-out top-1/2 -translate-y-1/2 ${
                      isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  />
                  {/* Bottom Line */}
                  <span
                    className={`absolute w-full h-0.5 bg-[#19395F] rounded-full transition-all duration-700 ease-in-out ${
                      isOpen
                        ? "-rotate-45 top-1/2 -translate-y-1/2"
                        : "bottom-0"
                    }`}
                  />
                </div>
              </button>

              {/* Search Section - Expandable */}
              <div
                className={`bg-[#2A9DF4] rounded-full shadow-lg flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isOpen ? "w-64 md:w-80 lg:w-96" : "w-auto"
                }`}
              >
                {isOpen ? (
                  <form
                    onSubmit={handleSearch}
                    className="w-full flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 lg:px-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-white"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M16.3469 15.1531L13.0078 11.8125C14.009 10.5079 14.4764 8.87121 14.3153 7.23458C14.1541 5.59795 13.3765 4.08389 12.14 2.99955C10.9036 1.9152 9.30104 1.34177 7.65738 1.39556C6.01372 1.44935 4.45205 2.12635 3.28919 3.28922C2.12632 4.45209 1.44932 6.01375 1.39553 7.65741C1.34174 9.30107 1.91517 10.9037 2.99952 12.1401C4.08386 13.3765 5.59792 14.1541 7.23455 14.3153C8.87118 14.4764 10.5078 14.009 11.8125 13.0078L15.1544 16.3505C15.2329 16.429 15.3261 16.4912 15.4287 16.5337C15.5312 16.5762 15.6411 16.5981 15.7521 16.5981C15.8631 16.5981 15.973 16.5762 16.0756 16.5337C16.1781 16.4912 16.2713 16.429 16.3498 16.3505C16.4282 16.272 16.4905 16.1788 16.533 16.0763C16.5755 15.9737 16.5973 15.8638 16.5973 15.7528C16.5973 15.6418 16.5755 15.5319 16.533 15.4294C16.4905 15.3268 16.4282 15.2337 16.3498 15.1552L16.3469 15.1531ZM3.09375 7.87503C3.09375 6.92938 3.37416 6.00498 3.89953 5.21871C4.4249 4.43243 5.17163 3.81961 6.04529 3.45773C6.91895 3.09585 7.8803 3.00116 8.80777 3.18565C9.73524 3.37013 10.5872 3.8255 11.2558 4.49417C11.9245 5.16284 12.3799 6.01478 12.5644 6.94225C12.7489 7.86972 12.6542 8.83107 12.2923 9.70473C11.9304 10.5784 11.3176 11.3251 10.5313 11.8505C9.74504 12.3759 8.82064 12.6563 7.875 12.6563C6.60733 12.655 5.39196 12.1508 4.49558 11.2544C3.5992 10.3581 3.09505 9.14269 3.09375 7.87503Z"
                        fill="currentColor"
                      />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari UMKM...."
                      className="bg-transparent text-white placeholder-gray-100 focus:outline-none w-full text-sm md:text-base font-medium"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle();
                      }}
                      className="text-gray-100 hover:rotate-12 hover:text-white flex-shrink-0 p-1 hover:scale-110 active:scale-95 transition-transform"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <path
                          d="M14.781 13.7198C14.8507 13.7895 14.906 13.8722 14.9437 13.9632C14.9814 14.0543 15.0008 14.1519 15.0008 14.2504C15.0008 14.349 14.9814 14.4465 14.9437 14.5376C14.906 14.6286 14.8507 14.7114 14.781 14.781C14.7114 14.8507 14.6286 14.906 14.5376 14.9437C14.4465 14.9814 14.349 15.0008 14.2504 15.0008C14.1519 15.0008 14.0543 14.9814 13.9632 14.9437C13.8722 14.906 13.7895 14.8507 13.7198 14.781L7.50042 8.56073L1.28104 14.781C1.14031 14.9218 0.94944 15.0008 0.750417 15.0008C0.551394 15.0008 0.360523 14.9218 0.219792 14.781C0.0790615 14.6403 3.92322e-09 14.4494 0 14.2504C-3.92322e-09 14.0514 0.0790615 13.8605 0.219792 13.7198L6.4401 7.50042L0.219792 1.28104C0.0790615 1.14031 0 0.94944 0 0.750417C0 0.551394 0.0790615 0.360523 0.219792 0.219792C0.360523 0.0790615 0.551394 0 0.750417 0C0.94944 0 1.14031 0.0790615 1.28104 0.219792L7.50042 6.4401L13.7198 0.219792C13.8605 0.0790615 14.0514 -3.92322e-09 14.2504 0C14.4494 3.92322e-09 14.6403 0.0790615 14.781 0.219792C14.9218 0.360523 15.0008 0.551394 15.0008 0.750417C15.0008 0.94944 14.9218 1.14031 14.781 1.28104L8.56073 7.50042L14.781 13.7198Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={handleToggle}
                    className="bg-[#2A9DF4] cursor-text px-6 py-3 md:px-8 md:py-3.5 lg:px-10 lg:py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-400 flex items-center gap-2 md:gap-3 pointer-events-auto"
                    aria-label="Search"
                  >
                    <span className="font-bold text-white tracking-wide text-xs md:text-sm lg:text-base">
                      SEARCH
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={handleToggle}
                className="bg-white rounded-full p-5 shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
                aria-label="Toggle menu"
              >
                <div className="w-4 h-3 relative flex flex-col justify-center items-center">
                  <span
                    className={`absolute w-full h-0.5 bg-[#19395F] rounded-full transition-all duration-300 ease-in-out ${
                      isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-[#19395F] rounded-full transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 ${
                      isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  />
                  <span
                    className={`absolute w-full h-0.5 bg-[#19395F] rounded-full transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "-rotate-45 top-1/2 -translate-y-1/2"
                        : "bottom-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white mx-4 rounded-2xl shadow-xl mb-4 overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors duration-200 active:scale-95"
              >
                BERANDA
              </Link>
              <Link
                href="/directory"
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors duration-200 active:scale-95"
              >
                UMKM
              </Link>
              <a
                href="#maps"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("#maps");
                }}
                className="w-full text-left px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors duration-200 active:scale-95"
              >
                PETA
              </a>
            </div>

            {/* Mobile Search */}
            <div className="px-4 pb-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center gap-3 border border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 flex-shrink-0 text-gray-600"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M16.3469 15.1531L13.0078 11.8125C14.009 10.5079 14.4764 8.87121 14.3153 7.23458C14.1541 5.59795 13.3765 4.08389 12.14 2.99955C10.9036 1.9152 9.30104 1.34177 7.65738 1.39556C6.01372 1.44935 4.45205 2.12635 3.28919 3.28922C2.12632 4.45209 1.44932 6.01375 1.39553 7.65741C1.34174 9.30107 1.91517 10.9037 2.99952 12.1401C4.08386 13.3765 5.59792 14.1541 7.23455 14.3153C8.87118 14.4764 10.5078 14.009 11.8125 13.0078L15.1544 16.3505C15.2329 16.429 15.3261 16.4912 15.4287 16.5337C15.5312 16.5762 15.6411 16.5981 15.7521 16.5981C15.8631 16.5981 15.973 16.5762 16.0756 16.5337C16.1781 16.4912 16.2713 16.429 16.3498 16.3505C16.4282 16.272 16.4905 16.1788 16.533 16.0763C16.5755 15.9737 16.5973 15.8638 16.5973 15.7528C16.5973 15.6418 16.5755 15.5319 16.533 15.4294C16.4905 15.3268 16.4282 15.2337 16.3498 15.1552L16.3469 15.1531ZM3.09375 7.87503C3.09375 6.92938 3.37416 6.00498 3.89953 5.21871C4.4249 4.43243 5.17163 3.81961 6.04529 3.45773C6.91895 3.09585 7.8803 3.00116 8.80777 3.18565C9.73524 3.37013 10.5872 3.8255 11.2558 4.49417C11.9245 5.16284 12.3799 6.01478 12.5644 6.94225C12.7489 7.86972 12.6542 8.83107 12.2923 9.70473C11.9304 10.5784 11.3176 11.3251 10.5313 11.8505C9.74504 12.3759 8.82064 12.6563 7.875 12.6563C6.60733 12.655 5.39196 12.1508 4.49558 11.2544C3.5992 10.3581 3.09505 9.14269 3.09375 7.87503Z"
                      fill="currentColor"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari UMKM...."
                    className="bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none w-full text-sm"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
