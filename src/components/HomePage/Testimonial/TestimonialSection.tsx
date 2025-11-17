import React, { useState, useEffect } from "react";
import Image from "next/image";
import { testimonialList } from "@/data/testimonialList";

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");

    const currentFeedback = testimonialList[activeIndex].komentar;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentFeedback.length) {
        setDisplayedText(currentFeedback.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [activeIndex]);

  return (
    <div className="min-h-screen testimoni-sanier bg-transparent flex items-center justify-center py-20 px-4">
      <div className="w-full">
        <div className="text-center mb-16 gap-4 flex flex-col items-center">
          <div className="inline-block">
            <span className="text-[#19395F] font-geist-mono  text-sm tracking-wider animate-pulse">
              [ TESTIMONI ]
            </span>
          </div>
          <h2 className="text-4xl font-anton uppercase font-normal tracking-[-2%] md:text-5xl text-[#161D04]">
            Apa Kata Mereka?
          </h2>
        </div>

        <div className="flex justify-center items-end gap-6 mb-12">
          {testimonialList.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`relative transition-all duration-500 ease-out transform focus:outline-none group ${
                activeIndex === index
                  ? "scale-110 -translate-y-4 z-10"
                  : "scale-90 opacity-40 blur-[2px] hover:opacity-60 hover:scale-95"
              }`}
            >
              <div className="relative">
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#13569C] to-[#2A9DF4] rounded-3xl blur-xl opacity-60 animate-pulse"></div>
                )}
                <div
                  className={`relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 transition-all duration-500 ${
                    activeIndex === index
                      ? "border-[#2A9DF4] shadow-2xl shadow-blue-500/50"
                      : "border-slate-300 shadow-lg"
                  }`}
                >
                  <Image
                    width={80}
                    height={80}
                    src={testimonial.imageOwner}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-500 ${
                      activeIndex === index ? "opacity-0" : "opacity-100"
                    }`}
                  ></div>
                </div>

                {/* Active indicator */}
                {activeIndex === index && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#2A9DF4] rounded-full animate-bounce"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full blur-3xl opacity-30 -z-10"></div>

            {/* Quote icon */}
            <div className="text-[#2A9DF4] mb-6 opacity-20">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Feedback text with fixed height */}
            <div className="mb-8 min-h-[120px] flex items-center">
              <p className="text-[16px] font-anton md:text-3xl text-[#081F36] font-normal leading-[150%] text-center">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-1 h-6 bg-[#2A9DF4] ml-1 animate-blink"></span>
                )}
              </p>
            </div>

            {/* Owner info */}
            <div className="flex items-center justify-center gap-4 border-t border-slate-200 pt-6">
              <div className="transition-all flex items-center gap-3 justify-center duration-500">
                <h4 className="text-[12px] sm:text-lg font-geist-mono font-medium text-[#19395F]">
                  {testimonialList[activeIndex].name}
                </h4>
                <div className="w-1 h-1 items-center bg-[#2A9DF4] rounded-full"></div>
                <p className="text-[12px] sm:text-lg text-[#19395F] font-geist-mono font-medium">
                  {testimonialList[activeIndex].business}
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2 mt-6 justify-center">
              {testimonialList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? "w-12 bg-[#2A9DF4]"
                      : "w-6 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation hint */}
        <div className="text-center mt-8 animate-bounce">
          <p className="text-sm text-slate-500">
            Klik avatar untuk melihat testimoni lainnya
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;
