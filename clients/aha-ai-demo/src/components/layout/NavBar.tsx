import {Box, Button} from "@mui/material";
import {useState} from "react";
import {TransitionsModal} from "../TransitionsModal";
import {SignUpForm} from "@/components/auth/SignUpForm";

function NavBar() {

    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (
        <>
            <div style={{textAlign: "right", padding: "1em"}}>
                <Button variant={"contained"} onClick={() => setOpen(true)}>Sign Up</Button>
                <Button variant={"outlined"} style={{marginLeft: "1em"}}>Sign In</Button>
            </div>

            <Box sx={{
                borderBottom: 2,
                borderColor: "grey.500",
                boxShadow: 1
            }}>
            </Box>

            <TransitionsModal
                isOpen={open}
                close={close}
            >
                <SignUpForm close={close}/>
            </TransitionsModal>

        </>
    )
}

export {NavBar};