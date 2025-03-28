import { useMap } from "./hooks/useMap";

export const Map = () => {
  const { mapContainer } = useMap();

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapContainer} className="map-container h-full w-full" />
    </div>
  );
};
