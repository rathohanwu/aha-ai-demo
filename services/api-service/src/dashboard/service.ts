import * as repo from "./repo";
import {SignMethod} from "../utils/jwt";
import {throwHttpException} from "../utils/errors";
import * as accountController from "../account/controller";

export async function getUserStatistics(email: string, signMethod: SignMethod) {
    const account = await accountController.findAccountAndVerifiedStatus(email, signMethod);
    if (!account.verified) {
        throwHttpException("the account hasn't been verified")
    }
    return repo.findAccountAndLoginTimes();
}
