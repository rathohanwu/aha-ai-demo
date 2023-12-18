import useSWR from "swr";
import {api} from "@/lib/api";

type UserOverview = {
    totalCount: number,
    todayActiveCount: number,
    lastSevenDayActiveCount: number
}

function useUsersOverview() {
    const url = "/dashboard/users/overview"
    const fetcher = () => api.get<UserOverview>(url).then(res => res.data);
    const {data, error, isLoading, mutate} = useSWR(url, fetcher);
    return {
        overview: data,
        error,
        isLoading,
        mutate
    }
}

export {useUsersOverview}