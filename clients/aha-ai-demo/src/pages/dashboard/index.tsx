import {useAccount} from "@/hooks/dashboard/useAccount";

function Dashboard() {

    const {account, isLoading} = useAccount();

    return (
        <div>
            this is dash board {account?.name} and your sign up time is {new Date(account?.signUpTime ?? "").toString()}
        </div>
    )
}

export default Dashboard