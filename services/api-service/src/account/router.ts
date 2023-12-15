import {Router} from "src/utils/http";
import {Get,} from "@nestjs/common";
import * as controller from "./controller";
import {JwtToken, UseJwtToken} from "../utils/jwt";
import {ApiBearerAuth, ApiCookieAuth, ApiSecurity, ApiTags} from "@nestjs/swagger";

@ApiTags('Account')
@Router("account")
export class AccountRouter {

    @Get()
    @ApiBearerAuth("access-token")
    me(@UseJwtToken() jwtToken: JwtToken) {
        return controller.findAccountAndVerifiedStatus(jwtToken.email, jwtToken.signMethod);
    }

}