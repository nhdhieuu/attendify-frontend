import {User} from "@/types/user.interface";

export interface RequestBody {
    "type": RequestType,
    "fromDate": string,
    "toDate": string,
    "reason": string
}

export enum RequestType {
    EARLY_LEAVE = "EARLY_LEAVE",
    LATE_ARRIVAL = "LATE_ARRIVAL",
    REMOTE = "REMOTE"
}

export interface RequestResponse {
    id: string,
    user: User,
    status: RequestStatus,
    "type": RequestType,
    "reason": string,
    "toDate": string,
    "createdAt": string
}

export enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}