import {Button} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';

function GoogleAuthButton() {
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return (
    <Button
      variant={'outlined'}
      style={{display: 'flex', gap: 10}}
      onClick={() =>
        (window.location.href = `${googleAuthUrl}?client_id=${clientId}&scope=${scopes.join(
          ' '
        )}&redirect_uri=${redirectUrl}&response_type=code`)
      }
    >
      <GoogleIcon fontSize={'small'} />
      <Typography component={'h2'}>Sign Up With Google</Typography>
    </Button>
  );
}

export {GoogleAuthButton};
