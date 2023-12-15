import * as repo from "./repo";
import {getGoogleUserInfo} from "../lib/auth";
import {signJwt} from "../utils/jwt";
import {signInUserPasswordDto, signUpUserPasswordDto} from "./schema";
import {throwHttpException} from "../utils/errors";
import {sendEmail} from "../lib/mail";
import * as accountController from "../account/controller";

export function findAccountVerifyEmailByAccountId(accountId: number) {
    return repo.findAccountVerifyEmailByAccountId(accountId);
}

export async function signGoogle(code: string) {
    const userInfo = await getGoogleUserInfo(code);
    const existingAccount = await accountController.findAccountByEmail(userInfo.email);
    if (existingAccount) {
        const {name, email} = existingAccount;
        return signJwt({name, email, signMethod: "GOOGLE"})
    }
    const newAccount = await accountController.createAccount(userInfo.name, userInfo.email);
    const {name, email} = newAccount;
    return signJwt({name, email, signMethod: "GOOGLE"})
}

export async function signUp(signUp: signUpUserPasswordDto) {

    const existingAccount = await accountController.findAccountByEmail(signUp.email);
    if (!!existingAccount) {
        throwHttpException("the email is already registered");
    }

    const {name, email, password} = signUp;
    const account = await accountController.createAccount(name, email, password);
    const verifyEmail = await repo.createAccountVerifyEmail(account.id);
    await sendEmail(email, name, `http://localhost:3020/account/verify?code=${verifyEmail.code}`);
    return signJwt({name, email, signMethod: "PASSWORD"})

}

export async function signIn(signIn: signInUserPasswordDto) {

    const account = await accountController.findAccountByEmailAndPassword(signIn.email, signIn.password);
    if (!account) {
        throwHttpException("the user name or password is wrong");
    }
    const {name, email} = account;
    return signJwt({name, email, signMethod: "PASSWORD"})

}

export async function verifyEmail(code: string) {
    const verifyEmail = await repo.findAccountVerifyEmailByCode(code);

    if (!verifyEmail) {
        throwHttpException("the code of verified email is wrong");
    }

    if (verifyEmail.verified) {
        throwHttpException("the email has been verified");
    }

    return repo.updateAccountVerifyEmailStatus(verifyEmail.id, true);
}