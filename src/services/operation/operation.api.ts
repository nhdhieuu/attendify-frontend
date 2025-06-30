import axiosInstance from "@/axiosInstance";
import {ApiResponse} from "@/types/apiResponse.interface";
import {OperationHistoryParams, OperationHistoryResponse} from "@/types/operation.interface";

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