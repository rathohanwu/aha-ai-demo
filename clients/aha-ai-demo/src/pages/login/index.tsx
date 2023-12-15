import {useSearchParams} from "next/navigation"
import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {api} from "@/lib/api";
import {useRouter} from "next/router";


function Login() {

    const searchPrams = useSearchParams();
    const router = useRouter();
    const code = searchPrams.get('code') ?? "";
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (code) {
            const url = "/auth/google"
            api.post(url, {code})
                .then(res => router.push("/dashboard"))
                .catch((error) => setIsError(true))
                .finally(() => setLoading(false))
        }
    }, [code])

    if (loading) return <CircularProgress/>
    if (isError) return <CircularProgress color="error"/>

    return (
        <div>
            Login... {code}
        </div>
    )
}

export default Login