import mapboxgl, { type GeoJSONSource } from "mapbox-gl";
import { LayerIds, SourceIds } from "./constants";
import { type Feature, type FeatureProperties } from "./types";
import { Colors } from "~/constants/colors";

type LayerFunction = (map: mapboxgl.Map) => () => void;

export const addPointsLayer: LayerFunction = (map) => {
  // Add a layer to render circles based on the source
  map.addLayer({
    id: LayerIds.POINTS,
    type: "circle",
    source: SourceIds.MOUNTAINS,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": [
        "match",
        ["get", "rank"],
        "gold",
        Colors.GOLD,
        "silver",
        Colors.SILVER,
        "bronze",
        Colors.BRONZE,
        "blue",
      ],
      "circle-radius": 6,
      "circle-stroke-color": "black",
      "circle-stroke-opacity": 1,
      "circle-stroke-width": 1,
    },
  });

  map.on("click", LayerIds.POINTS, (e) => {
    if (!e.features || !e.features[0]) {
      return;
    }
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const coordinates = e.features[0].geometry.coordinates as [number, number];

    const properties = e.features[0].properties as FeatureProperties;

    map.easeTo({ center: coordinates, zoom: Math.max(8, map.getZoom()) });

    new mapboxgl.Popup({ closeButton: false })
      .setLngLat(coordinates)
      .setHTML(
        properties
          ? `
<div class="mountain-popup">
  <a href="https://walkhighlands.co.uk/${properties.href}" target="_blank">${properties.name}</a>
  <p>${properties.altitude}</p>
</div>
`
          : ""
      )
      .addTo(map);
  });

  return () => map.removeLayer(LayerIds.POINTS);
};

export const addPointLabelsLayer: LayerFunction = (map) => {
  map.addLayer({
    id: LayerIds.POINT_LABELS_ALTITUDE,
    type: "symbol",
    source: SourceIds.MOUNTAINS,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": ["get", "altitude"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": ["step", ["zoom"], 0, 8.5, 12],
      "text-offset": [0, 1.6],
    },
  });
  map.addLayer({
    id: LayerIds.POINT_LABELS,
    type: "symbol",
    source: SourceIds.MOUNTAINS,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": ["get", "name"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": ["step", ["zoom"], 0, 8.5, 12],
      "text-offset": [0, -1.6],
    },
  });

  return () => {
    map.removeLayer(LayerIds.POINT_LABELS);
    map.removeLayer(LayerIds.POINT_LABELS_ALTITUDE);
  };
};

export const addClustersLayer: LayerFunction = (map) => {
  // Cluster layer
  map.addLayer({
    id: LayerIds.CLUSTERS,
    type: "circle",
    source: SourceIds.MOUNTAINS,
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

  map.on("click", LayerIds.CLUSTERS, (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [LayerIds.CLUSTERS],
    });
    if (!features[0]) return;
    if (!features[0].properties) return;
    const clusterId = features[0].properties.cluster_id as number;
    const source = map.getSource(SourceIds.MOUNTAINS) as GeoJSONSource;
    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !features[0]) return;

      // @ts-ignore
      const feature = features[0] as Feature;
      map.easeTo({
        center: feature.geometry.coordinates,
        zoom: zoom,
      });
    });
  });

  return () => map.removeLayer(LayerIds.CLUSTERS);
};

export const addClusterCountsLayer: LayerFunction = (map) => {
  map.addLayer({
    id: LayerIds.CLUSTER_COUNTS,
    type: "symbol",
    source: SourceIds.MOUNTAINS,
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  return () => map.removeLayer(LayerIds.CLUSTER_COUNTS);
};
