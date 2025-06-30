import {CheckInStatus, CheckOutStatus} from "@/types/operation.interface";
import {User} from "@/types/user.interface";

export interface AttendanceReportParams {
    month: number
    year: number
}

export interface AttendanceReport {
    user: User
    date: string;
    checkInTime: string;
    checkOutTime: string;
    checkInStatus: CheckInStatus;
    checkOutStatus: CheckOutStatus;
    totalHours: number;
    totalRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    createdAt: string;
}
