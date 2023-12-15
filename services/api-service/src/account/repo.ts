import * as md5 from "md5";
import {prisma} from "../lib/db";

export async function findAccountByEmailAndPassword(email: string, password: string) {
    return prisma.account.findUnique({
        where: {
            email: email,
            password: md5(password)
        }
    })
}


export function createAccount(name: string, email: string, password?: string) {
    return prisma.account.create({
        data: {
            name: name,
            email: email,
            password: password ? md5(password) as string : null,
        }
    })
}

export function findAccountByEmail(email: string) {
    return prisma.account.findUnique({
        where: {
            email: email
        }
    })
}
