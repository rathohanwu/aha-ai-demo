import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {useAccount} from "@/hooks/account/useAccount";
import {TransitionsModal} from "@/components/modal/TransitionsModal";
import {useModal} from "@/hooks/modal/useModal";
import {AccountUpdatePasswordForm} from "@/components/account/AccountUpdatePasswordForm";
import UserStatistics from "@/components/dashboard/UserStatistics";
import {useAccounts} from "@/hooks/dashboard/useAccounts";
import AuthWrapComponent from "@/components/auth/AuthWrapComponent";

function Dashboard() {

    const {account} = useAccount();
    const {accounts} = useAccounts();
    const accountModal = useModal();

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography variant={"h5"}>Database Dashboard</Typography>
                <div
                    style={{
                        display: "flex",
                        gap: 10
                    }}
                >
                    <Button variant={"contained"} onClick={accountModal.open}>Reset Password</Button>
                    {!account?.verified && <Button variant={"outlined"}>Resend Email</Button>}
                </div>
            </div>

            <UserStatistics
                verified={account?.verified ?? false}
                accounts={accounts ?? []}
            />

            <TransitionsModal
                isOpen={accountModal.isOpen}
                close={accountModal.close}
            >
                <AccountUpdatePasswordForm
                    closeForm={accountModal.close}
                />
            </TransitionsModal>
        </div>
    )
}

export default AuthWrapComponent(Dashboard)