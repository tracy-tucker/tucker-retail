// USER REDUCER

import { USER_ACTION_TYPES } from "./user.types";

export const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};

// Because Reducer will run every single action passed to all reducers, we must default: return state;
// if the case being passed to Reducer does not match the type, it will simply return state
