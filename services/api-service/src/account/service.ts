import * as repo from './repo';
import * as authController from '../auth/controller';
import {throwHttpException} from '../utils/errors';
import {SignMethod} from '../utils/jwt';

export function updateAccountActiveTimeByEmails(emails: string[]) {
  return repo.updateAccountActiveTimeByEmails(emails);
}

export async function updateAccountPasswordByEmail(
  email: string,
  oldPassword: string,
  password: string
) {
  const account = await findAccountByEmailAndPassword(email, oldPassword);
  if (!account) {
    throwHttpException('old password is wrong');
  }
  return repo.updateAccountPasswordByEmail(email, password);
}

export function updateAccountNameByEmail(email: string, name: string) {
  return repo.updateAccountNameByEmail(email, name);
}

export function findAccountByEmailAndPassword(email: string, password: string) {
  return repo.findAccountByEmailAndPassword(email, password);
}

export function createAccount(name: string, email: string, password?: string) {
  return repo.createAccount(name, email, password);
}

export function findAccountByEmail(email: string) {
  return repo.findAccountByEmail(email);
}

export async function findAccountAndVerifiedStatus(
  email: string,
  signMethod: SignMethod
): Promise<{
  id: number;
  name: string;
  email: string;
  signUpTime: Date;
  verified: boolean;
  signMethod: SignMethod;
}> {
  const account = await repo.findAccountByEmail(email);

  if (!account) {
    throwHttpException('Account is not found');
  }

  const {name, signUpTime, id, email: accountEmail} = account;
  const isGoogle = signMethod === 'GOOGLE';
  const verifyEmail =
    await authController.findAccountVerifyEmailByAccountIdAndStatus(id, true);

  return {
    id,
    name,
    email: accountEmail,
    signUpTime,
    verified: isGoogle || !!verifyEmail,
    signMethod,
  };
}
