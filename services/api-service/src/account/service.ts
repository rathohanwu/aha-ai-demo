import * as repo from "./repo";
import {signMethod} from "../utils/jwt";
import * as authController from "../auth/controller";
import {throwHttpException} from "../utils/errors";


export function findAccountByEmailAndPassword(email: string, password: string) {
    return repo.findAccountByEmailAndPassword(email, password);
}


export function createAccount(name: string, email: string, password?: string) {
    return repo.createAccount(name, email, password);
}

export function findAccountByEmail(email: string) {
    return repo.findAccountByEmail(email);
}

export async function findAccountAndVerifiedStatus(email: string, signMethod: signMethod): Promise<{
    name: string,
    signUpTime: Date,
    verified: boolean
}> {
    const account = await repo.findAccountByEmail(email);

    if (!account) {
        throwHttpException("Account is not found")
    }
    const {name, signUpTime, id} = account;

    if (signMethod == "GOOGLE") {
        return {name, signUpTime, verified: true}
    }

    const verifyEmail = await authController.findAccountVerifyEmailByAccountId(account.id)
    return {
        name,
        signUpTime,
        verified: !!verifyEmail
    }
}