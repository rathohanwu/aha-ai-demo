import * as service from "./service";
import {signInUserPasswordDto, signUpUserPasswordDto} from "./schema";

export function signIn(signIn: signInUserPasswordDto) {
    return service.signIn(signIn);
}
export function verifyEmail(code: string) {
    return service.verifyEmail(code);
}

export function signGoogle(code: string) {
    return service.signGoogle(code);
}

export function signUp(signUp: signUpUserPasswordDto) {
    return service.signUp(signUp);
}

