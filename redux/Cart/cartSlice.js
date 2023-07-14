import { showMessage } from "react-native-flash-message";
import axiosInstance from "../../Utils";

//Types
const CART_LOADING = "CART_LOADING";
const ADD_CART = "ADD_CART";
const SHOW_CART = "SHOW_CART";
const UPDATE_CART = "UPDATE_CART";
const DELETE_CART = "DELETE_CART";
const ADD_CART_ERROR = "ADD_CART_ERROR";
const SHOW_CART_ERROR = "SHOW_CART_ERROR";
const UPDATE_CART_ERROR = "UPDATE_CART_ERROR";
const DELETE_CART_ERROR = "DELETE_CART_ERROR";

//initialState
const initialState = {
  cart: [],
  cateLoading: false,
  error: {},
};

//Reducers
const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_LOADING:
      return {
        ...state,
        cateLoading: true,
      };
    case ADD_CART:
      return {
        ...state,
        cateLoading: false,
      };
    case DELETE_CART:
      return {
        ...state,
        cateLoading: false,
        cart: state.cart.filter((cart) => cart._id !== payload),
      };
    case SHOW_CART:
      return {
        ...state,
        cart: payload,
        cateLoading: false,
      };
    case ADD_CART_ERROR:
    case DELETE_CART_ERROR:
    case SHOW_CART_ERROR:
      return {
        ...state,
        cateLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//Actions
export const setLoading = () => {
  return {
    type: CART_LOADING,
  };
};

export const showCart = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get("cart/show-cart-data", config);
    dispatch({
      type: SHOW_CART,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addCart = (values) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.post("cart/add-cart", values, config);
    dispatch({
      type: ADD_CART,
    });
    showMessage({
      message: "Your product has been added to your cart",
      type: "success",
      icon: "success",
    });
    dispatch(showCart());
  } catch (err) {
    dispatch({
      type: ADD_CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export const deleteCart = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.delete(`cart/delete-cart/${id}`, values, config);
    dispatch({
      type: DELETE_CART,
    });
    dispatch(showCart());
  } catch (err) {
    dispatch({
      type: DELETE_CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export default cartReducer;
