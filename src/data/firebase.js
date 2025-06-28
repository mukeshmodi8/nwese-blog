// blog-site/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOH8OnAKoATdQwhus3MtY1WkNw_uKnyPw",
  authDomain: "mr-happy-blog-admin.firebaseapp.com",
  projectId: "mr-happy-blog-admin",
  storageBucket: "mr-happy-blog-admin.appspot.com",
  messagingSenderId: "898141460751",
  appId: "1:898141460751:web:9542cad34b5410153fc67a",
  databaseURL: "https://react-blog-comments-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);     // 🔥 For reading blogs
export const rtdb = getDatabase(app);    // 🔥 For views/comments

// ✅ View Count Functions
export const updateBlogView = async (blogId) => {
  const viewRef = ref(rtdb, `views/${blogId}`);
  const snapshot = await get(viewRef);
  if (snapshot.exists()) {
    const currentViews = snapshot.val();
    await set(viewRef, currentViews + 1);
  } else {
    await set(viewRef, 1);
  }
};

export const fetchBlogView = async (blogId) => {
  const viewRef = ref(rtdb, `views/${blogId}`);
  const snapshot = await get(viewRef);
  return snapshot.exists() ? snapshot.val() : 0;
};
