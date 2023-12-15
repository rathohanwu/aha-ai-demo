import {prisma} from "../lib/db";
import {getRandomCode} from "../utils/random-code";


export async function findAccountVerifyEmailByAccountId(accountId: number) {
    return prisma.accountVerifyEmail.findFirst({
        where: {
            accountId: accountId,
            verified: true
        }
    })
}


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

export async function createAccountVerifyEmail(accountId: number) {

    return prisma.accountVerifyEmail.create({
        data: {
            code: getRandomCode(),
            accountId: accountId
        }
    })

}


export async function createAccountLogin(accountId: number) {

    return prisma.accountLogin.create({
        data: {
            account: {
                connect: {id: accountId}
            }
        }
    })
}