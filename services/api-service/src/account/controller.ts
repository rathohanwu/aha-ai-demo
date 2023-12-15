import * as service from "./service";
import {signMethod} from "../utils/jwt";

export async function findAccountByEmailAndPassword(email: string, password: string) {
    return service.findAccountByEmailAndPassword(email, password);
}


export async function createAccount(name: string, email: string, password?: string) {
    return service.createAccount(name, email, password);
}


export async function findAccountByEmail(email: string) {
    return service.findAccountByEmail(email);
}


export function findAccountAndVerifiedStatus(email: string, signMethod: signMethod) {
    return service.findAccountAndVerifiedStatus(email, signMethod)
}

