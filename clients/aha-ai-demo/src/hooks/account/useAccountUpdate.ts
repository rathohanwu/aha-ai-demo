import {api} from '@/lib/api';
import {useAccount} from '@/hooks/account/useAccount';

function useAccountUpdate() {
  const {mutate} = useAccount();

  const updateName = async <T>(data: T) => {
    await api.patch('/account/name', data);
    await mutate();
  };

  const updatePassword = async <T>(data: T) => {
    await api.patch('/account/password', data);
  };

  return {
    updateName,
    updatePassword,
  };
}

export {useAccountUpdate};
