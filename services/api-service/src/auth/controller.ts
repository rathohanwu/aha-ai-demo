import * as service from "./service"
import {SignInUserPasswordDTO, SignUpUserPasswordDTO} from "./schema";
import {SignMethod} from "../utils/jwt";

export function resendVerifyEmail(email: string, signMethod: SignMethod) {
    return service.resendVerifyEmail(email,signMethod);
}

export async function findAccountVerifyEmailByAccountId(accountId: number) {
    return service.findAccountVerifyEmailByAccountId(accountId);
}

export function signUp(signUp: SignUpUserPasswordDTO) {
    return service.signUp(signUp);
}

export function signIn(signIn: SignInUserPasswordDTO) {
    return service.signIn(signIn);
}

export function verifyEmail(code: string) {
    return service.verifyEmail(code);
}

export function signGoogle(code: string) {
    return service.signGoogle(code);
}


