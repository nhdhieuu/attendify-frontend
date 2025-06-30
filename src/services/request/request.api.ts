import axiosInstance from "@/axiosInstance";
import {ApiResponse} from "@/types/apiResponse.interface";
import {ListRequestParams, ListRequestResponse, RequestBody, RequestResponse} from "@/types/request.interface";

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
export const getListRequests = async (body: ListRequestParams): Promise<ApiResponse<ListRequestResponse>> => {
    try {
        const response = await axiosInstance.post<ApiResponse<ListRequestResponse>>(
            "requests/filter", body);
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}
