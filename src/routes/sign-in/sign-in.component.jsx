import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  auth,
  signInWitGooglehPopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

// auth is keeping track of all authentication and instances of authentication
// Getting a login from a redirect, that authentication is being stored with auth

// ----- Sign-in with Google Redirect //
// side effect needed to capture user auth from navigatin away from the page to redirect to Google
const SignIn = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };
    fetchData();
  }, []);

  // ----- Sign-in with Google //
  const logGoogleUser = async () => {
    const { user } = await signInWitGooglehPopup(); //destructuring the response ( {user} )
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in Here</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
