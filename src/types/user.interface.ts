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