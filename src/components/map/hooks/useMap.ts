import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { addMountainsSource } from "../sources";
import {
  addClusterCountsLayer,
  addClustersLayer,
  addPointLabelsLayer,
  addPointsLayer,
} from "../layers";

export const useMap = () => {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const [lng] = useState(-4.247334);
  const [lat] = useState(57.022703);
  const [zoom] = useState(5.5);
  const [mapIsLoaded, setMapIsLoaded] = useState(false);

  // Initialize map
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

  // Populate map
  useEffect(() => {
    if (!map.current || !mapIsLoaded) {
      return;
    }

    const cleanupMountainsSource = addMountainsSource(map.current);
    const cleanupClustersLayer = addClustersLayer(map.current);
    const cleanupClusterCountsLayer = addClusterCountsLayer(map.current);
    const cleanupPointsLayer = addPointsLayer(map.current);
    const cleanupPointLabelsLayer = addPointLabelsLayer(map.current);

    // Cleanup the map instance when the component unmounts
    return () => {
      cleanupMountainsSource();
      cleanupClustersLayer();
      cleanupClusterCountsLayer();
      cleanupPointsLayer();
      cleanupPointLabelsLayer();
    };
  }, [map, mapIsLoaded]);

  return {
    map,
    mapContainer,
  };
};
