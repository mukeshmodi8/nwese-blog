// src/data/blogService.js
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export const fetchAllBlogs = async () => {
  try {
    const blogsCol = collection(firestore, "blogs");
    const blogsSnapshot = await getDocs(blogsCol);
    const blogs = blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
