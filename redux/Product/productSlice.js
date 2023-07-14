import { showMessage } from "react-native-flash-message";
import axiosInstance from "../../Utils";

//Types
const PRODUCT_LOADING = "PRODUCT_LOADING";
const ADD_PRODUCT = "ADD_PRODUCT";
const SHOW_PRODUCTS = "SHOW_PRODUCTS";
const SHOW_PRODUCT = "SHOW_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const FEATURED_PRODUCTS = "FEATURED_PRODUCTS";
const PRODUCT_COUNT = "PRODUCT_COUNT";
const IMAGE_GALLERY = "IMAGE_GALLERY";
const ADD_PRODUCT_ERROR = "ADD_PRODUCT_ERROR";
const SHOW_PRODUCTS_ERROR = "SHOW_PRODUCTS_ERROR";
const SHOW_PRODUCT_ERROR = "SHOW_PRODUCT_ERROR";
const UPDATE_PRODUCT_ERROR = "UPDATE_PRODUCT_ERROR";
const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";
const FEATURED_PRODUCTS_ERROR = "FEATURED_PRODUCTS_ERROR";
const PRODUCT_COUNT_ERROR = "PRODUCT_COUNT_ERROR";
const IMAGE_GALLERY_ERROR = "IMAGE_GALLERY_ERROR";

//initialState
const initialState = {
  products: [],
  featuredProducts: [],
  productCount: 0,
  product: {},
  productLoading: false,
  error: {},
};

//Reducers
const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        productLoading: true,
      };
    case ADD_PRODUCT:
    case UPDATE_PRODUCT:
    case IMAGE_GALLERY:
      return {
        ...state,
        productLoading: false,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        productLoading: false,
        products: state.products.filter((product) => product._id !== payload),
      };
    case SHOW_PRODUCTS:
      return {
        ...state,
        products: payload,
        productLoading: false,
      };
    case SHOW_PRODUCT:
      return {
        ...state,
        product: payload,
        productLoading: false,
      };
    case FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: payload,
        productLoading: false,
      };
    case PRODUCT_COUNT:
      return {
        ...state,
        productCount: payload,
        productLoading: false,
      };
    case ADD_PRODUCT_ERROR:
    case UPDATE_PRODUCT_ERROR:
    case SHOW_PRODUCTS_ERROR:
    case DELETE_PRODUCT_ERROR:
    case SHOW_PRODUCTS_ERROR:
    case SHOW_PRODUCT_ERROR:
    case FEATURED_PRODUCTS_ERROR:
    case PRODUCT_COUNT_ERROR:
    case IMAGE_GALLERY_ERROR:
      return {
        ...state,
        productLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//Actions
export const setLoading = () => {
  return {
    type: PRODUCT_LOADING,
  };
};

export const showProducts =
  (limit, page, search, category) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(setLoading());
    try {
      const { data } = await axiosInstance.get(
        `product/show-products?limit=${limit}&page=${page}&search=${search}&category=${category}`,
        config
      );
      dispatch({
        type: SHOW_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: SHOW_PRODUCTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const showProduct = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(
      `product/show-product/${id}`,
      config
    );
    dispatch({
      type: SHOW_PRODUCT,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SHOW_PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const featuredProduct = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(
      `product/featured-products/5`,
      config
    );
    dispatch({
      type: FEATURED_PRODUCTS,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: FEATURED_PRODUCTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const productCount = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get(`product/count-product`, config);
    dispatch({
      type: PRODUCT_COUNT,
      payload: data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: PRODUCT_COUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addProduct = (values, router) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.post("product/add-product", values, config);
    dispatch({
      type: ADD_PRODUCT,
    });
    router.push("dashboard/show-products");
    dispatch(showProducts());
  } catch (err) {
    dispatch({
      type: ADD_PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export const updateProduct =
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
      await axiosInstance.put(`product/update-product/${id}`, values, config);
      dispatch({
        type: UPDATE_PRODUCT,
      });
      router.push("dashboard/show-products");
      dispatch(showProducts());
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      showMessage({
        message: err.response.data.error,
        type: "danger",
        icon: "danger",
      });
    }
  };

export const imageGallery =
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
      await axiosInstance.put(`product/image-gallery/${id}`, values, config);
      dispatch({
        type: IMAGE_GALLERY,
      });
      router.push("dashboard/show-products");
      dispatch(showProducts());
    } catch (err) {
      dispatch({
        type: IMAGE_GALLERY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      showMessage({
        message: err.response.data.error,
        type: "danger",
        icon: "danger",
      });
    }
  };

export const deleteProduct = (id, router) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  dispatch(setLoading());
  try {
    await axiosInstance.delete(`product/delete-product/${id}`, values, config);
    dispatch({
      type: DELETE_PRODUCT,
    });
    router.push("dashboard/show-products");
    dispatch(showProducts());
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    showMessage({
      message: err.response.data.error,
      type: "danger",
      icon: "danger",
    });
  }
};

export default productReducer;
