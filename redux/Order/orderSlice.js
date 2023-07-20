
import Toast from "react-native-toast-message";
import axiosInstance from "../../Utils";

//Types
const ORDER_LOADING = "ORDER_LOADING";
const ADD_ORDER = "ADD_ORDER";
const SHOW_ORDERS = "SHOW_ORDERS";
const SHOW_SPECIFIC_USER_ORDERS = "SHOW_SPECIFIC_USER_ORDERS";
const SHOW_ORDER = "SHOW_ORDER";
const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
const DELETE_ORDER = "DELETE_ORDER";
const TOTAL_ORDERS = "TOTAL_ORDERS";
const TOTAL_SALES = "TOTAL_SALES";
const ADD_ORDER_ERROR = "ADD_ORDER_ERROR";
const SHOW_ORDERS_ERROR = "SHOW_ORDERS_ERROR";
const SHOW_SPECIFIC_USER_ORDERS_ERROR = "SHOW_SPECIFIC_USER_ORDERS_ERROR";
const SHOW_ORDER_ERROR = "SHOW_ORDER_ERROR";
const UPDATE_ORDER_STATUS_ERROR = "UPDATE_ORDER_STATUS_ERROR";
const DELETE_ORDER_ERROR = "DELETE_ORDER_ERROR";
const TOTAL_ORDERS_ERROR = "TOTAL_ORDERS_ERROR";
const TOTAL_SALES_ERROR = "TOTAL_SALES_ERROR";

//initialState
const initialState = {
  orders: [],
  specificUserOrders: [],
  order: {},
  totalSales: 0,
  totalOrders: 0,
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
    case SHOW_SPECIFIC_USER_ORDERS:
      return {
        ...state,
        specificUserOrders: payload,
        orderLoading: false,
      };
    case SHOW_ORDER:
      return {
        ...state,
        order: payload,
        orderLoading: false,
      };
    case TOTAL_ORDERS:
      return {
        ...state,
        totalOrders: payload,
        orderLoading: false,
      };
    case TOTAL_SALES:
      return {
        ...state,
        totalSales: payload,
        orderLoading: false,
      };
    case ADD_ORDER_ERROR:
    case DELETE_ORDER_ERROR:
    case SHOW_ORDER_ERROR:
    case SHOW_ORDERS_ERROR:
    case UPDATE_ORDER_STATUS_ERROR:
    case TOTAL_ORDERS_ERROR:
    case TOTAL_SALES_ERROR:
    case SHOW_SPECIFIC_USER_ORDERS_ERROR:
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

export const specificUserOrders =
  (id, limit = 10, page = 1) =>
  async (dispatch, getState) => {
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
        type: SHOW_SPECIFIC_USER_ORDERS,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SHOW_SPECIFIC_USER_ORDERS_ERROR,
        payload: { msg: err.message },
      });
    }
  };

export const showOrders = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(`order/show-orders`, config);
    dispatch({
      type: SHOW_ORDERS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_ORDERS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const totalOrders = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get("order/count-order", config);
    dispatch({
      type: TOTAL_ORDERS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: TOTAL_ORDERS_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const totalSales = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get("order/total-sales", config);
    dispatch({
      type: TOTAL_SALES,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: TOTAL_SALES_ERROR,
      payload: { msg: err.message },
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
      payload: { msg: err.message },
    });
  }
};

export const updateStatus =
  (id, value, router) => async (dispatch, getState) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    dispatch(setLoading());
    try {
      const { data } = await axiosInstance.put(
        `order/update-order/${id}`,
        value,
        config
      );
      dispatch({
        type: UPDATE_ORDER_STATUS,
        payload: data,
      });
      router.push("dashboard/orders");
    } catch (err) {
      showMessage({
        message: err.response.data.error,
        type: "danger",
        icon: "danger",
      });
      console.log(err.message);
      dispatch({
        type: UPDATE_ORDER_STATUS_ERROR,
        payload: { msg: err.message },
      });
    }
  };

export const addOrder = (values, router) => async (dispatch, getState) => {
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
    router.push("orders");
    dispatch(specificUserOrders(user?._id, 10, 1));
    showMessage({
      message: "Your product has been added to your orders",
      type: "success",
      icon: "success",
    });
  } catch (err) {
    Toast.show({
      text1: err.response.data.error,
      type: "error",
      visibilityTime: 2500,
    });
    dispatch({
      type: ADD_ORDER_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.delete(`order/delete-order/${id}`, config);
    dispatch({
      type: DELETE_ORDER,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: DELETE_ORDER_ERROR,
      payload: { msg: err.message },
    });
  }
};

export default orderReducer;
