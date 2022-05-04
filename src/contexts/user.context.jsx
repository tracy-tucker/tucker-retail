import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// the actual value (user info) you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// ----- REDUCER METHOD
// export const USER_ACTION_TYPES = {
//   SET_CURRENT_USER: "SET_CURRENT_USER",
// };

// const INITIAL_STATE = {
//   currentUser: null,
// };

// const userReducer = (state, action) => {
//   console.log("dispatched");
//   console.log(action);
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SET_CURRENT_USER:
//       return { ...state, currentUser: payload };
//     default:
//       throw new Error(`Unhandled type ${type} in userReducer`);
//   }
// };

// UserProvider is just an alias component needed to wrap other components (children) in order to pass in the UserContext (user info)
export const UserProvider = ({ children }) => {
  // ----- USED WITH REDUCER METHOD
  // {currentUser} = state
  // const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // ----- USED WITH REDUCER METHOD
  // const setCurrentUser = (user) => {
  //   // currentUser = payload
  //   dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, currentUser: user });
  // };

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
    });
    return unsubscribe;
  }, []);
  //empty array b/c only want to run this function when the componet mounts

  // ----- USED WITH REDUCER METHOD
  // const value = {
  //   currentUser,
  // };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
