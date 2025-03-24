import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD2PWJwI-cy52qdRtPX2WV3BgSG5pCmmg",
  authDomain: "waste-reduction-app-218ca.firebaseapp.com",
  projectId: "waste-reduction-app-218ca",
  storageBucket: "waste-reduction-app-218ca.firebasestorage.app",
  messagingSenderId: "10421803662",
  appId: "1:10421803662:web:df5b5b76489fdc1010c7df",
  measurementId: "G-0G4M7LEMLZ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
