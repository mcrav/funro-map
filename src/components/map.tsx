import mapboxgl from "mapbox-gl";
import { type MutableRefObject, useEffect, useRef, useState } from "react";
import mountainsData from "../data/mountains.json";

type Mountain = {
  name: string;
  id: number;
  lat: number;
  lng: number;
  alt: number;
  url: string;
};

type Mountains = {
  gold: Mountain[];
  silver: Mountain[];
  bronze: Mountain[];
};

type Feature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: FeatureProperties;
};

type FeatureProperties = {
  name: string;
  href: string;
  altitude: number;
};

const mountains = mountainsData as Mountains;

const mountainToFeature = (mountain: Mountain): Feature => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [mountain.lng, mountain.lat],
  },
  properties: {
    name: mountain.name,
    href: mountain.url,
    altitude: mountain.alt,
  },
});

const useCircles = ({
  map,
  mapIsLoaded,
  id,
  color,
  mountains,
}: {
  map: MutableRefObject<mapboxgl.Map | null>;
  mapIsLoaded: boolean;
  id: string;
  color: string;
  mountains: Mountain[];
}) => {
  useEffect(() => {
    if (!map.current || !mapIsLoaded) {
      return;
    }

    // Create a GeoJSON source with your data
    map.current.addSource(id, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: mountains.map(mountainToFeature),
      },
    });

    // Add a layer to render circles based on the source
    map.current.addLayer({
      id,
      type: "circle",
      source: id,
      paint: {
        "circle-color": color, // Customize the circle color
        // "circle-radius": [
        //   "interpolate",
        //   ["linear"],
        //   ["zoom"],
        //   5,
        //   3, // Zoom level 5 and below: Circle radius is 10
        //   10,
        //   5, // Zoom level 10: Circle radius is 20
        //   15,
        //   5, // Zoom level 15 and above: Circle radius is 30
        // ],
        "circle-radius": 5,
        "circle-stroke-color": "black",
        "circle-stroke-opacity": 1,
        "circle-stroke-width": 1,
      },
    });

    map.current.on("click", id, (e) => {
      if (!e.features || !e.features[0] || !map.current) {
        return;
      }
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const coordinates = e.features[0].geometry.coordinates as [
        number,
        number
      ];

      const properties = e.features[0].properties as FeatureProperties;

      new mapboxgl.Popup({ closeButton: false })
        .setLngLat(coordinates)
        .setHTML(
          properties
            ? `
<div class="mountain-popup">
  <a href="https://walkhighlands.co.uk/${properties.href}" target="_blank">${properties.name}</a>
  <p>${properties.altitude} m</p>
</div>
`
            : ""
        )
        .addTo(map.current);
    });

    // Cleanup the map instance when the component unmounts
    return () => {
      map.current?.removeLayer(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      map.current?.removeSource(id);
    };
  }, [map, mountains, mapIsLoaded, color, id]);
};

export const Map = () => {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const [lng] = useState(-4.247334);
  const [lat] = useState(57.022703);
  const [zoom] = useState(5.5);
  const [mapIsLoaded, setMapIsLoaded] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 5,
    });
    map.current.on("load", () => {
      setMapIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useCircles({
    map,
    mapIsLoaded: mapIsLoaded,
    mountains: mountains.bronze,
    color: "#a90",
    id: "bronze",
  });
  useCircles({
    map,
    mapIsLoaded: mapIsLoaded,
    mountains: mountains.silver,
    color: "silver",
    id: "silver",
  });
  useCircles({
    map,
    mapIsLoaded: mapIsLoaded,
    mountains: mountains.gold,
    color: "gold",
    id: "gold",
  });

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapContainer} className="map-container h-full w-full" />
    </div>
  );
};
