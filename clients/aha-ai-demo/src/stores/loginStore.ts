import {create} from 'zustand';
import cookie from 'js-cookie';

const JWT_TOKEN_NAME = 'JWT_TOKEN';

interface LoginState {
  isLogin: boolean;
  refresh: () => void;
  logout: () => void;
}

const useLoginStore = create<LoginState>((set, get) => ({
  isLogin: true,
  refresh: () => {
    set({isLogin: !!cookie.get(JWT_TOKEN_NAME)});
  },
  logout: () => {
    window.location.href = '/';
    cookie.remove(JWT_TOKEN_NAME);
    get().refresh();
  },
}));

export {useLoginStore};
