import React from 'react';
import {useLoginStore} from '@/stores/loginStore';
import {showErrorMessage} from '@/utils/toast';

function AuthWrapComponent<T>(WrappedComponent: React.ComponentType<T>) {
  return (
    props: React.PropsWithChildren<T> &
      React.ComponentProps<typeof WrappedComponent>
  ) => {
    const isLogin = useLoginStore(state => state.isLogin);
    if (!isLogin) {
      showErrorMessage('user should login first to access to this page');
      window.location.href = 'http://localhost:3000/';
    }

    return <WrappedComponent {...props} />;
  };
}

export default AuthWrapComponent;
