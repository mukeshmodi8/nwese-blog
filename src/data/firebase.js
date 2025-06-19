// ✅ Firebase SDK imports
import { initializeApp } from "firebase/app";

// 🔵 Firestore for View Count
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

// 🔴 Realtime Database for Comments
import { getDatabase } from "firebase/database";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "blog-a330c",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
 databaseURL: "https://react-blog-comments-default-rtdb.firebaseio.com", // ✅ ADD THIS
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔵 Firestore DB (for Views)
const firestore = getFirestore(app);

// 🔴 Realtime DB (for Comments)
export const db = getDatabase(app);

// 🔵 Blog View Count: Firestore
export const updateBlogView = async (blogId) => {
  const blogRef = doc(firestore, "blogViews", blogId.toString());
  const snap = await getDoc(blogRef);

  if (snap.exists()) {
    await updateDoc(blogRef, { views: increment(1) });
  } else {
    await setDoc(blogRef, { views: 1 });
  }
};

export const fetchBlogView = async (blogId) => {
  const blogRef = doc(firestore, "blogViews", blogId.toString());
  const snap = await getDoc(blogRef);
  return snap.exists() ? snap.data().views : 0;
};
