import * as jwt from "jsonwebtoken";

type Account = {
    name: string,
    email: string
}

type JwtToken = Account & { exp: number }

const JWT_SECRET_KEY = "SECRET";

export function signJwt(account: Account) {
    return jwt.sign({...account, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, JWT_SECRET_KEY)
}

export function verifyJwt(jwtToken: string){
    return  jwt.verify(jwtToken, JWT_SECRET_KEY) as JwtToken
}
