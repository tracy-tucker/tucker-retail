import { Fragment, useContext } from "react";
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";

import { Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  // setCurrentUser no longer needed. Leveraging onAuthStateChanged instead
  // currentUser still needed for sign in/sign out toggle
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  // no longer needed. Leveraging onAuthStateChanged instead
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

// isCartOpen && --> The && is evaluating the truthiness of the statement
// for this to be true, both the left and right side of the && must be a truthy value
