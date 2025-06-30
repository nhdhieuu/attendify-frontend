import axiosInstance from "@/axiosInstance";
import {ApiResponse} from "@/types/apiResponse.interface";
import {CreateUserResponse, CreatUser} from "@/types/user.interface";

export const createNewUser = async (body: CreatUser): Promise<ApiResponse<CreateUserResponse>> => {
    try {
        const response = await axiosInstance.post<ApiResponse<CreateUserResponse>>(
            "auth/register", body);
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}