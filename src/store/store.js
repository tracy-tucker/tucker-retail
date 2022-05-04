// all of state lives here
// receives action, dispatches to reducer

import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// TUT USES createStore. Commented out code is for createStore
// const middleWares = [logger];
// const composedEnhancers = compose(applyMiddleware(...middleWares));

// ROOT REDUCER
export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  //   composedEnhancers,
});
