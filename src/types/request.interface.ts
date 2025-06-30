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
    fromDate: string,
    "toDate": string,
    "createdAt": string
}

export enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface ListRequestParams {
    page: number,
    limit: number,
    status: RequestStatus | null,
    userId: string | null,
}

export interface ListRequestResponse {
    data: RequestResponse[]
    "page": number,
    "limit": number,
    "totalElements": number,
    "totalPages": number,
    "lastPage": boolean,
}