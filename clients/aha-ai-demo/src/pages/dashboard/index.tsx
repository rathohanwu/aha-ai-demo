import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {useAccount} from "@/hooks/account/useAccount";
import {TransitionsModal} from "@/components/modal/TransitionsModal";
import {useModal} from "@/hooks/modal/useModal";
import {AccountUpdatePasswordForm} from "@/components/account/AccountUpdatePasswordForm";


function Dashboard() {

    const {account} = useAccount();
    const accountModal = useModal();

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography variant={"h5"}>Database Dashboard</Typography>
                <Button variant={"contained"} onClick={accountModal.open}>Reset Password</Button>

            </div>

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

export default Dashboard