import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {GoogleAuthButton} from "@/components/auth/google/GoogleAuthButton";
import {UserPasswordSignForm} from "./user-password/UserPasswordSignForm";


type Props = {
    closeForm: () => void,
    mode: "signIn" | 'signUp'
}

function SignForm(props: Props) {

    const {closeForm, mode} = props;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            minHeight: 250
        }}>
            <Typography>{mode == "signIn" ? "Sign In" : "Sign Up"}</Typography>
            <UserPasswordSignForm mode={mode} closeForm={closeForm}/>
            <Box sx={{
                borderBottom: 2,
                borderColor: "grey.500",
            }}>
            </Box>
            <GoogleAuthButton/>
        </div>

    )

}

export {SignForm};