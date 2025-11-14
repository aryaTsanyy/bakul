import React, { useMemo } from "react";
import InfiniteMenu from "@/components/DetailPage/infiniteMenu/InfiniteMenu";
import { Umkm } from "@/pages/api/umkm";

interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface UMKMPhotoGlobeProps {
  umkm: Umkm;
  height?: string;
  onPhotoClick?: (photoIndex: number) => void; // Callback saat photo diklik
}

const UMKMPhotoGlobe: React.FC<UMKMPhotoGlobeProps> = ({
  umkm,
  height = "600px",
}) => {
  // Transform photos menjadi format MenuItem
  const menuItems: MenuItem[] = useMemo(() => {
    return umkm.photos.map((photo, index) => ({
      image: photo,
      link: "#",
      title: `${umkm.name}`,
      description: `Foto ${index + 1} dari ${umkm.photos.length}`,
    }));
  }, [umkm.photos, umkm.name]);

  if (umkm.photos.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center bg-gray-100 rounded-2xl"
      >
        <p className="text-gray-500 text-lg">Tidak ada foto tersedia</p>
      </div>
    );
  }

  return (
    <div
      style={{ height, position: "relative" }}
      className="rounded-2xl overflow-hidden"
    >
      <InfiniteMenu items={menuItems} />
    </div>
  );
};

export default UMKMPhotoGlobe;
