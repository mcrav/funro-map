export type Feature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: FeatureProperties;
};

export type FeatureProperties = {
  name: string;
  href: string;
  altitude: string;
  rank: string;
};

export type Mountain = {
  name: string;
  id: number;
  lat: number;
  lng: number;
  alt: number;
  url: string;
  rank: string;
};

export type Mountains = Mountain[];
