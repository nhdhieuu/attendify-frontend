import axiosInstance from "@/axiosInstance";
import {ApiResponse} from "@/types/apiResponse.interface";
import {AnnualReport, AttendanceReport, AttendanceReportParams} from "@/types/reports.interface";

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
export const getAnnualReport = async (params: { year: number }): Promise<ApiResponse<AnnualReport[]>> => {
    try {
        const response = await axiosInstance.get<ApiResponse<AnnualReport[]>>(
            "reports/me/yearly", {params});
        return response.data;
    } catch (error) {
        console.error("Error fetching Data: ", error);
        throw new Error("Error fetching Data");
    }
}