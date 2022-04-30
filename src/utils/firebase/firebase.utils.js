import { initializeApp } from "firebase/app"; // creates a firebase app instance
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; // creates auth instances

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore"; // creates instance of Firebase DB

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

// auth keeps track if users are currently signed in/out
export const auth = getAuth();

// ----- Sign-in with Google //
export const signInWitGooglehPopup = () =>
  signInWithPopup(auth, googleProvider);

// ----- Sign-in with Google Redirect //
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// ----- Instantiates Firestore //
export const db = getFirestore();

// ----- THIS PROCESS was to create a collection based on the SHOP_DATA data inside our project
// a method to upload our categories as collections inside FB
// collectionKey = the identity of the collection (ex: clothes, users, etc)
// objects = the documents we want to add
// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log("done");
// };

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  // docs will now be an array of the data from FB
  // b/c docs is an array, we have to reduce down to an object
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

// ----- Take userAuth and create new user if user does not exist/return user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  // go inside the database, grab the 'users' collection and insert this user's authentication id
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  // console.log("user", userSnapshot.exists()); // in this moment, user does not exist (false)
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
      console.log("error creating user", error.message);
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

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
//onAuthStateChanged --> a Firebase listener that will trigger an event, depending on the change of state
// it take in 2 parameters: auth, and a callback function you want to call every time the state changes
