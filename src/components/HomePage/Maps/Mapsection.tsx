import React from "react";
import dynamic from "next/dynamic";
import { umkmList } from "@/data/umkmList";
import { Umkm } from "@/pages/api/umkm";

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
    <div
      id="maps"
      className="w-full h-ful min-h-screen px-20 py-32 flex flex-col gap-10"
    >
      <div className="top-section flex flex-col items-start gap-5">
        <p className="font-geist-mono text-[#19395F] font-medium text-xl">
          [ PETA ]
        </p>
        <div className="w-full h-full flex items-start justify-between">
          <div className="flex flex-col left-section gap-5">
            <h3 className="font-anton font-normal text-4xl text-[#161D04] tracking-[-2%]">
              Temukan UMKM di Sekitarmu
            </h3>
            <p className="font-inter text-[#515151] text-xl font-medium tracking-[-2%] max-w-8/12 leading-[150%]">
              Lihat peta interaktif berisi berbagai UMKM di sekitarmu. Temukan
              lokasi usaha dan dukung bisnis lokal dengan mudah.
            </p>
          </div>
          <div className="right-section">
            <button className="primary-button text-white font-semibold font-geist-mono text-sm rounded-4xl">
              LIHAT UMKM
            </button>
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
