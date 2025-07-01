"use client";
import {useSession} from "next-auth/react";
import {LoginGoogleBody} from "@/types/auth.interface";
import {useEffect} from "react";
import {loginGoogleApi} from "@/services/auth/login.api";
import {setUserData} from "@/services/cookies";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/stores/useAuthStore";

export default function IsSignedInPage() {
    const {data: session, status} = useSession();
    const router = useRouter()
    const loginStore = useAuthStore(state => state.login)

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const body = session.user as LoginGoogleBody;
            console.log("Session data:", body);
            loginGoogleApi(body).then(async res => {
                if (res.status === 200) {
                    console.log("Login successful:", res.data);
                    loginStore(res.data)
                    await setUserData(res.data)
                    router.push('/')
                    toast.success("Đăng nhập thành công", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    console.error("Login failed:", res.message);
                }
            }).catch(console.error);
        } else {
            console.log("Session not ready or not authenticated");
        }
    }, [session, status]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">You are signed in!</h1>
        </div>
    );
}
