import Typography from "@mui/material/Typography";
import {Box, Button, TextField} from "@mui/material";
import {GoogleAuthButton} from "@/components/auth/GoogleAuthButton";

function SignInForm() {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: 250
        }}>
            <Typography>Sign Up</Typography>
            <TextField
                fullWidth
                label={"Email"}
                type={"email"}
                size={"small"}
            />

            <TextField
                fullWidth
                label={"Name"}
                size={"small"}
            />

            <TextField
                fullWidth
                label={"Password"}
                type="password"
                size={"small"}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "right",
                    gap: 10
                }}
            >
                <Button variant={"outlined"}>Cancel</Button>
                <Button variant={"contained"}>Sign Up</Button>
            </div>
            <Box sx={{
                borderBottom: 2,
                borderColor: "grey.500",
            }}>
            </Box>
            <GoogleAuthButton/>
        </div>

    )

}

export {SignInForm};