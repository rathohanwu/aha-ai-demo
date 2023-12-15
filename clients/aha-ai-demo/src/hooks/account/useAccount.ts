import useSWR from "swr";
import {api} from "@/lib/api";
import {Account} from "@/types/account";

function useAccount() {
    const url = "account"
    const fetcher = () => api.get<Account>(url).then(res => res.data);
    const {data, error, isLoading, mutate} = useSWR(url, fetcher);
    return {
        account: data,
        error,
        isLoading,
        mutate
    }
}

export {useAccount}