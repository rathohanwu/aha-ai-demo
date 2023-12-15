import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {TransitionsModal} from "../modal/TransitionsModal";
import {useLoginStore} from "@/stores/loginStore";
import {SignForm} from "@/components/auth/SignForm";

function NavBar() {

    const signUpModal = useModal();
    const signInModal = useModal();
    const refreshLoginStatus = useLoginStore((state) => state.refresh);
    const logout = useLoginStore((state) => state.logout);
    const isLogin = useLoginStore((state) => state.isLogin);

    useEffect(() => {
        refreshLoginStatus()
    }, [])

    return (
        <>
            <div style={{display: "flex", justifyContent: "flex-end", padding: "1em", gap: 10}}>
                {!isLogin && <Button variant={"contained"} onClick={signUpModal.open}>Sign Up</Button>}
                {!isLogin && <Button variant={"outlined"} onClick={signInModal.open}>Sign In</Button>}
                {isLogin && <Button variant={"outlined"} onClick={logout}>Log Out</Button>}

            </div>

            <Box sx={{
                borderBottom: 2,
                borderColor: "grey.500",
                boxShadow: 1
            }}>
            </Box>


            <TransitionsModal
                isOpen={signUpModal.isOpen}
                close={signUpModal.close}
            >
                <SignForm closeForm={signUpModal.close} mode={"signUp"}/>
            </TransitionsModal>

            <TransitionsModal
                isOpen={signInModal.isOpen}
                close={signInModal.close}
            >
                <SignForm closeForm={signInModal.close} mode={"signIn"}/>
            </TransitionsModal>

        </>
    )
}


function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {isOpen, open, close};
}

export {NavBar};