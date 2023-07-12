import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";

const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer,
});

export default store;
