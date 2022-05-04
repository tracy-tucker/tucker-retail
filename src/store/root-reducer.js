// This will combine all Reducers together
import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
});
