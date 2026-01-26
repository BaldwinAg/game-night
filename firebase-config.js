/**
 * Firebase Configuration for Game Night Scorekeeper
 * Version: 5.1.0
 * Project: game-night-9580e
 */

const firebaseConfig = {
  apiKey: "AIzaSyD8ZPchy5j0Qg2FTZVXq-yiHkHZuIqFMqo",
  authDomain: "game-night-9580e.firebaseapp.com",
  projectId: "game-night-9580e",
  storageBucket: "game-night-9580e.firebasestorage.app",
  messagingSenderId: "527974081115",
  appId: "1:527974081115:web:b766c983c40ad03f5b557e"
};

// Make config available globally for the app
window.FIREBASE_CONFIG = firebaseConfig;
window.FIREBASE_CONFIGURED = true;

console.log('[Firebase Config] Loaded for project:', firebaseConfig.projectId);
