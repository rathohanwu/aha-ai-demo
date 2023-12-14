import {Box, Button} from "@mui/material";
import {useState} from "react";
import {TransitionsModal} from "./TransitionsModal";
import Typography from "@mui/material/Typography";

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
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="transition-modal-description" sx={{mt: 2}}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                testing
            </TransitionsModal>

        </>
    )
}

export {NavBar};