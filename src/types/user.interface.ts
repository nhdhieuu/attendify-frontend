import {AuthResponse} from "@/types/auth.interface";

export interface User {
    "id": string,
    "email": string,
    "fullname": string,
    "phone": string,
    "avatar": string | null,
    "role": UserRole,
    "dob": string,
    "department": string
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'EMPLOYEE'
}

export interface CreatUser {
    "email": string,
    password: string
    "fullname": string,
    "phone": string,
    "dob": string,
    "department": string
}

export type CreateUserResponse = AuthResponse;

export interface ListUsersParams {
    page: number,
    limit: number,
}

export interface ListUsers {
    data: User[]
    "page": number,
    "limit": number,
    "totalElements": number,
    "totalPages": number,
    "lastPage": boolean,
}