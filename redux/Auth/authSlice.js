import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../Utils";
import { showMessage } from "react-native-flash-message";

// Actions
const AUTH_LOADING = "AUTH_LOADING";
const USER_LOAD = "USER_LOAD";
const LOGIN_USER = "LOGIN_USER";
const SIGNUP_USER = "SIGNUP_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";
const LOGOUT = "LOGOUT";
const AUTH_ERROR = "AUTH_ERROR";
const LOGIN_ERROR = "LOGIN_ERROR";
const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
const SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR";
const DELETE_USER_ERROR = "DELETE_USER_ERROR";

const initialState = {
  token: null,
  authLoading: false,
  user: {},
  message: "",
  error: "",
};

// Reducer
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case USER_LOAD:
      return {
        ...state,
        authLoading: false,
        user: payload,
      };
    case LOGIN_USER:
    case SIGNUP_USER:
      return {
        ...state,
        ...payload,
        token: payload.token,
        authLoading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
        authLoading: false,
        massage: payload.massage,
      };
    case DELETE_USER:
      return {
        ...state,
        authLoading: false,
        message: payload.message,
      };
    case LOGIN_ERROR:
    case SIGNUP_USER_ERROR:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        authLoading: false,
        user: {},
      };
    case DELETE_USER_ERROR:
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

// Actions
export const setLoading = () => {
  return {
    type: AUTH_LOADING,
  };
};

export const loadUser = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get("user/get-user", config);
    dispatch({
      type: USER_LOAD,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loginUser = (values, router) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.post("/user/login", values, config);
    console.log(data);
    await AsyncStorage.setItem("authToken", data.token);
    dispatch({
      type: LOGIN_USER,
      payload: data,
    });
    router.push("/");
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export const signupUser = (values, router) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.post("user/signup", values, config);
    await AsyncStorage.setItem("authToken", data.token);
    dispatch({
      type: SIGNUP_USER,
      payload: data,
    });
    router.push("/");
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: SIGNUP_USER_ERROR,
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export const Init = () => async (dispatch) => {
  try {
    await AsyncStorage.getItem("authToken");
    if (token !== null) {
      dispatch({
        type: LOGIN_USER,
        payload: token,
      });
    }
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.delete(
      `user/delete-account/${id}`,
      config
    );
    dispatch({
      type: DELETE_USER,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: DELETE_USER_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const updateUser = (values, id) => async (dispatch, getState) => {
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
      `user/update-user/${id}`,
      values,
      config
    );
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
    showMessage({
      message: data.message,
      type: "success",
      icon: "success",
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: err.response.data.error,
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export const logoutUser = (router) => async (dispatch) => {
  dispatch(setLoading());
  await AsyncStorage.removeItem("authToken");
  dispatch({
    type: LOGOUT,
  });
  router.push("/");
};

export default authReducer;
