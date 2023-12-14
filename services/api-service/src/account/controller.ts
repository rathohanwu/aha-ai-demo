import * as service from "./service";
import {signUpUserPasswordDto} from "./schema";

export function signGoogle(code: string) {
    return service.signGoogle(code);
}

export function signUp(signUp: signUpUserPasswordDto) {
    return service.signUp(signUp);
}

