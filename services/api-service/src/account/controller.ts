import * as service from "./service";
import {SignMethod} from "../utils/jwt";

export async function updateAccountActiveTimeByEmails(emails: string[]) {
    return service.updateAccountActiveTimeByEmails(emails);
}

export function updateAccountPasswordByEmail(email: string, oldPassword: string, password: string) {
    return service.updateAccountPasswordByEmail(email, oldPassword, password);
}

export async function findAccountByEmailAndPassword(email: string, password: string) {
    return service.findAccountByEmailAndPassword(email, password);
}

export async function createAccount(name: string, email: string, password?: string) {
    return service.createAccount(name, email, password);
}


export async function findAccountByEmail(email: string) {
    return service.findAccountByEmail(email);
}


export function findAccountAndVerifiedStatus(email: string, signMethod: SignMethod) {
    return service.findAccountAndVerifiedStatus(email, signMethod)
}

export function updateAccountNameByEmail(email: string, name: string) {
    return service.updateAccountNameByEmail(email, name);
}
