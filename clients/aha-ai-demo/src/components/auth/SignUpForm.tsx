import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {GoogleAuthButton} from "@/components/auth/GoogleAuthButton";
import {UserPasswordSignUpForm} from "@/components/auth/UserPasswordSignUpForm";

function SignUpForm() {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: 250
        }}>
            <Typography>Sign Up</Typography>
            <UserPasswordSignUpForm/>
            <Box sx={{
                borderBottom: 2,
                borderColor: "grey.500",
            }}>
            </Box>
            <GoogleAuthButton/>
        </div>

    )

}

export {SignUpForm};