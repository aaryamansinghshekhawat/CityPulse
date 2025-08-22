import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChBqpARqTCgqI_8rQNp3-hu_lbavrGBoE",
  authDomain: "citypulse-9080d.firebaseapp.com",
  projectId: "citypulse-9080d",
  storageBucket: "citypulse-9080d.firebasestorage.app",
  messagingSenderId: "619395783157",
  appId: "1:619395783157:web:4c9fbe8d24d75edbfd68bc",
  measurementId: "G-QGCQBRJKK5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics, app };