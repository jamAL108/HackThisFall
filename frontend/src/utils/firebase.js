/* eslint-disable no-unused-vars */

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCqDWBBRBwvFq6iqk9sCmdEf5U4a2EJNME",
  authDomain: "neurosfood.firebaseapp.com",
  projectId: "neurosfood",
  storageBucket: "neurosfood.appspot.com",
  messagingSenderId: "215963733893",
  appId: "1:215963733893:web:5c0332fba6a30c717bbeec"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);