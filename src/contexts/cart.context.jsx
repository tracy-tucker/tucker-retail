import { createContext, useState, useEffect } from "react";

// ----- HELPER FUNCTIONS

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

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find cart item that already exists in the cart
  const removingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // check if quantity = 1, if true remove from cart
  // ----- use .filter --> returns an array of filtered-out element
  if (removingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // if false, return cartItems with cart item - 1 quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? // if a match, spread current cartItem (to avoid mutation), with a minus 1 quantity count
        { ...cartItem, quantity: cartItem.quantity - 1 }
      : // if no match, then just return the cartItem
        cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearCartItemFromCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState([]);
  const [cartTotal, setCarttotal] = useState(0);

  // setting the cartCount for cart-icon component
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // taking the checkout cartItems,
  // multiply specific item to its price,
  // then add the newly multipied items together to get total
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItems) => total + cartItems.quantity * cartItems.price,
      0
    );
    setCarttotal(newCartTotal);
  }, [cartItems]);

  // setCartItem with new information from addCartItem
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // setCartItems by removing deleted item
  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  // setCartItems with removal of chosen cart item
  const clearCartItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  // gather cartItem quantity X cartItem price to create total

  // including addItemToCart and CartItems to trigger product onClick handler
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearCartItemFromCart,
    cartItems,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
