import axiosInstance from "@/axiosInstance";
import {ApiResponse} from "@/types/apiResponse.interface";
import {AttendanceReport, AttendanceReportParams} from "@/types/reports.interface";

export const getMonthlyReport = async (params: AttendanceReportParams): Promise<ApiResponse<AttendanceReport[]>> => {
    try {
        const response = await axiosInstance.get<ApiResponse<AttendanceReport[]>>(
            "reports/me/monthly", {params});
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}