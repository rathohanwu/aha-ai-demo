import {Request, Response, NextFunction} from 'express';
import {verifyJwt} from "./jwt";
import * as accountController from "src/account/controller"

const activeAccountEmails = new Set<string>();

export async function activeSessionTracker(request: Request, res: Response, next: NextFunction) {

    try {
        const jwtTokenText = request.headers["authorization"];
        if (jwtTokenText) {
            const jwtToken = verifyJwt(jwtTokenText);
            activeAccountEmails.add(jwtToken.email);
        }
    } catch (e) {
        console.error(e);
    }
    next();
}

setInterval(async () => {

    const emails = Array.from(activeAccountEmails.values())
    activeAccountEmails.clear();
    await accountController.updateAccountActiveTimeByEmails(emails);

}, 10_000)