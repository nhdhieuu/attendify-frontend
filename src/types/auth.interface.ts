import {User} from "@/types/user.interface";

export interface AuthResponse {
    token: string;
    user: User,
}

export interface AuthRequestBody {
    email: string;
    password: string;
}