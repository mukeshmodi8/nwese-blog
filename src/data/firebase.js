
import { initializeApp } from "firebase/app";
  
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

// 🌐 Realtime Database
import { getDatabase } from "firebase/database";

// ✅ Your full Firebase config (from Mr. Happy’s project)
const firebaseConfig = {
  apiKey: "AIzaSyCOH8OnAKoATdQwhus3MtY1WkNw_uKnyPw",
  authDomain: "mr-happy-blog-admin.firebaseapp.com",
  projectId: "mr-happy-blog-admin",
  storageBucket: "mr-happy-blog-admin.appspot.com",
  messagingSenderId: "898141460751",
  appId: "1:898141460751:web:9542cad34b5410153fc67a",
  measurementId: "G-TNNLNS4HZC",
  databaseURL: "https://react-blog-comments-default-rtdb.firebaseio.com",
};

// 🔧 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🗃️ Firestore and Realtime DB init
const firestore = getFirestore(app);
const db = getDatabase(app);

//
// ✅ Blog View Functions
//
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

//
// ✅ Exports for use everywhere
//
export { firestore, db };
