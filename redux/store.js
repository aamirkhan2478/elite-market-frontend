import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import categoryReducer from "./Category/categorySlice";
import productReducer from "./Product/productSlice";
import cartReducer from "./Cart/cartSlice";

const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer,
});

export default store;
