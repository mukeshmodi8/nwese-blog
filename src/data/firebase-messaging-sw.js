// src/data/firebase-messaging.js

import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCOH8OnAKoATdQwhus3MtY1WkNw_uKnyPw",
  authDomain: "mr-happy-blog-admin.firebaseapp.com",
  projectId: "mr-happy-blog-admin",
  storageBucket: "mr-happy-blog-admin.appspot.com",
  messagingSenderId: "898141460751",
  appId: "1:898141460751:web:9542cad34b5410153fc67a",
};

// Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const messaging = getMessaging(app);

// ✅ Request Notification Permission + Get Token
export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BFV3IF4f3k4M4aDBxK6AbRWIY_rPgHX2_xj0TcvNH7eTMfJztCWl0jTV5fwCXBxzllZeDyuwZpX8QTjNd0dHqbU",
      });
      console.log("✅ FCM Token:", token);
    } else {
      console.warn("❌ Notification permission denied");
    }
  } catch (error) {
    console.error("🔥 FCM Token Error:", error);
  }
};

// ✅ Listen to foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
