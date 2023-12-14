import {api} from "@/lib/api";
import useSWR from "swr";

function useGoogleAuth(googleCode: string) {
    const url = "account/auth/google"
    const fetcher = (code: string) => api.post(url, {code}).then(res => res.data);
    const {data, error, isLoading} = useSWR(googleCode, fetcher);
    return {
        data,
        error,
        isLoading
    }
}

export {useGoogleAuth}