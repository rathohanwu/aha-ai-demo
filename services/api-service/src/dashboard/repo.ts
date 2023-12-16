import {prisma} from "../lib/db";

export function findAccountAndLoginTimes() {
    return prisma.account.findMany({
        select: {
            name: true,
            email: true,
            signUpTime: true,
            _count: {
                select: {
                    logins: true
                }
            }
        },
    });
}
