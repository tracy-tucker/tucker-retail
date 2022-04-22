import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setformFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // confirm password matches
    if (password !== confirmPassword) {
      alert("Your password does not match");
      return;
    }
    // did you authenticate the user?
    try {
      const { user } = createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.error("Encountered and error", error);
    }
    // create a userdocument for this user
    // const userDocRef = createUserWithEmailAndPassword(formFields);
  };

  const handleChange = (e) => {
    // e.target will 'target' correct input field
    const { name, value } = e.target;
    // Generalizes the update (AKA don't need a line of code for each prop/val)
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
