import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {GoogleAuthButton} from "@/components/auth/google/GoogleAuthButton";
import {UserPasswordSignUpForm} from "@/components/auth/user-password/UserPasswordSignUpForm";

type Props = {
    closeForm: () => void
}

function SignUpForm(props: Props) {

    const {closeForm} = props;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: 250
        }}>
            <Typography>Sign Up</Typography>
            <UserPasswordSignUpForm closeForm={closeForm}/>
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