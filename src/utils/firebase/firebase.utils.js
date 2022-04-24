import { initializeApp } from "firebase/app"; // creates a firebase app instance
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // creates auth instances

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // creates instance of Firebase DB

const firebaseConfig = {
  apiKey: "AIzaSyAFNZ3GDYA7FWO1M4tvCqKrMz7l9j7p9eE",
  authDomain: "tucker-retail-db.firebaseapp.com",
  projectId: "tucker-retail-db",
  storageBucket: "tucker-retail-db.appspot.com",
  messagingSenderId: "1078407535006",
  appId: "1:1078407535006:web:2560215056bb0641c71e8f",
};

// Initialize Firebase //
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// ----- Sign-in with Google //
export const signInWitGooglehPopup = () =>
  signInWithPopup(auth, googleProvider);

// ----- Sign-in with Google Redirect //
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// ----- Instantiates Firestore //
export const db = getFirestore();

// ----- Take userAuth and create new user if user does not exist/return user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  // go inside the database, grab the 'users' collection and insert this user's authentication id
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log("user", userSnapshot.exists()); // in this moment, user does not exist (false)
  // check if user does NOT exist
  if (!userSnapshot.exists()) {
    // if false, create/setDoc for new user
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      } else {
        console.log("error creating user", error);
      }
    }
  }

  // if true, return userDocRef
  return userDocRef;
};

// ----- Create user with email and password //
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// ----- Auth user with email and password //
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
