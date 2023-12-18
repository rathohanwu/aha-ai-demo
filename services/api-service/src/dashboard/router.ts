import {Router} from "src/utils/http";
import {Get} from "@nestjs/common";

import * as controller from "./controller";
import {JwtToken, UseJwtToken} from "../utils/jwt";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('Dashboard')
@Router("dashboard")
export class DashBoardRouter {

    @Get("users")
    @ApiBearerAuth("access-token")
    async getUsers(@UseJwtToken() jwtToken: JwtToken) {
        return controller.getUsers(jwtToken.email, jwtToken.signMethod);
    }

    @Get("users/overview")
    @ApiBearerAuth("access-token")
    async getUserOverview(@UseJwtToken() jwtToken: JwtToken) {
        return controller.getUserOverview();
    }


}