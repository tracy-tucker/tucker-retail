import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // does cartItems contain productToAdd?
  // .find method performs a boolean, returns the items that are true
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, increment quantity
  if (existingCartItem) {
    // if existingCartItem is truthy (exists)
    // map over the cartItems and compare each item id to productToAdd.id
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? // if a match, spread current cartItem (to avoid mutation), with an additional quantity count
          { ...cartItem, quantity: cartItem.quantity + 1 }
        : // if no match, then just return the cartItem
          cartItem
    );
  }
  // return new array with modified cartItems (new cart item)
  // below, the return is taking any existing cartItems and adding those to a new cartItems array.
  // along with any productToAdd items, with the additional prop/value of quantity: 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState([]);

  // setting the cartCount for cart-icon component
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // setCartItem with new information from addCartItem
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // including addItemToCart and CartItems to trigger product onClick handler
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
