import {Button, TextField} from '@mui/material';
import {useForm, SubmitHandler} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {api} from '@/lib/api';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useLoginStore} from '@/stores/loginStore';
import {CircularProgress} from '@/components/feedback/CircularProgress';
import {showAPIErrorMessage} from '@/utils/toast';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from '@/utils/validation';
import {HttpError} from '@/types/http';

type Inputs = {
  email: string;
  password: string;
  name?: string;
};

type Props = {
  closeForm: () => void;
  mode: 'signIn' | 'signUp';
};

function UserPasswordSignForm(props: Props) {
  const {closeForm, mode} = props;
  const [isLoading, setIsLoading] = useState(false);
  const refreshLoginStatus = useLoginStore(state => state.refresh);
  const router = useRouter();
  const formSchema = mode === 'signIn' ? signInSchema : signUpSchema;
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({resolver: yupResolver(formSchema)});

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoading(true);
      const url = mode === 'signIn' ? '/auth/signin' : '/auth/signup';
      await api.post(url, data);
      setTimeout(async () => {
        setIsLoading(false);
        refreshLoginStatus();
        closeForm();
        await router.push('/dashboard');
      }, 2000);
    } catch (err) {
      showAPIErrorMessage(err as HttpError);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading && <CircularProgress />}

        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            size="small"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          {mode === 'signUp' && (
            <TextField
              fullWidth
              label="Name"
              size="small"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}

          <TextField
            fullWidth
            label="Password"
            type="password"
            size="small"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <div style={{display: 'flex', justifyContent: 'right', gap: 10}}>
            <Button variant="outlined" onClick={close}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const signUpSchema = yup
  .object({
    email: emailValidation,
    name: nameValidation,
    password: passwordValidation,
  })
  .required();

const signInSchema = yup.object({
  email: emailValidation,
  password: yup.string().required('Password is required'),
});

export {UserPasswordSignForm};
