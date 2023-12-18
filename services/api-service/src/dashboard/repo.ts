import {prisma} from "../lib/db";


export function findAccountAndLoginTimes() {
    return prisma.account.findMany({
        select: {
            name: true,
            email: true,
            signUpTime: true,
            activeTime: true,
            _count: {
                select: {
                    logins: true
                }
            }
        },
    });
}

export function findAccountCount() {
    return prisma.account.count({
        select: {
            _all: true
        }
    })
}

export function findAccountCountByActiveTime() {
    const [startDate, endDate] = getRangeOfDate();
    return prisma.account.count({
        where: {
            activeTime: {
                gte: startDate,
                lt: endDate
            }
        }
    })
}

function getRangeOfDate() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    endDate.setSeconds(endDate.getSeconds() - 1);
    return [startDate, endDate]
}