import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {useAccount} from "@/hooks/account/useAccount";
import {TransitionsModal} from "@/components/modal/TransitionsModal";
import {useModal} from "@/hooks/modal/useModal";
import {AccountUpdatePasswordForm} from "@/components/account/AccountUpdatePasswordForm";
import UserStatistics from "@/components/dashboard/UserStatistics";
import {useAccounts} from "@/hooks/dashboard/useAccounts";
import AuthWrapComponent from "@/components/auth/AuthWrapComponent";
import {api} from "@/lib/api";
import {dismissMessage, showAPIErrorMessage, showLoadingMessage} from "@/utils/toast";

function Dashboard() {

    const {account} = useAccount();
    const {accounts} = useAccounts();
    const accountModal = useModal();

    async function resendEmail() {

        try {
            showLoadingMessage("Sending Email");
            await api.post("auth/mail/resend");
            dismissMessage();
        } catch (e) {
            showAPIErrorMessage(e);
        }

    }

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
                    {
                        account?.verified ?
                            <Button variant={"contained"} onClick={accountModal.open}>Reset Password</Button> :
                            <Button variant={"outlined"} onClick={resendEmail}>Resend Email</Button>
                    }

                </div>
            </div>

            {
                account?.verified &&
                <UserStatistics
                    verified={account?.verified ?? false}
                    accounts={accounts ?? []}
                />
            }


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

