import * as repo from "./repo";
import {SignMethod} from "../utils/jwt";
import {throwHttpException} from "../utils/errors";
import * as accountController from "../account/controller";
import {findAccountCountByActiveTime} from "./repo";


export async function getUsers(email: string, signMethod: SignMethod) {
    const account = await accountController.findAccountAndVerifiedStatus(email, signMethod);
    if (!account.verified) {
        throwHttpException("the account hasn't been verified")
    }
    return repo.findAccountAndLoginTimes();
}

export async function getUserOverview(): Promise<
    {
        totalCount: number,
        activeTodayCount: number
    }> {

    const results = await Promise.all([repo.findAccountCount(), repo.findAccountCountByActiveTime()])
    return {
        totalCount: results[0]._all,
        activeTodayCount: results[1]
    }

}

