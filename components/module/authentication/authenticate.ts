"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Authenticate(defaultCallbackUrl = "/dashboard") {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function login(email: string, password: string, callbackUrl?: string) {
        setLoading(true);
        setError(null);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: callbackUrl ?? defaultCallbackUrl,
        });

        setLoading(false);

        if (!res) {
            setError("Login gagal. Coba lagi.");
            return false;
        }

        if (res.error) {
            setError("Email atau password salah.");
            return false;
        }

        router.push(res.url ?? defaultCallbackUrl);
        router.refresh();
        return true;
    }

  return { login, loading, error };
}
