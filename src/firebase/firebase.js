import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChBqpARqTCgqI_8rQNp3-hu_lbavrGBoE",
  authDomain: "citypulse-9080d.firebaseapp.com",
  projectId: "citypulse-9080d",
  storageBucket: "citypulse-9080d.appspot.com",
  messagingSenderId: "619395783157",
  appId: "1:619395783157:web:4c9fbe8d24d75edbfd68bc",
  measurementId: "G-QGCQBRJKK5"
};

// Initialize Firebase app
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase app:', error);
  throw error;
}

// Initialize Auth
let auth;
try {
  auth = getAuth(app);
  console.log('Firebase auth initialized successfully');
} catch (error) {
  console.error('Failed to initialize Firebase auth:', error);
  throw error;
}

// Initialize Analytics only on client side and if supported
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then(yes => {
      if (yes) {
        return getAnalytics(app);
      }
      return null;
    })
    .then(analyticsInstance => {
      analytics = analyticsInstance;
      if (analyticsInstance) {
        console.log('Firebase analytics initialized successfully');
      } else {
        console.log('Firebase analytics not supported');
      }
    })
    .catch((error) => {
      console.warn('Firebase Analytics failed to initialize:', error);
    });
}

// Test Firebase connection
if (typeof window !== 'undefined') {
  console.log('Firebase configuration:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    appInitialized: !!app,
    authInitialized: !!auth
  });
}

export { auth, analytics, app };