import Toast from "react-native-toast-message";
import axiosInstance from "../../Utils";

//Types
const CART_LOADING = "CART_LOADING";
const ADD_CART = "ADD_CART";
const SHOW_CART = "SHOW_CART";
const DELETE_CART = "DELETE_CART";
const ADD_CART_ERROR = "ADD_CART_ERROR";
const SHOW_CART_ERROR = "SHOW_CART_ERROR";
const DELETE_CART_ERROR = "DELETE_CART_ERROR";

//initialState
const initialState = {
  cart: [],
  cartLoading: false,
  error: null,
};

//Reducers
const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_LOADING:
      return {
        ...state,
        cartLoading: true,
      };
    case ADD_CART:
      return {
        ...state,
        cartLoading: false,
      };
    case DELETE_CART:
      return {
        ...state,
        cartLoading: false,
        cart: state?.cart?.filter((cart) => cart?._id !== payload),
      };
    case SHOW_CART:
      return {
        ...state,
        cart: payload,
        cartLoading: false,
      };
    case ADD_CART_ERROR:
    case DELETE_CART_ERROR:
    case SHOW_CART_ERROR:
      return {
        ...state,
        cartLoading: false,
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

export const showCart = (userId) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(
      `cart/user-cart/${userId}`,
      config
    );
    dispatch({
      type: SHOW_CART,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_CART_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const addCart = (values) => async (dispatch, getState) => {
  const { token, user } = getState().auth;
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
    Toast.show({
      text1: "Product added to your cart",
      type: "success",
      visibilityTime: 2500,
    });
    dispatch(showCart(user._id));
  } catch (err) {
    Toast.show({
      text1: err.response.data.error,
      type: "error",
      visibilityTime: 2500,
    });
    dispatch({
      type: ADD_CART_ERROR,
      payload: { msg: err.message },
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
    await axiosInstance.delete(`cart/delete-cart/${id}`, config);
    dispatch({
      type: DELETE_CART,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DELETE_CART_ERROR,
      payload: { error: err.message },
    });
  }
};

export default cartReducer;
