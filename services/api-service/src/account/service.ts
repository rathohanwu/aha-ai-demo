import * as repo from "./repo";
import * as authController from "../auth/controller";
import {throwHttpException} from "../utils/errors";
import {SignMethod} from "../utils/jwt";


export function findAccountByEmailAndPassword(email: string, password: string) {
    return repo.findAccountByEmailAndPassword(email, password);
}


export function createAccount(name: string, email: string, password?: string) {
    return repo.createAccount(name, email, password);
}

export function findAccountByEmail(email: string) {
    return repo.findAccountByEmail(email);
}

export async function findAccountAndVerifiedStatus(email: string, signMethod: SignMethod): Promise<{
    name: string,
    signUpTime: Date,
    verified: boolean
}> {
    const account = await repo.findAccountByEmail(email);

    if (!account) {
        throwHttpException("Account is not found")
    }

    const {name, signUpTime, id: accountId} = account;
    const isGoogle = signMethod == "GOOGLE";
    const verifyEmail = await authController.findAccountVerifyEmailByAccountId(accountId);

    return {
        name,
        signUpTime,
        verified: isGoogle || !!verifyEmail
    }
}