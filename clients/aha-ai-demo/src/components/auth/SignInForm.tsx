import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {GoogleAuthButton} from "@/components/auth/google/GoogleAuthButton";
import {UserPasswordSignInForm} from "@/components/auth/user-password/UserPasswordSignInForm";


type Props = {
    closeForm: () => void
}

function SignInForm(props: Props) {

    const {closeForm} = props;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: 250
        }}>
            <Typography>Sign In</Typography>
            <UserPasswordSignInForm closeForm={closeForm}/>
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