import {Router} from "src/utils/http";
import {Get} from "@nestjs/common";

import * as controller from "./controller";
import {JwtToken, UseJwtToken} from "../utils/jwt";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Dashboard')
@Router("dashboard")
export class DashBoardRouter {

    @Get("users")
    async getUserStatistics(@UseJwtToken() jwtToken: JwtToken) {
        return controller.getUserStatistics(jwtToken.email, jwtToken.signMethod);
    }

}