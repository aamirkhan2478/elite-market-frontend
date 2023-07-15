import { showMessage } from "react-native-flash-message";
import axiosInstance from "../../Utils";

//Types
const ORDER_LOADING = "ORDER_LOADING";
const ADD_ORDER = "ADD_ORDER";
const SHOW_ORDERS = "SHOW_ORDERS";
const SHOW_ORDER = "SHOW_ORDER";
const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
const DELETE_ORDER = "DELETE_ORDER";
const ADD_ORDER_ERROR = "ADD_ORDER_ERROR";
const SHOW_ORDERS_ERROR = "SHOW_ORDERS_ERROR";
const SHOW_ORDER_ERROR = "SHOW_ORDER_ERROR";
const UPDATE_ORDER_STATUS_ERROR = "UPDATE_ORDER_STATUS_ERROR";
const DELETE_ORDER_ERROR = "DELETE_ORDER_ERROR";

//initialState
const initialState = {
  orders: [],
  order: {},
  orderLoading: false,
  error: {},
};

//Reducers
const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LOADING:
      return {
        ...state,
        orderLoading: true,
      };
    case ADD_ORDER:
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        orderLoading: false,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orderLoading: false,
        order: state.order.filter((order) => order._id !== payload),
      };
    case SHOW_ORDERS:
      return {
        ...state,
        orders: payload,
        orderLoading: false,
      };
    case SHOW_ORDER:
      return {
        ...state,
        order: payload,
        orderLoading: false,
      };
    case ADD_ORDER_ERROR:
    case DELETE_ORDER_ERROR:
    case SHOW_ORDER_ERROR:
    case SHOW_ORDERS_ERROR:
    case UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        orderLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//Actions
export const setLoading = () => {
  return {
    type: ORDER_LOADING,
  };
};

export const showOrders = (id, limit, page) => async (dispatch, getState) => {
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
      `order/user-orders/${id}?limit=${limit}&page=${page}`,
      config
    );
    dispatch({
      type: SHOW_ORDERS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const showOrder = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(`order/show-order/${id}`, config);
    dispatch({
      type: SHOW_ORDER,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateStatus = (id, value) => async (dispatch, getState) => {
  const { token, user } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(
      `order/update-order/${id}`,
      value,
      config
    );
    dispatch({
      type: UPDATE_ORDER_STATUS,
      payload: data,
    });
    dispatch(showOrders(user._id, 10, 1));
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: UPDATE_ORDER_STATUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addOrder = (values) => async (dispatch, getState) => {
  const { token, user } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.post("order/add-order", values, config);
    dispatch({
      type: ADD_ORDER,
    });
    showMessage({
      message: "Your product has been added to your orders",
      type: "success",
      icon: "success",
    });
  } catch (err) {
    dispatch({
      type: ADD_ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  const { token, user } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.delete(`order/delete-order/${id}`, values, config);
    dispatch({
      type: DELETE_ORDER,
    });
    dispatch(showOrder(user._id, 10, 1));
  } catch (err) {
    dispatch({
      type: DELETE_ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export default orderReducer;
