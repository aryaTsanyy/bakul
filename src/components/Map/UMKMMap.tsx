import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createCategoryIcon } from "@/pages/api/mapIcon";

interface MapDataItem {
  lat: number;
  lng: number;
  name: string;
  slug: string;
  categories: string[];
}

interface UMKMMapProps {
  data: MapDataItem[];
  center: [number, number];
}

const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
};
const MapInitializer = ({
  onMapReady,
  onZoomEnd,
  onMoveEnd,
}: {
  onMapReady: (map: L.Map) => void;
  onZoomEnd: () => void;
  onMoveEnd: () => void;
}) => {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
    map.on("zoomend", onZoomEnd);
    map.on("moveend", onMoveEnd);
  }, [map, onMapReady, onZoomEnd, onMoveEnd]);

  return null;
};

const UMKMMap: React.FC<UMKMMapProps> = ({ data, center }) => {
  const mapRef = useRef<L.Map | null>(null);

  const [visibleMarkers, setVisibleMarkers] = useState<MapDataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const LOAD_ON_ZOOM_THRESHOLD = 2;

  const initialBounds = useMemo(() => {
    if (data.length === 0) return undefined;
    return L.latLngBounds(
      data.map((item) => [item.lat, item.lng] as L.LatLngTuple)
    );
  }, [data]);

  useEffect(() => {
    const initialData = data.slice(0, ITEMS_PER_PAGE);
    setVisibleMarkers(initialData);
    setCurrentPage(1);
  }, [data]);

  const loadMoreMarkers = useCallback(() => {
    if (isLoading || visibleMarkers.length >= data.length) return;

    setIsLoading(true);

    setTimeout(() => {
      const start = currentPage * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const newMarkers = data.slice(start, end);

      setVisibleMarkers((prev) => [...prev, ...newMarkers]);
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);
    }, 300);
  }, [currentPage, data, visibleMarkers.length, isLoading]);

  const handleWhenReady = useCallback((map: L.Map) => {
    mapRef.current = map;
    setBounds(map.getBounds());
  }, []);

  const handleZoomEnd = useCallback(() => {
    if (!mapRef.current || isLoading) return;

    const currentZoom = mapRef.current.getZoom();
    if (
      currentZoom < LOAD_ON_ZOOM_THRESHOLD &&
      visibleMarkers.length < data.length
    ) {
      loadMoreMarkers();
    }
  }, [loadMoreMarkers, visibleMarkers.length, data.length, isLoading]);

  const handleMoveEnd = useCallback(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getBounds());
    }
  }, []);
  const filteredMarkers = useMemo(() => {
    if (!bounds) return visibleMarkers;
    return visibleMarkers.filter((marker) => {
      return bounds.contains([marker.lat, marker.lng]);
    });
  }, [visibleMarkers, bounds]);

  return (
    // Styling Modern: H-96 (Tinggi), Rounded-xl, Shadow-lg
    <div className="relative">
      <MapContainer
        center={center}
        zoom={13}
        bounds={initialBounds}
        scrollWheelZoom={false}
        className="h-[500px] w-full rounded-xl shadow-lg border-2 border-gray-100"
        style={{ zIndex: 1 }}
      >
        <MapRecenter center={center} />
        <MapInitializer
          onMapReady={handleWhenReady}
          onZoomEnd={handleZoomEnd}
          onMoveEnd={handleMoveEnd}
        />

        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          className="map-tiles"
        />
        {filteredMarkers.map((item) => {
          const primaryCategory = item.categories[0] || "Lainnya";
          const customIcon = createCategoryIcon(primaryCategory);

          return (
            <Marker
              key={item.slug}
              position={[item.lat, item.lng]}
              icon={customIcon}
            >
              <Popup>
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {item.categories.join(", ")}
                </div>
                <a
                  href={`/umkm/${item.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  Lihat Detail
                </a>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {isLoading && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-sm font-medium text-gray-700">
            Loading markers...
          </span>
        </div>
      )}

      {!isLoading && visibleMarkers.length < data.length && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={loadMoreMarkers}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <span>Load More Markers</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              {visibleMarkers.length}/{data.length}
            </span>
          </button>
        </div>
      )}

      {/* Info about loaded markers */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-blue-600">
            {visibleMarkers.length}
          </span>
          <span className="text-gray-500"> / {data.length} markers</span>
        </p>
      </div>
    </div>
  );
};

export default UMKMMap;
