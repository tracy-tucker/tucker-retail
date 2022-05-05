import { createAction } from "@reduxjs/toolkit";
import { CART_ACTION_TYPES } from "./cart.types";

// ----- HELPER FUNCTIONS START

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
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // check if quantity = 1, if true remove from cart
  // ----- use .filter --> returns an array of filtered-out element
  if (existingCartItem.quantity === 1) {
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

// ----- HELPER FUNCTIONS END

// setCartItem with new information from addCartItem
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// setCartItems by removing deleted item
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// setCartItems with removal of chosen cart item
export const clearCartItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
