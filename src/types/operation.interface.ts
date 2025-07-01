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
    data: OperationHistory[]
    "page": number,
    "limit": number,
    "totalElements": number,
    "totalPages": number,
    "lastPage": boolean,
}

export enum OperationHistoryStatus {
    ONTIME = "ONTIME",
    EARLY = "EARLY",
    LATE = "LATE",
}

export interface OperationHistory {
    "operation": string,
    "date": string,
    "time": string,
    "status": OperationHistoryStatus
}