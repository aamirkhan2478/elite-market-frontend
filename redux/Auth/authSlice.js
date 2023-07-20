import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../Utils";

import Toast from "react-native-toast-message";

// Actions
const AUTH_LOADING = "AUTH_LOADING";
const USER_LOAD = "USER_LOAD";
const LOGIN_USER = "LOGIN_USER";
const SIGNUP_USER = "SIGNUP_USER";
const UPDATE_USER = "UPDATE_USER";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const DELETE_USER = "DELETE_USER";
const LOGOUT = "LOGOUT";
const AUTH_ERROR = "AUTH_ERROR";
const LOGIN_ERROR = "LOGIN_ERROR";
const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
const SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR";
const DELETE_USER_ERROR = "DELETE_USER_ERROR";
const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";

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
        refresh: false,
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
    case CHANGE_PASSWORD:
      return {
        ...state,
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
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        authLoading: false,
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
    data.admin ? router.push("dashboard") : router.push("/");
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
    });
    Toast.show({
      text1: err.response.data.error,
      type: "error",
      visibilityTime: 2500,
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
    data.admin ? router.push("dashboard/index") : router.push("/");
    dispatch(loadUser());
  } catch (err) {
    Toast.show({
      text1: err.response.data.error,
      type: "error",
      visibilityTime: 2500,
    });
    dispatch({
      type: SIGNUP_USER_ERROR,
    });
  }
};

export const deleteUser = (id, router) => async (dispatch, getState) => {
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
    router.push("/");
    await AsyncStorage.removeItem("authToken");
    dispatch(loadUser());
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: DELETE_USER_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const changePassword = (values, id) => async (dispatch, getState) => {
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
      `user/change-password/${id}`,
      values,
      config
    );
    dispatch({
      type: CHANGE_PASSWORD,
      payload: data,
    });
    Toast.show({
      text1: data.message,
      type: "success",
      visibilityTime: 2500,
    });
    dispatch(loadUser());
  } catch (err) {
    Toast.show({
      text1: err.response.data.error,
      type: "error",
      visibilityTime: 2500,
    });
    dispatch({
      type: CHANGE_PASSWORD_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const updateUser =
  (values, id, router) => async (dispatch, getState) => {
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
      router.push("profile");
      dispatch(loadUser());
    } catch (err) {
      Toast.show({
        text1: err.response.data.error,
        type: "error",
        visibilityTime: 2500,
      });
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: err.response.data.error,
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
