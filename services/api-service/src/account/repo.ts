import md5 from "md5";
import {type SignUpMethod} from "@prisma/client";
import {prisma} from "../lib/db";

export async function createAccount(name: string, email: string, password: string, method: SignUpMethod) {

    return prisma.account.create({
        data: {
            name: name,
            password: md5(password) as string,
            email: email,
            signUpMethod: method
        }
    })
}
