import * as repo from "./repo";
import {getGoogleUserInfo} from "../lib/auth";

export async function userPasswordSignUp(user: string, email: string, password: string) {

    const account = await repo.createAccount(user, email, password, "USERPASSWORD");
}

async function googleSignIn(code: string) {
    const result = await getGoogleUserInfoByCode(code);

}

async function getGoogleUserInfoByCode(code: string) {
    const accessTokenResponse = getGoogleUserInfo(code);
}


