import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import categoryReducer from "./Category/categorySlice";
import productReducer from "./Product/productSlice";
import cartReducer from "./Cart/cartSlice";
import orderReducer from "./Order/orderSlice";

const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

const store = configureStore({
  reducer,
});

export default store;
