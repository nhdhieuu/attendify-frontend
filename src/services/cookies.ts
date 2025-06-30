"use server";
import {cookies} from "next/headers";
import {AuthResponse} from "@/types/auth.interface";

export async function setUserData(data: AuthResponse) {
    (await cookies()).set("userToken", data.token);
    (await cookies()).set("userId", data.user.id);
    (await cookies()).set("fullname", data.user.fullname);
    (await cookies()).set("avatar", data.user.avatar ? data.user.avatar : "");
    (await cookies()).set("role", data.user.role);
}

export async function getUserToken() {
    return (await cookies()).get("userToken")?.value;
}

export async function getUserId() {
    return (await cookies()).get("userId")?.value;
}

export async function getUserRole() {
    return (await cookies()).get("role")?.value;
}

export async function returnUser() {
    return {
        token: (await cookies()).get("userToken")?.value,
        userId: (await cookies()).get("userId")?.value,
        userName: (await cookies()).get("fullname")?.value,
        email: (await cookies()).get("email")?.value,
        avatar: (await cookies()).get("avatar")?.value,
        role: (await cookies()).get("role")?.value,
    };
}

export async function resetCookie() {
    (await cookies()).delete("userToken");
    (await cookies()).delete("userId");
    (await cookies()).delete("fullname");
    (await cookies()).delete("avatar");
    (await cookies()).delete("role");
    (await cookies()).delete("email");
}
