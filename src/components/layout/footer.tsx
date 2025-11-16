import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  title?: string;
  subtitle?: string;
  newsletterPlaceholders?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  submitButtonText?: string;
  navigationLinks?: FooterLink[];
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

const Footer: React.FC<FooterProps> = ({
  newsletterPlaceholders = {
    firstName: "NAMA DEPAN",
    lastName: "NAMA BELAKANG",
    email: "EMAIL",
  },
  submitButtonText = "SUBMIT",
  navigationLinks = [
    { label: "BERANDA", href: "/" },
    { label: "UMKM", href: "/directory" },
    { label: "PETA", href: "#maps" },
  ],
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <footer className="bg-[#13569C] text-white h-[620px] relative z-5">
      <div className="w-full h-full mx-auto flex flex-col items-stretch">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* NewsLetter */}
          <div className="space-y-4 sm:space-y-6 mb-5">
            {/* Navigation Mobile */}
            <div className="w-full h-full lg:mt-0">
              <nav className="w-full h-full overflow-hidden grid-rows-3">
                {navigationLinks.slice(0, 3).map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group flex relative items-center justify-center border border-white overflow-hidden min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]"
                    initial={{ backgroundColor: "#13569C" }}
                    animate={{
                      backgroundColor:
                        hoveredIndex === index ? "#ffffff" : "#13569C",
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <div className="relative flex items-center justify-center px-4 sm:px-6 border-b border-white last:border-b-0">
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{
                          rotateX: 90,
                          scaleY: 0,
                          transformOrigin: "center center",
                        }}
                        animate={{
                          rotateX: hoveredIndex === index ? 0 : 90,
                          scaleY: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      />
                      {/* Text container */}
                      <div className="relative z-10 flex items-center justify-center w-full">
                        <motion.div
                          animate={{
                            opacity: hoveredIndex === index ? 0 : 1,
                            scale: hoveredIndex === index ? 1.1 : 1,
                            color:
                              hoveredIndex === index ? "#000000" : "#FEFFFB",
                            fontStyle:
                              hoveredIndex === index ? "italic" : "normal",
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="font-geist-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#FEFFFB] whitespace-nowrap"
                        >
                          {link.label}
                        </motion.div>
                        <AnimatePresence>
                          {hoveredIndex === index && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-black italic whitespace-nowrap"
                              initial={{ x: "100%", rotateX: 0 }}
                              animate={{ x: "-100%", rotateX: 0 }}
                              transition={{
                                duration: 3,
                                ease: "linear",
                                repeat: Infinity,
                              }}
                              style={{ width: "200%" }}
                            >
                              <span>
                                {link.label} * {link.label} * {link.label} *{" "}
                                {link.label} * {link.label} * {link.label} *{" "}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </nav>
            </div>
            <div className="mb-4 sm:mb-6 mx-4 sm:mx-6">
              <p className="font-geist-mono text-xs sm:text-sm md:text-lg text-white font-medium tracking-[-2%] leading-relaxed">
                Buat akun untuk menerima informasi terbaru tentang UMKM kami dan
                promo menarik setiap bulannya
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 mx-4 sm:mx-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder={newsletterPlaceholders.firstName}
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full font-geist-mono col-span-1 sm:col-span-1 md:col-span-2 px-4 sm:px-6 py-3 sm:py-4 bg-transparent border border-white rounded-full text-sm sm:text-base text-white placeholder-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-400/80"
                />
                <input
                  type="text"
                  placeholder={newsletterPlaceholders.lastName}
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full font-geist-mono col-span-1 sm:col-span-1 md:col-span-2 px-4 sm:px-6 py-3 sm:py-4 bg-transparent border border-white rounded-full text-sm sm:text-base text-white placeholder-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-400/80"
                />
                <input
                  type="email"
                  placeholder={newsletterPlaceholders.email}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full font-geist-mono col-span-1 sm:col-span-1 md:col-span-2 px-4 sm:px-6 py-3 sm:py-4 bg-transparent border border-white rounded-full text-sm sm:text-base text-white placeholder-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-400/80"
                />
                <button
                  onClick={handleSubmit}
                  className="font-geist-mono col-span-1 sm:col-span-2 md:col-span-1 bg-white hover:bg-[#2273c8] hover:text-white rounded-full font-bold text-sm sm:text-base text-[#13569C] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 py-3 sm:py-4 whitespace-nowrap"
                >
                  {submitButtonText}
                </button>
              </div>
            </div>
            <div className="mx-4 sm:mx-6 mb-6 sm:mb-8">
              <div className="w-full max-w-[350px] sm:max-w-[440px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 588 243"
                  fill="none"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M0 240.625V0H65.2148C82.7148 0 95.4297 4.28385 103.359 12.8516C111.38 21.3281 115.391 35.3646 115.391 54.9609V65.4883C115.391 76.7904 113.34 85.9505 109.238 92.9688C105.228 99.987 99.0755 104.59 90.7812 106.777C101.628 109.512 108.874 115.938 112.52 126.055C116.257 136.081 118.125 148.34 118.125 162.832C118.125 178.418 116.667 192.044 113.75 203.711C110.833 215.378 105.547 224.447 97.8906 230.918C90.2344 237.389 79.3424 240.625 65.2148 240.625H0ZM47.0312 90.6445H56.875C61.3411 90.6445 64.2122 88.9128 65.4883 85.4492C66.7643 81.9857 67.4023 77.8385 67.4023 73.0078V48.8086C67.4023 41.0612 63.9844 37.1875 57.1484 37.1875H47.0312V90.6445ZM51.8164 198.242C64.3034 198.242 70.5469 192.318 70.5469 180.469V150.391C70.5469 143.555 69.4987 138.177 67.4023 134.258C65.3971 130.247 61.569 128.242 55.918 128.242H47.0312V197.969C49.0365 198.151 50.6315 198.242 51.8164 198.242Z"
                    fill="white"
                  />
                  <path
                    d="M116.222 240.625L139.464 0H221.085L243.917 240.625H198.39L194.972 201.797H165.988L162.98 240.625H116.222ZM169.405 163.379H191.28L180.753 41.0156H178.566L169.405 163.379Z"
                    fill="white"
                  />
                  <path
                    d="M247.483 240.625V0H295.061V96.3867L317.483 0H365.881L338.948 110.195L371.487 240.625H321.584L295.334 124.141V240.625H247.483Z"
                    fill="white"
                  />
                  <path
                    d="M424.271 242.812C404.219 242.812 389.453 237.207 379.974 225.996C370.495 214.694 365.755 198.105 365.755 176.23V0H412.513V174.316C412.513 178.327 412.741 182.201 413.197 185.938C413.653 189.583 414.701 192.591 416.341 194.961C417.982 197.331 420.625 198.516 424.271 198.516C428.008 198.516 430.697 197.376 432.337 195.098C433.978 192.728 434.981 189.674 435.345 185.938C435.801 182.201 436.029 178.327 436.029 174.316V0H482.787V176.23C482.787 198.105 478.047 214.694 468.568 225.996C459.089 237.207 444.323 242.812 424.271 242.812Z"
                    fill="white"
                  />
                  <path
                    d="M490.044 240.625V0H538.169V199.609H587.661V240.625H490.044Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="font-anton text-white font-normal text-2xl sm:text-4xl md:text-5xl tracking-[-2%]">
                Basis Aktivitas UMKM Lokal
              </h3>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 items-start">
          {/* Left Section - Newsletter */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 col-span-1 lg:col-span-3 mt-6 sm:mt-8 lg:mt-10 mb-5 mx-4 sm:mx-6 lg:mx-10">
            {/* Header Text */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <p className="font-geist-mono text-xs sm:text-sm md:text-lg lg:text-xl text-white font-medium tracking-[-2%] leading-relaxed">
                Buat akun untuk menerima informasi terbaru tentang UMKM kami dan
                promo menarik setiap bulannya
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-16 lg:mb-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder={newsletterPlaceholders.firstName}
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full font-geist-mono col-span-1 sm:col-span-1 md:col-span-2 px-4 sm:px-6 py-3 sm:py-4 bg-transparent border border-white rounded-full text-sm sm:text-base text-white placeholder-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-400/80"
                />
                <input
                  type="text"
                  placeholder={newsletterPlaceholders.lastName}
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full col-span-1 sm:col-span-1 md:col-span-2 px-4 sm:px-6 py-3 sm:py-4 bg-transparent border border-white rounded-full text-sm sm:text-base text-white placeholder-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-400/80"
                />
                <input
                  type="email"
                  placeholder={newsletterPlaceholders.email}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full col-span-1 sm:col-span-1 md:col-span-2 px-4 sm:px-6 py-3 sm:py-4 bg-transparent border border-white rounded-full text-sm sm:text-base text-white placeholder-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-300 hover:border-blue-400/80"
                />
                <button
                  onClick={handleSubmit}
                  className="col-span-1 sm:col-span-2 md:col-span-1 bg-white hover:bg-[#2273c8] hover:text-white rounded-full font-bold text-sm sm:text-base text-[#13569C] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 py-3 sm:py-4 whitespace-nowrap"
                >
                  {submitButtonText}
                </button>
              </div>
            </div>

            {/* Brand Title */}
            <div className="mt-6 sm:mt-8 bottom-0">
              <div className="w-full max-w-[350px] sm:max-w-[350px] md:max-w-[440px] lg:max-w-[525px] xl:max-w-[588px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 588 243"
                  fill="none"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M0 240.625V0H65.2148C82.7148 0 95.4297 4.28385 103.359 12.8516C111.38 21.3281 115.391 35.3646 115.391 54.9609V65.4883C115.391 76.7904 113.34 85.9505 109.238 92.9688C105.228 99.987 99.0755 104.59 90.7812 106.777C101.628 109.512 108.874 115.938 112.52 126.055C116.257 136.081 118.125 148.34 118.125 162.832C118.125 178.418 116.667 192.044 113.75 203.711C110.833 215.378 105.547 224.447 97.8906 230.918C90.2344 237.389 79.3424 240.625 65.2148 240.625H0ZM47.0312 90.6445H56.875C61.3411 90.6445 64.2122 88.9128 65.4883 85.4492C66.7643 81.9857 67.4023 77.8385 67.4023 73.0078V48.8086C67.4023 41.0612 63.9844 37.1875 57.1484 37.1875H47.0312V90.6445ZM51.8164 198.242C64.3034 198.242 70.5469 192.318 70.5469 180.469V150.391C70.5469 143.555 69.4987 138.177 67.4023 134.258C65.3971 130.247 61.569 128.242 55.918 128.242H47.0312V197.969C49.0365 198.151 50.6315 198.242 51.8164 198.242Z"
                    fill="white"
                  />
                  <path
                    d="M116.222 240.625L139.464 0H221.085L243.917 240.625H198.39L194.972 201.797H165.988L162.98 240.625H116.222ZM169.405 163.379H191.28L180.753 41.0156H178.566L169.405 163.379Z"
                    fill="white"
                  />
                  <path
                    d="M247.483 240.625V0H295.061V96.3867L317.483 0H365.881L338.948 110.195L371.487 240.625H321.584L295.334 124.141V240.625H247.483Z"
                    fill="white"
                  />
                  <path
                    d="M424.271 242.812C404.219 242.812 389.453 237.207 379.974 225.996C370.495 214.694 365.755 198.105 365.755 176.23V0H412.513V174.316C412.513 178.327 412.741 182.201 413.197 185.938C413.653 189.583 414.701 192.591 416.341 194.961C417.982 197.331 420.625 198.516 424.271 198.516C428.008 198.516 430.697 197.376 432.337 195.098C433.978 192.728 434.981 189.674 435.345 185.938C435.801 182.201 436.029 178.327 436.029 174.316V0H482.787V176.23C482.787 198.105 478.047 214.694 468.568 225.996C459.089 237.207 444.323 242.812 424.271 242.812Z"
                    fill="white"
                  />
                  <path
                    d="M490.044 240.625V0H538.169V199.609H587.661V240.625H490.044Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="font-anton text-white font-normal text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[-2%]">
                Basis Aktivitas UMKM Lokal
              </h3>
            </div>
          </div>

          {/* Right Section - Navigation Links with Stacked Design */}
          <div className="lg:pl-12 col-span-1 w-full h-full mt-6 lg:mt-0">
            <nav className="w-full h-full overflow-hidden flex flex-col">
              {navigationLinks.slice(0, 3).map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group block relative flex-1 border border-white overflow-hidden min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]"
                  initial={{ backgroundColor: "#13569C" }}
                  animate={{
                    backgroundColor:
                      hoveredIndex === index ? "#ffffff" : "#13569C",
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div className="relative h-full flex items-center justify-center px-4 sm:px-6 border-b border-white last:border-b-0">
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{
                        rotateX: 90,
                        scaleY: 0,
                        transformOrigin: "center center",
                      }}
                      animate={{
                        rotateX: hoveredIndex === index ? 0 : 90,
                        scaleY: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    />
                    {/* Text container */}
                    <div className="relative z-10 flex items-center justify-center w-full">
                      <motion.div
                        animate={{
                          opacity: hoveredIndex === index ? 0 : 1,
                          scale: hoveredIndex === index ? 1.1 : 1,
                          color: hoveredIndex === index ? "#000000" : "#FEFFFB",
                          fontStyle:
                            hoveredIndex === index ? "italic" : "normal",
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="font-geist-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#FEFFFB] whitespace-nowrap"
                      >
                        {link.label}
                      </motion.div>
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-black italic whitespace-nowrap"
                            initial={{ x: "100%", rotateX: 0 }}
                            animate={{ x: "-100%", rotateX: 0 }}
                            transition={{
                              duration: 3,
                              ease: "linear",
                              repeat: Infinity,
                            }}
                            style={{ width: "200%" }}
                          >
                            <span>
                              {link.label} * {link.label} * {link.label} *{" "}
                              {link.label} * {link.label} * {link.label} *{" "}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
