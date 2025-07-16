import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


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


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default async function handler(req, res) {
  const baseUrl = "https://nwese-blog-3z8e.vercel.app";

  try {
    const blogsSnapshot = await getDocs(collection(firestore, "blogs"));

    const urls = blogsSnapshot.docs.map((doc) => {
      const blogData = doc.data();
      const slug = blogData.id || doc.id;

      return `
        <url>
          <loc>${baseUrl}/blogs/${slug}</loc>
          <priority>0.8</priority>
        </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <priority>1.0</priority>
      </url>
      ${urls.join("\n")}
    </urlset>`;

   
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(sitemap);
  } catch (err) {
    console.error("🔥 Sitemap Error:", err);
    res.status(500).send("Error generating sitemap");
  }
}
