import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

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
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

// isCartOpen && --> The && is evaluating the truthiness of the statement
// for this to be true, both the left and right side of the && must be a truthy value
