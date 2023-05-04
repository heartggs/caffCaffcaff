import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrb_7KYs0LaiQHy-2s2I9fDtVgO_fiOMI",
  authDomain: "caff-caff-caff.firebaseapp.com",
  projectId: "caff-caff-caff",
  storageBucket: "caff-caff-caff.appspot.com",
  messagingSenderId: "115423318210",
  appId: "1:115423318210:web:11edd7467bf3b46c77ab5b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
