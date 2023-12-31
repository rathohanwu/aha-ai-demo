import {useAccount} from '@/hooks/account/useAccount';
import Typography from '@mui/material/Typography';
import {Button, LinearProgress} from '@mui/material';
import {useModal} from '@/hooks/modal/useModal';
import {TransitionsModal} from '@/components/modal/TransitionsModal';
import {AccountUpdateForm} from '@/components/account/AccountUpdateForm';
import AuthWrapComponent from '@/components/auth/AuthWrapComponent';

function Profile() {
  const {account, isLoading} = useAccount();
  const accountModal = useModal();

  if (isLoading) return <LinearProgress />;
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant={'h5'}>Profile</Typography>
        <Button variant={'contained'} onClick={accountModal.open}>
          Edit
        </Button>
      </div>
      <Typography variant="subtitle1">
        Hello, {account?.name} and your email is {account?.email}
      </Typography>

      <TransitionsModal isOpen={accountModal.isOpen} close={accountModal.close}>
        <AccountUpdateForm
          name={account?.name}
          closeForm={accountModal.close}
        />
      </TransitionsModal>
    </div>
  );
}

export default AuthWrapComponent(Profile);
