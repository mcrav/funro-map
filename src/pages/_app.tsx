import { type AppType } from "next/dist/shared/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react";
import { firebaseApp } from "~/utils/firebase";
import { CookiePopup } from "~/components/cookie-popup";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWNyYXYiLCJhIjoiY2xucW1wNHhrMTZjdzJtcGZhZGowZXR3ZyJ9.HdBZMVZKNhY0B-Nd9-ZtAw";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <CookiePopup />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
