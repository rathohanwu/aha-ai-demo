import {Button, TextField} from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {api} from "@/lib/api";
import {useState} from "react";
import {useRouter} from "next/router";
import {useLoginStore} from "@/stores/loginStore";
import {CircularProgress} from "@/components/feedback/CircularProgress";
import {showErrorMessage} from "@/utils/toast";


type Inputs = {
    email: string,
    password: string,
    name?: string,
};

type Props = {
    closeForm: () => void,
    mode: "signIn" | 'signUp'
}

function UserPasswordSignForm(props: Props) {

    const {closeForm, mode} = props;
    const [isLoading, setIsLoading] = useState(false);
    const refreshLoginStatus = useLoginStore((state) => state.refresh);
    const router = useRouter();
    const formSchema = mode == "signIn" ? signInSchema : signUpSchema;
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver: yupResolver(formSchema)});

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsLoading(true);
            const url = mode == "signIn" ? "/auth/signin" : "/auth/signup";
            await api.post(url, data);
            setTimeout(async () => {
                setIsLoading(false);
                refreshLoginStatus();
                closeForm();
                await router.push("/dashboard");
            }, 2000)
        } catch (err) {
            showErrorMessage(err);
            setIsLoading(false)
        }
    };


    return (
        <div>


            <form onSubmit={handleSubmit(onSubmit)}>

                {isLoading && <CircularProgress/>}

                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <TextField fullWidth label="Email" type="email" size="small" {...register("email")}
                               error={!!errors.email} helperText={errors.email?.message}/>
                    {
                        mode == "signUp" &&
                        <TextField fullWidth label="Name" size="small" {...register("name")} error={!!errors.name}
                                   helperText={errors.name?.message}/>
                    }

                    <TextField fullWidth label="Password" type="password" size="small" {...register("password")}
                               error={!!errors.password} helperText={errors.password?.message}/>
                    <div style={{display: "flex", justifyContent: "right", gap: 10}}>
                        <Button variant="outlined" onClick={close}>Cancel</Button>
                        <Button variant="contained" type="submit">{mode == "signIn" ? "Sign In" : "Sign Up"}</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}


const signUpSchema = yup.object({
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

const signInSchema = yup.object({
    email: yup.string().required("Email is required").email(),
    password: yup.string().required("Password is required")

})

export {UserPasswordSignForm};
