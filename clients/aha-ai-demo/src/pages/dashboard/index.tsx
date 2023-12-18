import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import {useAccount} from '@/hooks/account/useAccount';
import {TransitionsModal} from '@/components/modal/TransitionsModal';
import {useModal} from '@/hooks/modal/useModal';
import {AccountUpdatePasswordForm} from '@/components/account/AccountUpdatePasswordForm';
import AuthWrapComponent from '@/components/auth/AuthWrapComponent';
import {api} from '@/lib/api';
import {
  dismissMessage,
  showAPIErrorMessage,
  showLoadingMessage,
} from '@/utils/toast';
import UserTable from '@/components/dashboard/UserTable';
import UserOverview from '@/components/dashboard/UserOverview';
import {HttpError} from '@/types/http';

function Dashboard() {
  const {account} = useAccount();
  const accountModal = useModal();

  async function resendEmail() {
    try {
      showLoadingMessage('Sending Email');
      await api.post('auth/mail/resend');
      dismissMessage();
    } catch (e) {
      showAPIErrorMessage(e as HttpError);
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant={'h5'}>Database Dashboard</Typography>
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          {account?.verified ? (
            <Button variant={'contained'} onClick={accountModal.open}>
              Reset Password
            </Button>
          ) : (
            <Button variant={'outlined'} onClick={resendEmail}>
              Resend Email
            </Button>
          )}
        </div>
      </div>

      {account?.verified && (
        <div
          style={{
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <UserOverview />
          <UserTable />
        </div>
      )}

      <TransitionsModal isOpen={accountModal.isOpen} close={accountModal.close}>
        <AccountUpdatePasswordForm closeForm={accountModal.close} />
      </TransitionsModal>
    </div>
  );
}

export default AuthWrapComponent(Dashboard);
