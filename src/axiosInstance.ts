import axios from "axios";
import {getUserToken} from "@/services/cookies";

const axiosInstance = axios.create({
    baseURL: "http://localhost:7777/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getUserToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
