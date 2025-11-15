import React from "react";
import dynamic from "next/dynamic";
import { umkmList } from "@/data/umkmList";
import { Umkm } from "@/pages/api/umkm";
import CircleExpandButton from "@/components/button/PrimaryButton";

const DynamicMap = dynamic(() => import("@/components/Map/UMKMMap"), {
  ssr: false,
});

const MapSection = () => {
  const defaultCenter: [number, number] = [-7.4319, 109.2461];
  const displayedUmkm: Umkm[] = umkmList;
  const mapData = displayedUmkm.map((umkm) => ({
    lat: umkm.location.lat,
    lng: umkm.location.lng,
    name: umkm.name,
    slug: umkm.slug,
    categories: umkm.categories,
  }));
  return (
    <div className="w-full h-full relative bg-[#f6f6f6] z-10 min-h-screen px-4 md:px-20 md:py-32 flex flex-col gap-10">
      <div className="top-section flex flex-col items-center md:items-start gap-5">
        <p className="font-geist-mono text-[#19395F] font-medium text-xl">
          [ PETA ]
        </p>
        <div className="w-full h-full flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="flex flex-col items-center md:items-start left-section gap-5 mb-5 md:mb-0">
            <h3 className="font-anton font-normal text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-start text-[#161D04] tracking-[-2%]">
              Temukan UMKM di Sekitarmu
            </h3>
            <p className="font-inter text-[#515151] text-sm md:text-xl text-center md:text-start font-medium tracking-[-2%] max-w-8/12 leading-[150%]">
              Lihat peta interaktif berisi berbagai UMKM di sekitarmu. Temukan
              lokasi usaha dan dukung bisnis lokal dengan mudah.
            </p>
          </div>
          <div className="right-section">
            <CircleExpandButton
              href="/directory"
              className="max-w-md py-2 pr-2 pl-4"
            />
          </div>
        </div>
      </div>
      <div className="map-section">
        <DynamicMap center={defaultCenter} data={mapData} />
      </div>
    </div>
  );
};

export default MapSection;
