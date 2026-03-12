// =============================================
//  SYNTHCORP — Firebase Configuration
// =============================================
//
//  SETUP (2 minutes) :
//  1. https://console.firebase.google.com → Nouveau projet (Spark = gratuit)
//  2. Ajouter une app Web (icône </>)
//  3. Dans "Build" → Realtime Database → Créer → Mode test
//  4. Copier votre config ci-dessous
//  5. Dans les Règles Realtime Database, mettre :
//     { "rules": { ".read": true, ".write": true } }
//
// =============================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCTeTH8Jp6EZ8NhtbV91Lu5ujHnWnyGiNM",
  authDomain: "synthcorp-game.firebaseapp.com",
  databaseURL:
    "https://synthcorp-game-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "synthcorp-game",
  storageBucket: "synthcorp-game.firebasestorage.app",
  messagingSenderId: "84794491582",
  appId: "84794491582:web:f4c41246eb8c12ae6354ef",
};

(function initFirebase() {
  try {
    if (typeof firebase === "undefined") throw new Error("Firebase SDK absent");
    if (FIREBASE_CONFIG.apiKey.startsWith("REPLACE"))
      throw new Error("Config non remplie");
    firebase.initializeApp(FIREBASE_CONFIG);
    window.synthDB = firebase.database();
    window.firebaseReady = true;
    console.log("[SYNTHCORP] Firebase connecté ✓");
  } catch (e) {
    window.synthDB = null;
    window.firebaseReady = false;
    console.warn("[SYNTHCORP] Firebase hors-ligne —", e.message);
  }
})();
