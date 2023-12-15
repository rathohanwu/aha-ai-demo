import * as jwt from "jsonwebtoken";
import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {throwHttpException} from "./errors";

export type SignMethod = "GOOGLE" | "PASSWORD";

type Account = {
    name: string,
    email: string,
    signMethod: SignMethod
}

export type JwtToken = Account & { exp: number }

const JWT_SECRET_KEY = "SECRET";
export const JWT_TOKEN_NAME = "JWT_TOKEN";

export function signJwt(account: Account) {
    return jwt.sign({...account}, JWT_SECRET_KEY, {expiresIn: "7 days"})
}

export function verifyJwt(jwtToken: string) {

    try {
        return jwt.verify(jwtToken.replace("Bearer ", ""), JWT_SECRET_KEY) as JwtToken
    } catch (e) {
        console.error(e);
        throwHttpException("the authentication is wrong");
    }

}


export const UseJwtToken = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const jwtToken = request.headers["authorization"];
        if (!jwtToken) {
            throwHttpException("authentication is not found")
        }
        return verifyJwt(jwtToken);
    },
);