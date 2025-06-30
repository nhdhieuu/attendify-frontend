import axiosInstance from "@/axiosInstance";
import {ApiResponse} from "@/types/apiResponse.interface";
import {RequestBody, RequestResponse} from "@/types/request.interface";

export const createRequestApi = async (body: RequestBody): Promise<ApiResponse<RequestResponse>> => {
    try {
        const response = await axiosInstance.post<ApiResponse<RequestResponse>>(
            "requests", body);
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}