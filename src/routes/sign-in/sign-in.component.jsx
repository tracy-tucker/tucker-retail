import { signInWitGooglehPopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWitGooglehPopup();
    console.log(response);
  };
  return (
    <div>
      <h1>Sign in Here</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
