import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/router";
import { umkmList } from "@/data/umkmList";
import type { Category } from "@/pages/api/umkm";
import Image from "next/image";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

const UMKMPage = () => {
  const router = useRouter();
  const { search: querySearch, category: queryCategory } = router.query;
  const [searchQuery, setSearchQuery] = useState("");
  const [, setSearchDefault] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const allCategories = umkmList.flatMap((item) => item.categories);
    const uniqueCategories = Array.from(new Set(allCategories));
    return uniqueCategories.sort();
  }, []);

  useEffect(() => {
    if (querySearch && typeof querySearch === "string") {
      setSearchQuery(querySearch);
    }
  }, [querySearch]);
  useEffect(() => {
    if (queryCategory && typeof queryCategory === "string") {
      const decodedCategory = decodeURIComponent(queryCategory);
      if (categories.includes(decodedCategory as Category)) {
        setSelectedCategories([decodedCategory as Category]);
      }
    }
  }, [queryCategory, categories]);

  const filteredData = useMemo(() => {
    return umkmList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.searchKeywords.some((keyword) =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchCategory =
        selectedCategories.length === 0 ||
        item.categories.some((cat) => selectedCategories.includes(cat));

      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategories]);

  const displayedData = useMemo(() => {
    return filteredData.slice(0, displayedCount);
  }, [filteredData, displayedCount]);

  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategories]);

  const loadMore = useCallback(() => {
    if (displayedCount >= filteredData.length || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, filteredData.length)
      );
      setIsLoading(false);
    }, 300);
  }, [displayedCount, filteredData.length, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < filteredData.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, displayedCount, filteredData.length]);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const removeCategory = (category: Category) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };
  const clearSearch = () => {
    setSearchQuery("");
    setSearchDefault("");
    router.push("/directory", undefined, { shallow: true });
  };

  const hasMoreData = displayedCount < filteredData.length;

  return (
    <div className="min-h-screen w-full bg-transparent">
      {/* Search Bar */}
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="flex flex-col items-center justify-center w-full px-4">
          <div
            className={`relative group flex items-center justify-center transition-all duration-500 ease-out ${
              isFocused
                ? "w-full max-w-2xl"
                : "w-[200px] sm:w-[250px] md:w-[200px]"
            }`}
          >
            <Search
              className={`absolute top-1/2 transform -translate-y-1/2 text-[#2a9df4] w-5 h-5 transition-all duration-300 ${
                isFocused
                  ? "group-hover:scale-110 left-4 text-[#2a9df4]"
                  : "scale-100 left-6 text-white"
              }`}
            />
            <div
              className={`absolute pointer-events-none top-1/2 right-11 transform -translate-y-1/2 text-white transition-all duration-300 ${
                isFocused ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2 className="font-geist-mono font-semibold tracking-tight text-[18px]">
                Cari UMKM
              </h2>
            </div>
            <input
              type="text"
              placeholder={isFocused ? "CARI UMKM..." : ""}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (!searchQuery) {
                  setIsFocused(false);
                }
              }}
              className={`w-full pl-2 pr-4 py-3 sm:py-4 rounded-full text-gray-800 font-medium text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transition-all duration-500 hover:shadow-xl ${
                isFocused
                  ? "pl-12 pr-12 "
                  : "pl-2 pr-2 text-center text-white font-bold bg-[#2a9df4]"
              }`}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:rotate-6 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-24 xl:px-36 py-8 sm:py-12 lg:py-16">
        {/* Filter cta */}
        <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-start mb-8 sm:mb-12 gap-4">
          <div className="w-full flex items-center text-xl text-gray-600">
            <span className="font-medium">[ UMKM ]</span>
          </div>

          <div className="flex sm:flex items-end sm:items-center justify-end sm:justify-start gap-3 w-full sm:w-full flex-wrap">
            {/* Selected Category Tags */}
            {selectedCategories.map((category) => (
              <div
                key={category}
                className="group hidden sm:flex relative items-center gap-0 hover:gap-3 px-5 hover:px-3.5 py-3 bg-gray-100 hover:bg-gray-800 rounded-full animate-fade-in transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A9DF490] to-[#2A9DF4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>

                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white/20 group-hover:w-full group-hover:h-full transition-all duration-500"></div>
                </div>

                {/* Category Text - Centered by default, shifts when button appears */}
                <span className="relative z-10 font-bold cursor-default text-gray-900 group-hover:text-white uppercase text-sm tracking-wide transition-all duration-300">
                  {category}
                </span>

                {/* Remove Button - Width collapses to 0, expands on hover */}
                <button
                  onClick={() => removeCategory(category)}
                  className="relative z-10 flex items-center cursor-pointer justify-center h-5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 opacity-0 scale-0 w-0 group-hover:opacity-100 group-hover:scale-100 group-hover:w-5 hover:rotate-90 overflow-hidden"
                  aria-label={`Remove ${category} filter`}
                >
                  <X
                    className="w-3 h-3 text-white flex-shrink-0"
                    strokeWidth={2.5}
                  />
                </button>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
            {/* Filter Button with Custom Icon */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full border-2 border-gray-800 hover:bg-gray-50 transition-all group relative"
              aria-label="Filter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                className="group-hover:scale-110 group-hover:rotate-360 transition-transform duration-200"
              >
                <path
                  d="M19.3658 0.893462C19.2504 0.626753 19.0591 0.399864 18.8157 0.241013C18.5723 0.0821617 18.2877 -0.00164211 17.997 2.43794e-05H1.49705C1.20673 0.000596404 0.922821 0.0854027 0.679756 0.244155C0.436692 0.402908 0.244919 0.628785 0.127702 0.894384C0.0104851 1.15998 -0.0271385 1.45389 0.0193952 1.74045C0.065929 2.02701 0.19462 2.29391 0.389858 2.50877L0.397358 2.51721L6.74705 9.29721V16.5C6.74698 16.7715 6.8206 17.0379 6.96004 17.2708C7.09948 17.5038 7.29953 17.6945 7.53885 17.8227C7.77816 17.9508 8.04778 18.0117 8.31894 17.9986C8.59011 17.9856 8.85266 17.8993 9.07861 17.7488L12.0786 15.7481C12.2843 15.6112 12.4529 15.4255 12.5695 15.2076C12.6861 14.9898 12.7471 14.7465 12.747 14.4994V9.29721L19.0977 2.51721L19.1052 2.50877C19.3025 2.29489 19.4324 2.02764 19.4788 1.74037C19.5251 1.4531 19.4858 1.15854 19.3658 0.893462ZM11.4514 8.4919C11.3217 8.62945 11.2487 8.81094 11.247 9.00002V14.4994L8.24705 16.5V9.00002C8.2471 8.80958 8.17471 8.62624 8.04454 8.48721L1.49705 1.50002H17.997L11.4514 8.4919Z"
                  fill="black"
                />
              </svg>
              {/* Badge showing number of selected filters */}
              {selectedCategories.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2A9DF4] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {selectedCategories.length}
                </span>
              )}
            </button>
            {/* Clear All Button - only show when multiple categories selected */}
            {selectedCategories.length > 1 && (
              <button
                onClick={clearAllCategories}
                className="hidden sm:block px-4 py-2 text-sm cursor-pointer font-medium text-gray-600 hover:text-gray-900 hover:scale-105 underline transition-transform duration-200"
              >
                Hapus Semua
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600 text-sm">
          Menampilkan {displayedData.length} dari {filteredData.length} UMKM
        </div>

        {/* UMKM Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 transition-all duration-200">
          {displayedData.map((umkm, index) => (
            <Link
              href={`/${umkm.slug}`}
              key={umkm.id}
              className="group bg-transparent rounded-2xl shadow-md sm:shadow-none shadow-[#2A9DF4] h-full overflow-hidden"
              style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 50}ms` }}
            >
              <div
                key={umkm.id}
                className="relative h-full group flex flex-col bg-transparent rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 50}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    width={400}
                    height={400}
                    src={umkm.photos[0]}
                    alt={umkm.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=350&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {umkm.averageRating}
                    </span>
                  </div>
                </div>
                {/* ContentContainer */}
                <div className="flex flex-1 flex-col p-3">
                  <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                    {umkm.categories.join(" · ")}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2A9DF4] transition-colors line-clamp-2">
                    {umkm.name}
                  </h3>
                  <div
                    className="relative overflow-hidden"
                    style={{ minHeight: "2.5rem" }}
                  >
                    <p className="md:hidden text-sm text-gray-600 italic line-clamp-2">
                      {umkm.tagline}
                    </p>

                    {/* Desktop: Show on Hover dengan Smooth Animation */}
                    <div className="hidden md:block">
                      <p className="text-sm text-gray-600 italic line-clamp-2 transition-all duration-300 transform group-hover:translate-y-0 group-hover:opacity-100 translate-y-2 opacity-0">
                        {umkm.tagline}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-[2px] bg-[#2A9DF4]"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Loading Indicator & Observer Target */}
        {hasMoreData && (
          <div
            ref={observerTarget}
            className="flex justify-center items-center py-8"
          >
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">
                  Memuat lebih banyak...
                </span>
              </div>
            )}
          </div>
        )}

        {/* End of Results */}
        {!hasMoreData && displayedData.length > 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            Semua UMKM telah ditampilkan
          </div>
        )}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              UMKM tidak ditemukan
            </h3>
            <p className="text-gray-600 mb-3">
              Coba gunakan kata kunci lain atau ubah filter kategori
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="px-6 py-2 bg-[#2A9DF4] text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Hapus Pencarian
              </button>
            )}
          </div>
        )}
      </div>

      {showFilterModal && (
        <div className="fixed h-screen inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-bold text-gray-900">
                Filter Kategori
              </h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between ${
                    selectedCategories.includes(cat)
                      ? "bg-[#2A9DF4] text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategories.includes(cat) && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Modal Footer with Clear All Button */}
            {selectedCategories.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <button
                  onClick={() => {
                    clearAllCategories();
                    setShowFilterModal(false);
                  }}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl transition-colors"
                >
                  Hapus Semua Filter
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out backwards;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UMKMPage;
