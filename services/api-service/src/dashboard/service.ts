import * as repo from './repo';
import {SignMethod} from '../utils/jwt';
import {throwHttpException} from '../utils/errors';
import * as accountController from '../account/controller';
import * as moment from 'moment';

export async function getUsers(email: string, signMethod: SignMethod) {
  const account = await accountController.findAccountAndVerifiedStatus(
    email,
    signMethod
  );
  if (!account.verified) {
    throwHttpException("the account hasn't been verified");
  }
  return repo.findAccountAndLoginTimes();
}

export async function getUserOverview(): Promise<{
  totalCount: number;
  todayActiveCount: number;
  lastSevenDayActiveCount: number;
}> {
  const startOfToday = moment().startOf('day').toDate();
  const endOfToday = moment().endOf('day').toDate();
  const startOfSevenDayAgo = moment()
    .startOf('day')
    .subtract(7, 'days')
    .toDate();

  const results = await Promise.all([
    repo.findAccountCount(),
    repo.findAccountCountByActiveTimeRange(startOfToday, endOfToday),
    repo.findAccountCountByActiveTimeRange(startOfSevenDayAgo, endOfToday),
  ]);
  return {
    totalCount: results[0]._all,
    todayActiveCount: results[1],
    lastSevenDayActiveCount: results[2] / 7,
  };
}
