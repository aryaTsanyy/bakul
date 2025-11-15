import React from "react";
import type { Umkm } from "@/pages/api/umkm";
import OverviewSection from "@/components/DetailPage/Overview/OverviewSection";
import StorySection from "@/components/DetailPage/Story/StorySection";
import GallerySection from "@/components/DetailPage/galleryUmkm/GallerySection";

// Interface untuk props
interface UMKMDetailPageProps {
  umkm: Umkm;
}

const UMKMDetailPage: React.FC<UMKMDetailPageProps> = ({ umkm }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <OverviewSection umkm={umkm} />
      <StorySection umkm={umkm} />
      <GallerySection photos={umkm.photos} title="LIHAT, KENALI, DUKUNG" />
      <div className="bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Produk & Layanan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {umkm.productsAndServices.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="text-gray-900 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white mt-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lokasi</h2>
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
            <iframe
              src={`https://www.google.com/maps?q=${umkm.location.lat},${umkm.location.lng}&hl=id&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UMKMDetailPage;
