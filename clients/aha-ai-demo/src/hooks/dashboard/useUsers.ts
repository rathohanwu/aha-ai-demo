import useSWR from "swr";
import {api} from "@/lib/api";
import {Account} from "@/types/account";

function useUsers() {
    const url = "/dashboard/users"
    const fetcher = () => api.get<Account[]>(url).then(res => res.data);
    const {data, error, isLoading, mutate} = useSWR(url, fetcher);
    return {
        users: data,
        error,
        isLoading,
        mutate
    }
}

export {useUsers}