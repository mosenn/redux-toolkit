// utils/axiosInstance.ts
import axios from "axios";
import { apiBaseUrl } from "../../utils/api-base-url";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // همه request ها با کوکی ارسال میشن
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token"); // JWT یا توکن از لوکال استوریج
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      return Promise.reject({
        status: error.response?.status || 400,
        message: error.message || "Axios request failed",
      });
    }
    return Promise.reject({ status: 400, message: "Unknown error" });
  }
);

export default axiosInstance;
