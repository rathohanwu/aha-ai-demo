import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {TransitionsModal} from "../modal/TransitionsModal";
import {SignUpForm} from "@/components/auth/SignUpForm";
import {SignInForm} from "@/components/auth/SignInForm";
import {useLoginStore} from "@/stores/loginStore";

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
                <SignUpForm closeForm={signUpModal.close}/>
            </TransitionsModal>

            <TransitionsModal
                isOpen={signInModal.isOpen}
                close={signInModal.close}
            >
                <SignInForm closeForm={signInModal.close}/>
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