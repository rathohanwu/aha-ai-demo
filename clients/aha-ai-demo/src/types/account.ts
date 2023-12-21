type Account = {
  name: string;
  email: string;
  signUpTime: string;
  activeTime: string;
  verified: boolean;
  signMethod: 'GOOGLE' | 'PASSWORD';
  _count: {
    logins: number;
  };
};

// eslint-disable-next-line prettier/prettier
export {type Account}
