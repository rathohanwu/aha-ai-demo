import * as jwt from "jsonwebtoken";
import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {throwHttpException} from "./errors";

type Account = {
    name: string,
    email: string,
    signMethod: "GOOGLE" | "PASSWORD"
}

type JwtToken = Account & { exp: number }

const JWT_SECRET_KEY = "SECRET";
const JWT_TOKEN = "JWT_TOKEN";

export function signJwt(account: Account) {
    return jwt.sign({...account, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, JWT_SECRET_KEY)
}

export function verifyJwt(jwtToken: string) {

    try {
        return jwt.verify(jwtToken, JWT_SECRET_KEY) as JwtToken
    } catch (e) {
        throwHttpException("the authentication is wrong");
    }

}


export const JwtToken = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const jwtToken = request.cookies?.[JWT_TOKEN];
        if (!jwtToken) {
            throwHttpException("authentication is not found")
        }
        return verifyJwt(jwtToken);
    },
);