import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseURL = "https://elite-market-api.onrender.com/api/";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      await AsyncStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
