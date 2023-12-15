import * as service from "./service"
import {signInUserPasswordDto, signUpUserPasswordDto} from "./schema";

export async function findAccountVerifyEmailByAccountId(accountId: number) {
    return service.findAccountVerifyEmailByAccountId(accountId);
}

export function signUp(signUp: signUpUserPasswordDto) {
    return service.signUp(signUp);
}

export function signIn(signIn: signInUserPasswordDto) {
    return service.signIn(signIn);
}

export function verifyEmail(code: string) {
    return service.verifyEmail(code);
}

export function signGoogle(code: string) {
    return service.signGoogle(code);
}


