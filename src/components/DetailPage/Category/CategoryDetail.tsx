import React from "react";
import { ArrowRight } from "lucide-react";

const CategoryDetail = () => {
  const handleNavigate = () => {
    console.log("Navigate to: /directory");
    window.location.href = "/directory";
  };

  return (
    <section className="relative bg-[#13569C] py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <g clip-path="url(#clip0_174_232)">
              <path
                d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28ZM0 0H17L7 10H0V0Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_174_232">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-anton text-3xl md:text-4xl lg:text-3xl text-center font-normal text-white mb-6 px-2 md:px-20 leading-tight">
          Temukan berbagai UMKM lokal yang siap kamu kunjungi, <br /> dukung,
          dan jadikan bagian dari keseharianmu!
        </h2>

        {/* CTA Button */}
        <button
          onClick={handleNavigate}
          className="group inline-flex items-center gap-3 bg-white text-[#2A9DF4] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/50"
        >
          LIHAT KATEGORI
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
export default CategoryDetail;
