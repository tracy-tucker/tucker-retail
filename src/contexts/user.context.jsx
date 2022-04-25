import { useState, createContext, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// the actual value (user info) you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// UserProvider is just an alias component needed to wrap (children) other components in order to pass in the UserContext (user info)
export const UserProvider = ({ children }) => {
  // useState --> to get/set the current value for User
  const [currentUser, setCurrentUser] = useState(null);
  // value --> This allows you to call/set the User values anywhere in the component tree.
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // setting the user to whatever the onAuthStateChange value is
      setCurrentUser(user);
      console.log("Listener", user);
    });
    return unsubscribe;
  }, []);
  //empty array b/c only want to run this function when the componet mounts

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
