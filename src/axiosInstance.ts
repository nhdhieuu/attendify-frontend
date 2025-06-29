import axios from "axios";

const getToken = () => {
    return localStorage.getItem("token");
};
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:7777/api/v1/", // Base URL for the API
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken() || ""}`, // Initial token
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getToken() || ""}`;
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with successful responses
        return response;
    },
    (error) => {
        // Handle response errors
        return Promise.reject(error);
    },
);
export default axiosInstance;
