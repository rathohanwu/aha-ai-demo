import {create} from 'zustand';
import cookie from 'js-cookie';
import {api} from '@/lib/api';

const JWT_TOKEN_NAME = 'JWT_TOKEN';

interface LoginState {
  isLogin: boolean;
  refresh: () => void;
  logout: () => void;
}

const useLoginStore = create<LoginState>((set, get) => {
  return {
    isLogin: true,
    refresh: () => {
      set({isLogin: !!cookie.get(JWT_TOKEN_NAME)});
    },
    logout: async () => {
      await api.get('/auth/logout');
      window.location.href = '/';
      get().refresh();
    },
  };
});

export {useLoginStore};
