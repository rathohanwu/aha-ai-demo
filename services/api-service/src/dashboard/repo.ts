import {prisma} from '../lib/db';

export function findAccountAndLoginTimes() {
  return prisma.account.findMany({
    select: {
      name: true,
      email: true,
      signUpTime: true,
      activeTime: true,
      _count: {
        select: {
          logins: true,
        },
      },
    },
  });
}

export function findAccountCount() {
  return prisma.account.count({
    select: {
      _all: true,
    },
  });
}

export function findAccountCountByActiveTimeRange(
  startDate: Date,
  endDate: Date
) {
  return prisma.account.count({
    where: {
      activeTime: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
}
