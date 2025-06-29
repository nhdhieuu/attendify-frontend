import axiosInstance from "@/axiosInstance";
import {AuthRequestBody, AuthResponse} from "@/types/auth.interface";
import {ApiResponse} from "@/types/apiResponse.interface";

export const loginApi = async (body: AuthRequestBody): Promise<ApiResponse<AuthResponse>> => {
    try {
        const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
            "auth/login", body);
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}