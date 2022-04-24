import { useState, createContext } from "react";

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
