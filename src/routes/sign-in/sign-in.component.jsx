import {
  signInWitGooglehPopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWitGooglehPopup(); //destructuring the response ( {user} )
    console.log(user);
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign in Here</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
