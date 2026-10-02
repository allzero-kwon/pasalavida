import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwD34oEAKJLcyz3po4o97kexuUh4CXuG0",
  authDomain: "mywday-e2bbc.firebaseapp.com",
  databaseURL: "https://mywday-e2bbc-default-rtdb.firebaseio.com",
  projectId: "mywday-e2bbc",
  storageBucket: "mywday-e2bbc.appspot.com",
  messagingSenderId: "321387274831",
  appId: "1:321387274831:web:c5ba8941e711458e9e003a",
  measurementId: "G-EEBRQZXXCP"
};
const app = initializeApp(firebaseConfig);

export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);
