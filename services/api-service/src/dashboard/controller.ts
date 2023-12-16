import * as service from "./service"
import {SignMethod} from "../utils/jwt";

export function getUserStatistics(email: string, signMethod: SignMethod) {
    return service.getUserStatistics(email, signMethod);
}


