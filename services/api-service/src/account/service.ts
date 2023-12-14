import * as repo from "./repo";
import {getGoogleUserInfo} from "../lib/auth";
import {signJwt} from "../utils/jwt";
import {signUpUserPasswordDto} from "./schema";
import {throwHttpException} from "../utils/errors";
import {sendEmail} from "../lib/mail";


export async function signGoogle(code: string) {
    const userInfo = await getGoogleUserInfo(code);
    const existingAccount = await repo.findAccountByEmail(userInfo.email);
    if (!!existingAccount) {
        const {name, email} = existingAccount;
        return signJwt({name, email, signMethod: "GOOGLE"})
    }
    const newAccount = await repo.createAccount(userInfo.name, userInfo.email);
    const {name, email} = newAccount;
    return signJwt({name, email, signMethod: "GOOGLE"})
}

export async function signUp(signUp: signUpUserPasswordDto) {

    const existingAccount = await repo.findAccountByEmail(signUp.mail);
    if (!!existingAccount) {
        throwHttpException("the email is already registered");
    }
    const {name, mail: email, password} = signUp;
    const verifyEmail = await repo.createAccountWithVerifyEmail(name, email, password);
    await sendEmail(email, name, `http://localhost:3020/account/verify?code=${verifyEmail.code}`);
    return signJwt({name, email, signMethod: "PASSWORD"})

}

export async function userPasswordSignUp(user: string, email: string, password: string) {
    const account = await repo.createAccountWithVerifyEmail(user, email, password);
}

