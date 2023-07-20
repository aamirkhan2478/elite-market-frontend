import Toast from "react-native-toast-message";
import axiosInstance from "../../Utils";

//Types
const CATEGORY_LOADING = "CATEGORY_LOADING";
const ADD_CATEGORY = "ADD_CATEGORY";
const SHOW_CATEGORIES = "SHOW_CATEGORIES";
const SHOW_CATEGORY = "SHOW_CATEGORY";
const UPDATE_CATEGORY = "UPDATE_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const ADD_CATEGORY_ERROR = "ADD_CATEGORY_ERROR";
const SHOW_CATEGORIES_ERROR = "SHOW_CATEGORIES_ERROR";
const SHOW_CATEGORY_ERROR = "SHOW_CATEGORY_ERROR";
const UPDATE_CATEGORY_ERROR = "UPDATE_CATEGORY_ERROR";
const DELETE_CATEGORY_ERROR = "DELETE_CATEGORY_ERROR";

//initialState
const initialState = {
  categories: [],
  category: {},
  cateLoading: false,
  error: {},
};

//Reducers
const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_LOADING:
      return {
        ...state,
        cateLoading: true,
      };
    case ADD_CATEGORY:
    case UPDATE_CATEGORY:
      return {
        ...state,
        cateLoading: false,
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        cateLoading: false,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
      };
    case SHOW_CATEGORIES:
      return {
        ...state,
        categories: payload,
        cateLoading: false,
      };
    case SHOW_CATEGORY:
      return {
        ...state,
        category: payload,
        cateLoading: false,
      };
    case ADD_CATEGORY_ERROR:
    case UPDATE_CATEGORY_ERROR:
    case SHOW_CATEGORIES_ERROR:
    case DELETE_CATEGORY_ERROR:
    case SHOW_CATEGORIES_ERROR:
    case SHOW_CATEGORY_ERROR:
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
    type: CATEGORY_LOADING,
  };
};

export const showCategories = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(
      "category/show-categories",
      config
    );
    dispatch({
      type: SHOW_CATEGORIES,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_CATEGORIES_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const showCategory = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(
      `category/show-category/${id}`,
      config
    );
    dispatch({
      type: SHOW_CATEGORY,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_CATEGORY_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const addCategory = (values, router) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.post("category/add-category", values, config);
    dispatch({
      type: ADD_CATEGORY,
    });
    router.push("dashboard/show-categories");
    dispatch(showCategories());
  } catch (err) {
    Toast.show({
      text1: err.response.data.error,
      type: "error",
      visibilityTime: 2500,
    });
    dispatch({
      type: ADD_CATEGORY_ERROR,
      payload: { msg: err.message },
    });
  }
};

export const updateCategory =
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
      await axiosInstance.put(`category/update-category/${id}`, values, config);
      dispatch({
        type: UPDATE_CATEGORY,
      });
      router.push("dashboard/show-categories");
      dispatch(showCategories());
    } catch (err) {
      showMessage({
        message: err.response.data.error,
        type: "danger",
        icon: "danger",
      });
      dispatch({
        type: UPDATE_CATEGORY_ERROR,
        payload: { msg: err.message },
      });
    }
  };

export const deleteCategory = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.delete(`category/delete-category/${id}`, config);
    dispatch({
      type: DELETE_CATEGORY,
    });
    dispatch(showCategories());
  } catch (err) {
    Toast.show({
      text1: err.response.data.error,
      type: "error",
      visibilityTime: 2500,
    });
    dispatch({
      type: DELETE_CATEGORY_ERROR,
      payload: { msg: err.message },
    });
  }
};

export default categoryReducer;
