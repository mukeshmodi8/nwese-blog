import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCOH8OnAKoATdQwhus3MtY1WkNw_uKnyPw",
  authDomain: "mr-happy-blog-admin.firebaseapp.com",
  projectId: "mr-happy-blog-admin",
  storageBucket: "mr-happy-blog-admin.appspot.com",
  messagingSenderId: "898141460751",
  appId: "1:898141460751:web:9542cad34b5410153fc67a"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermissionAndGetToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BFV3IF4f3k4M4aDBxK6AbRWIY_rPgHX2_xjOTcvNH7eTMfJztCWI0jTV5fwCXBzzIlZeDyuwZpX8QTjNd0dHqbU"
    });
    if (token) {
      console.log("✅ FCM Token:", token);
    } else {
      console.warn("⚠️ No token received.");
    }
  } catch (err) {
    console.error("❌ Token error:", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) =>
    onMessage(messaging, (payload) => {
      resolve(payload);
    })
  );
