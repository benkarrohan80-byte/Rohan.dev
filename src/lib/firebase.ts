import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "ai-studio-applet-webapp-8d72b",
  appId: "1:673751937993:web:9c4f5d8121f31c2ec46e18",
  apiKey: "AIzaSyAn6jPk72GxH2z8zKd-nV3FSAAkqQ3ENRA",
  authDomain: "ai-studio-applet-webapp-8d72b.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-geminiaistudio-2ee6d619-95b9-44af-82c7-b4f004e0a22b",
  storageBucket: "ai-studio-applet-webapp-8d72b.firebasestorage.app",
  messagingSenderId: "673751937993",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
