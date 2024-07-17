// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrmyELf7gBxx-UMAwvG1SUf2Xxyev1d18",
  authDomain: "poketcg-a992e.firebaseapp.com",
  databaseURL: "https://poketcg-a992e-default-rtdb.firebaseio.com",
  projectId: "poketcg-a992e",
  storageBucket: "poketcg-a992e.appspot.com",
  messagingSenderId: "823959552680",
  appId: "1:823959552680:web:b016823b67f6f8d54a389d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
