import {api} from "@/lib/api";
import {useAccount} from "@/hooks/account/useAccount";


function useAccountUpdate() {

    const {mutate} = useAccount();

    const updateName = async (data: any) => {
        await api.patch('/account/name', data);
        await mutate();
    };

    return {
        updateName
    }

}

export {useAccountUpdate}