import {Button} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";

function GoogleAuthButton() {
    return (
        <Button
            variant={"outlined"}
            style={{display: "flex", gap: 10}}
            onClick={() => window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=904366458688-hrnhaak1c9juadkcqqn5kgl27muos363.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"}
        >
            <GoogleIcon fontSize={"small"}/>
            <Typography component={"h2"}>Sign Up With Google</Typography>
        </Button>
    )
}

export {GoogleAuthButton}