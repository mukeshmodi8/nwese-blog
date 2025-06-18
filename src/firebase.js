// src/firebase.js
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const updateBlogView = async (blogId) => {
  const blogRef = doc(db, "blogViews", blogId.toString());
  const snap = await getDoc(blogRef);

  if (snap.exists()) {
    await updateDoc(blogRef, { views: increment(1) });
  } else {
    await setDoc(blogRef, { views: 1 });
  }
};

export const fetchBlogView = async (blogId) => {
  const blogRef = doc(db, "blogViews", blogId.toString());
  const snap = await getDoc(blogRef);
  return snap.exists() ? snap.data().views : 0;
};
