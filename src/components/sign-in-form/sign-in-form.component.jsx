import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

// no longer needed. Leveraging onAuthStateChanged instead
// import { UserContext } from "../../contexts/user.context";

import {
  signInWitGooglehPopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // no longer needed. Leveraging onAuthStateChanged instead
  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setformFields(defaultFormFields);
  };

  // ----- Sign-in with Google //
  const signInWithGoogle = async () => {
    await signInWitGooglehPopup();
    // these are no longer needed. Performing this within onAuthStateChanged
    // const { user } = await signInWitGooglehPopup(); //destructuring the response ( {user} )
    // await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // authenticate the user
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
      // no longer needed. Leveraging onAuthStateChanged instead
      // setCurrentUser(user);
    } catch (error) {
      switch (error) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
      console.log(error);
    }
  };

  const handleChange = (e) => {
    // e.target will 'target' correct input field
    const { name, value } = e.target;
    // Generalizes the update (AKA don't need a line of code for each prop/val)
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;

//sign-in form
