import Typography from '@mui/material/Typography';
import {Button, TextField} from '@mui/material';
import * as yup from 'yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAccountUpdate} from '@/hooks/account/useAccountUpdate';
import {
  dismissMessage,
  showAPIErrorMessage,
  showLoadingMessage,
  showSuccessfulMessage,
} from '@/utils/toast';
import {nameValidation} from '@/utils/validation';
import {HttpError} from '@/types/http';

type Props = {
  name?: string;
  closeForm: () => void;
};

type Inputs = {
  name: string;
};

function AccountUpdateForm(props: Props) {
  const {name, closeForm} = props;
  const {updateName} = useAccountUpdate();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({resolver: yupResolver(schema)});

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      showLoadingMessage('Waiting...');
      await updateName(data);
      showSuccessfulMessage('update name successful');
      closeForm();
    } catch (err) {
      showAPIErrorMessage(err as unknown as HttpError);
    } finally {
      setTimeout(() => dismissMessage(), 2000);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Typography>Update Account Name </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <TextField
            fullWidth
            label="Name"
            size="small"
            defaultValue={name}
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <div style={{display: 'flex', justifyContent: 'right', gap: 10}}>
            <Button variant="outlined" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const schema = yup.object({
  name: nameValidation,
});

export {AccountUpdateForm};
