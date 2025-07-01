import axiosInstance from "@/axiosInstance";
import {ApiResponse} from "@/types/apiResponse.interface";
import {
    CheckInOutBody,
    CurrentOperationStatus,
    OperationHistoryParams,
    OperationHistoryResponse,
    OperationStatus
} from "@/types/operation.interface";

export const getOperationHistory = async (params: OperationHistoryParams): Promise<ApiResponse<OperationHistoryResponse>> => {
    try {
        const response = await axiosInstance.get<ApiResponse<OperationHistoryResponse>>(
            "operations/me", {params});
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}

export const getCurrentOperationStatus = async (): Promise<ApiResponse<CurrentOperationStatus>> => {
    try {
        const response = await axiosInstance.get<ApiResponse<CurrentOperationStatus>>(
            "operations/status/me");
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}
export const checkIn = async (body: CheckInOutBody): Promise<ApiResponse<OperationStatus>> => {
    const response = await axiosInstance.post<ApiResponse<OperationStatus>>(
        "operations/check-in", body);
    return response.data;
}
export const checkOut = async (body: CheckInOutBody): Promise<ApiResponse<OperationStatus>> => {
    const response = await axiosInstance.post<ApiResponse<OperationStatus>>(
        "operations/check-out", body);
    return response.data;
}