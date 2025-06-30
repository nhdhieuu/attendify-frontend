export interface Operation {
    "id": string,
    "workDate": string,
    "checkIn": string,
    "checkOut": string | null,
    "statusIn": CheckInStatus,
    "statusOut": CheckOutStatus | null,
    "totalHours": number,
    "createdAt": string | null,
    "updatedAt": string | null,
}

export enum CheckInStatus {
    ONTIME = "ONTIME",
    LATE = "LATE",
}

export enum CheckOutStatus {
    ONTIME = "ONTIME",
    EARLY = "EARLY",
}

export interface OperationHistoryParams {
    page: number
    limit: number
}

export interface OperationHistoryResponse {
    data: Operation[]
    "page": number,
    "limit": number,
    "totalElements": number,
    "totalPages": number,
    "lastPage": boolean,
}