import * as service from "./service";


export function signInOrUpByGoogle(code: string) {
    return service.signInOrUpByGoogle(code);
}
