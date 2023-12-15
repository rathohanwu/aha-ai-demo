import {Router} from "src/utils/http";
import {Get,} from "@nestjs/common";
import * as controller from "./controller";
import {JwtToken, UseJwtToken} from "../utils/jwt";

@Router("account")
export class AccountRouter {

    @Get()
    me(@UseJwtToken() jwtToken: JwtToken) {
        return controller.findAccountAndVerifiedStatus(jwtToken.email, jwtToken.signMethod);
    }

}