import { type FirebaseOptions, initializeApp } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBWK--62AgjofRvhMi-MQ4VOfJvSNVKpDc",
  authDomain: "funromap.firebaseapp.com",
  projectId: "funromap",
  storageBucket: "funromap.appspot.com",
  messagingSenderId: "584848473792",
  appId: "1:584848473792:web:13f277ea24fb016f54f725",
  measurementId: "G-5BHPNBT403",
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
firebaseApp.automaticDataCollectionEnabled = false;
