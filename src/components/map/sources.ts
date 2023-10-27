import { SourceIds } from "./constants";
import mountainsData from "../../data/mountains.json";
import { type Feature, type Mountain, type Mountains } from "./types";

type SourceFunction = (map: mapboxgl.Map) => () => void;

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
    altitude: `${mountain.alt}m`,
  },
});

export const addMountainsSource: SourceFunction = (map) => {
  // Create a GeoJSON source with your data
  map.addSource(SourceIds.MOUNTAINS, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: mountains.map(mountainToFeature),
    },
    cluster: true,
    clusterRadius: 30,
  });

  return () => map.removeSource(SourceIds.MOUNTAINS);
};
