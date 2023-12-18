import * as repo from './repo';
import {getGoogleUserInfo} from '../lib/auth';
import {signJwt, SignMethod} from '../utils/jwt';
import {SignInUserPasswordDTO, SignUpUserPasswordDTO} from './schema';
import {throwHttpException} from '../utils/errors';
import {sendEmail} from '../lib/mail';
import * as accountController from '../account/controller';

export async function resendVerifyEmail(email: string, signMethod: SignMethod) {
  const account = await accountController.findAccountAndVerifiedStatus(
    email,
    signMethod
  );
  if (account.verified) {
    throwHttpException('the email has been verified');
  }
  return sendVerificationEmail(account.email, account.name, account.id);
}

export function findAccountVerifyEmailByAccountId(accountId: number) {
  return repo.findAccountVerifyEmailByAccountId(accountId);
}

export async function signGoogle(code: string) {
  const userInfo = await getGoogleUserInfo(code);
  let account = await accountController.findAccountByEmail(userInfo.email);

  if (!account) {
    account = await accountController.createAccount(
      userInfo.name,
      userInfo.email
    );
  }

  return createJwtTokenAndAccountLogin(account, 'GOOGLE');
}

export async function signUp(signUp: SignUpUserPasswordDTO) {
  const existingAccount = await accountController.findAccountByEmail(
    signUp.email
  );
  if (existingAccount) {
    throwHttpException('the email is already registered');
  }

  const account = await accountController.createAccount(
    signUp.name,
    signUp.email,
    signUp.password
  );
  await sendVerificationEmail(account.email, account.name, account.id);
  return createJwtTokenAndAccountLogin(account, 'PASSWORD');
}

async function sendVerificationEmail(
  email: string,
  name: string,
  accountId: number
) {
  const verifyEmail = await repo.createAccountVerifyEmail(accountId);
  return sendEmail(
    email,
    name,
    `http://localhost:3020/auth/verify?code=${verifyEmail.code}`
  );
}

export async function signIn(signIn: SignInUserPasswordDTO) {
  const account = await accountController.findAccountByEmailAndPassword(
    signIn.email,
    signIn.password
  );
  if (!account) {
    throwHttpException('the user name or password is wrong');
  }

  return createJwtTokenAndAccountLogin(account, 'PASSWORD');
}

export async function verifyEmail(code: string) {
  const verifyEmail = await repo.findAccountVerifyEmailByCode(code);

  if (!verifyEmail) {
    throwHttpException('the code of verified email is wrong');
  }

  if (verifyEmail.verified) {
    throwHttpException('the email has been verified');
  }

  try {
    await repo.updateAccountVerifyEmailStatus(verifyEmail.id, true);
    return true;
  } catch (e) {
    return false;
  }
}

async function createJwtTokenAndAccountLogin(
  account: {
    id: number;
    name: string;
    email: string;
  },
  signMethod: SignMethod
) {
  const {id, name, email} = account;
  await repo.createAccountLogin(id);
  return signJwt({name, email, signMethod});
}
