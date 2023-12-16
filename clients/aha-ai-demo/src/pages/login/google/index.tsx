import {useSearchParams} from "next/navigation"
import {useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";
import {api} from "@/lib/api";
import {useRouter} from "next/router";
import {useLoginStore} from "@/stores/loginStore";
import Typography from "@mui/material/Typography";


function LoginGoogle() {

    const searchPrams = useSearchParams();
    const router = useRouter();
    const code = searchPrams.get('code') ?? "";
    const [isError, setIsError] = useState(false);
    const refreshLoginStatus = useLoginStore((state) => state.refresh);
    const [progressDisplay, setProgressDisplay] = useState<{
        color: "success" | "primary" | "error",
        message: string
    }>({color: "primary", message: "Login By Google..."})


    useEffect(() => {
        if (code) {
            const url = "/auth/google"
            api.post(url, {code})
                .then(res => {
                    refreshLoginStatus();
                    setProgressDisplay({
                        color: "success",
                        message: "Login successfully, will redirect to dashboard"
                    })
                    setTimeout(() => {
                        router.push("/dashboard")
                    }, 3000)
                })
                .catch((error) => setIsError(true))

        }
    }, [code])

    useEffect(() => {

        if (isError) {
            setProgressDisplay({
                color: "error",
                message: "Failed to verify user information from google, will direct to home page"
            })
            setTimeout(() => {
                router.push("/")
            }, 3000)
        }

    }, [isError]);

    return (
        <div style={{
            minHeight: "100vh",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            gap: 10
        }}>

            <Typography variant={"h5"}>{progressDisplay.message}</Typography>
            <LinearProgress color={progressDisplay.color}/>
        </div>
    )
}

export default LoginGoogle