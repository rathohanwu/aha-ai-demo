import md5 from "md5";
import {prisma} from "../lib/db";

export function createAccount(name: string, email: string, password?: string) {
    return prisma.account.create({
        data: {
            name: name,
            password: password ? md5(password) as string : null,
            email: email
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
