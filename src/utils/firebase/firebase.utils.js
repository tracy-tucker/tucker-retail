import { initializeApp } from "firebase/app"; // creates a firebase app instance
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; // creates these auth instances

const firebaseConfig = {
  apiKey: "AIzaSyAFNZ3GDYA7FWO1M4tvCqKrMz7l9j7p9eE",
  authDomain: "tucker-retail-db.firebaseapp.com",
  projectId: "tucker-retail-db",
  storageBucket: "tucker-retail-db.appspot.com",
  messagingSenderId: "1078407535006",
  appId: "1:1078407535006:web:2560215056bb0641c71e8f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWitGooglehPopup = () => signInWithPopup(auth, provider);
