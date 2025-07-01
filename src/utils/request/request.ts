
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const request = axios.create({
  baseURL: "http://localhost:3000/api", // Base URL for the API
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      message.error("network error", 2000);
      return Promise.reject(error);
    }
    const { status } = error.response;
    switch (status) {
      case 401:
        message.error("Your session has expired. Please log in again.", 2000);
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
        message.error("No permission to access this resource", 2000);
        break;
      case 500:
        message.error("Internal Server Error. Please try again later.​​ ", 2000);
        break;
      default:
        message.error(`Request fail${status}）`, 2000);
    }
    return Promise.reject(error);
  }
);

export default request;
