import {Alert, Button, Snackbar, TextField} from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {api} from "@/lib/api";
import {useState} from "react";
import {useRouter} from "next/router";

// Types
type Inputs = {
    email: string,
    name: string,
    password: string
};

// Validation Schema
const formSchema = yup.object({
    email: yup.string().required("Email is required").email(),
    name: yup.string().required("Name is required"),
    password: yup.string()
        .required("Password is required")
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .min(8, "Password should be at least 8 characters")
        .max(12, "Password cannot exceed more than 12 characters")
}).required();

type Props = {
    closeForm: () => void
}

function UserPasswordSignUpForm(props: Props) {

    const {closeForm} = props;
    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver: yupResolver(formSchema)});

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await api.post("/auth/signup", data);
            closeForm();
            router.push("/dashboard");
        } catch (err) {
            handleApiError(err);
        }
    };

    const handleApiError = (err: any) => {
        if (err?.response?.data?.statusCode == 430) {
            setErrorMessage(err?.response?.data?.message);
            setShowMessage(true);
        }
    };

    const handleClose = () => setShowMessage(false);

    return (
        <div>
            <Snackbar
                style={{width: 500}}
                open={showMessage}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <TextField fullWidth label="Email" type="email" size="small" {...register("email")}
                               error={!!errors.email} helperText={errors.email?.message}/>
                    <TextField fullWidth label="Name" size="small" {...register("name")} error={!!errors.name}
                               helperText={errors.name?.message}/>
                    <TextField fullWidth label="Password" type="password" size="small" {...register("password")}
                               error={!!errors.password} helperText={errors.password?.message}/>
                    <div style={{display: "flex", justifyContent: "right", gap: 10}}>
                        <Button variant="outlined" onClick={close}>Cancel</Button>
                        <Button variant="contained" type="submit">Sign Up</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export {UserPasswordSignUpForm};
