import mapboxgl, { type GeoJSONSource } from "mapbox-gl";
import { type MutableRefObject, useEffect, useRef, useState } from "react";
import mountainsData from "../data/mountains.json";

type Mountain = {
  name: string;
  id: number;
  lat: number;
  lng: number;
  alt: number;
  url: string;
  rank: string;
};

type Mountains = Mountain[];

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
  rank: string;
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
    rank: mountain.rank,
    href: mountain.url,
    altitude: mountain.alt,
  },
});

const useCircles = ({
  map,
  mapIsLoaded,
  mountains,
}: {
  map: MutableRefObject<mapboxgl.Map | null>;
  mapIsLoaded: boolean;
  mountains: Mountain[];
}) => {
  useEffect(() => {
    if (!map.current || !mapIsLoaded) {
      return;
    }

    const sourceId = "moutain-source";

    // Create a GeoJSON source with your data
    map.current.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: mountains.map(mountainToFeature),
      },
      cluster: true,
      clusterRadius: 20,
    });

    // Cluster layer
    map.current.addLayer({
      id: "clusters",
      type: "circle",
      source: sourceId,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1",
        ],
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["get", "point_count"],
          0,
          0,
          2,
          8,
          29,
          20,
        ],
        "circle-opacity": 0.6,
      },
    });
    map.current.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: sourceId,
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    // Add a layer to render circles based on the source
    map.current.addLayer({
      id: "points",
      type: "circle",
      source: sourceId,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": [
          "match",
          ["get", "rank"],
          "gold",
          "gold",
          "silver",
          "silver",
          "bronze",
          "#a90",
          "blue",
        ],
        "circle-radius": 6,
        "circle-stroke-color": "black",
        "circle-stroke-opacity": 1,
        "circle-stroke-width": 1,
      },
    });

    map.current.on("click", "clusters", (e) => {
      if (!map.current) {
        return;
      }
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      if (!features[0]) return;
      if (!features[0].properties) return;
      const clusterId = features[0].properties.cluster_id as number;
      const source = map.current.getSource(sourceId) as GeoJSONSource;
      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || !map.current || !features[0]) return;

        // @ts-ignore
        const feature = features[0] as Feature;
        map.current.easeTo({
          center: feature.geometry.coordinates,
          zoom: zoom,
        });
      });
    });

    map.current.on("click", "points", (e) => {
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
      map.current?.removeLayer("points");
      map.current?.removeLayer("clusters");
      map.current?.removeLayer("cluster-count");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      map.current?.removeSource("mountain-source");
    };
  }, [map, mountains, mapIsLoaded]);
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
    mountains: mountains,
  });

  return (
    <div className="relative h-screen w-screen">
      <div ref={mapContainer} className="map-container h-full w-full" />
    </div>
  );
};
