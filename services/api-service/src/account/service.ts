import * as repo from "./repo";
import {getGoogleUserInfo} from "../lib/auth";
import {signJwt} from "../utils/jwt";

export async function signInOrUpByGoogle(code: string) {
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

export async function userPasswordSignUp(user: string, email: string, password: string) {
    const account = await repo.createAccount(user, email, password);
}



