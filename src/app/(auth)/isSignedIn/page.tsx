"use client";
import {useSession} from "next-auth/react";

export default function IsSignedInPage() {
    const {data: session} = useSession()
    console.log("Session data:", session?.user);
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">You are signed in!</h1>
        </div>
    );
}