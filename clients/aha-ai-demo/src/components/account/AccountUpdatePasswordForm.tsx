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
import {passwordValidation} from '@/utils/validation';
import {HttpError} from '@/types/http';

type Props = {
  closeForm: () => void;
};

type Inputs = {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

function AccountUpdatePasswordForm(props: Props) {
  const {closeForm} = props;
  const {updatePassword} = useAccountUpdate();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({resolver: yupResolver(schema)});

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      showLoadingMessage('Waiting...');
      await updatePassword(data);
      showSuccessfulMessage('update password successfully');
      closeForm();
    } catch (err) {
      showAPIErrorMessage(err as HttpError);
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
      <Typography>Reset Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <TextField
            fullWidth
            label="Old Password"
            type="password"
            size="small"
            {...register('oldPassword')}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            size="small"
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <TextField
            fullWidth
            label="Password Confirmation"
            type="password"
            size="small"
            {...register('passwordConfirmation')}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
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

const schema = yup
  .object({
    oldPassword: yup.string().required('Old password is required'),
    newPassword: passwordValidation,
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  })
  .required();

export {AccountUpdatePasswordForm};
