import Typography from "@mui/material/Typography";
import {CircularProgress} from "@/components/feedback/CircularProgress";
import {Button, TextField} from "@mui/material";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {useAccountUpdate} from "@/hooks/account/useAccountUpdate";
import {showErrorMessage, showSuccessfulMessage} from "@/utils/toast";

type Props = {
    name?: string
    closeForm: () => void
}

type Inputs = {
    name: string,
};

function AccountUpdateForm(props: Props) {

    const {name, closeForm} = props;
    const {updateName} = useAccountUpdate();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver: yupResolver(schema)});
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setLoading(true);
            await updateName(data);
            showSuccessfulMessage("update name successful");
            setLoading(false);
            closeForm();
        } catch (err) {
            showErrorMessage(err);
            setLoading(false)
        }
    };
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",

        }}>
            <Typography>Account Name Update</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                {loading && <CircularProgress/>}
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <TextField fullWidth label="Name" size="small" defaultValue={name} {...register("name")}
                               error={!!errors.name}
                               helperText={errors.name?.message}/>

                    <div style={{display: "flex", justifyContent: "right", gap: 10}}>
                        <Button variant="outlined" onClick={close}>Cancel</Button>
                        <Button variant="contained" type="submit">Update</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const schema = yup.object({
    name: yup.string().required("name is required")
})

export {AccountUpdateForm}