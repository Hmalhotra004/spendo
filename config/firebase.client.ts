import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB34BOl2GCfkMH_VMx_EyBY8B-oJTHsRIw",
  authDomain: "spendo-6958d.firebaseapp.com",
  projectId: "spendo-6958d",
  storageBucket: "spendo-6958d.firebasestorage.app",
  messagingSenderId: "558585437094",
  appId: "1:558585437094:web:373e65a4a4d10b83d14d67",
  measurementId: "G-PLDJP0R8D5",
  // apiKey: process.env.EXPO_PUBLIC_API_KEY,
  // authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  // projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  // appId: process.env.EXPO_PUBLIC_APP_ID,
  // measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
