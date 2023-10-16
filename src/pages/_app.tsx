import { type AppType } from "next/dist/shared/lib/utils";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWNyYXYiLCJhIjoiY2xucW1wNHhrMTZjdzJtcGZhZGowZXR3ZyJ9.HdBZMVZKNhY0B-Nd9-ZtAw";

const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: "AIzaSyBWK--62AgjofRvhMi-MQ4VOfJvSNVKpDc",
  authDomain: "funromap.firebaseapp.com",
  projectId: "funromap",
  storageBucket: "funromap.appspot.com",
  messagingSenderId: "584848473792",
  appId: "1:584848473792:web:13f277ea24fb016f54f725",
  measurementId: "G-5BHPNBT403",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    getAnalytics(app);
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
