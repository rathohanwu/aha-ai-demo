import * as md5 from "md5";
import {prisma} from "../lib/db";
import {getRandomCode} from "../utils/random-code";

export function updateAccountVerifyEmailStatus(id: number, verified: boolean) {
    return prisma.accountVerifyEmail.update({
        data: {
            verified: verified
        },
        where: {
            id: id
        }
    })
}


export function findAccountVerifyEmailByCode(code: string) {
    return prisma.accountVerifyEmail.findUnique({
        where: {
            code: code
        }
    })
}


export async function createAccountWithVerifyEmail(name: string, email: string, password: string) {

    return prisma.$transaction(async (tx) => {

        const account = await tx.account.create({
            data: {
                name: name,
                password: password ? md5(password) as string : null,
                email: email
            }
        })

        const verifyEmail = await tx.accountVerifyEmail.create({
            data: {
                code: getRandomCode(),
                accountId: account.id
            }
        })

        return verifyEmail;
    })


}


export function createAccount(name: string, email: string) {
    return prisma.account.create({
        data: {
            name: name,
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
