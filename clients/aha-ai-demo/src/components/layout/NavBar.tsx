import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {TransitionsModal} from "../TransitionsModal";
import Typography from "@mui/material/Typography";
import {GoogleAuthButton} from "@/components/auth/GoogleAuthButton";
import {SignInForm} from "@/components/auth/SignInForm";

function NavBar() {

    const [open, setOpen] = useState(false);

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
                close={() => setOpen(false)}
            >
                <SignInForm/>
            </TransitionsModal>

        </>
    )
}

export {NavBar};