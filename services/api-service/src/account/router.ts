import {Router} from "src/utils/http";
import {Body, Get, Post, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../utils/validation";
import {signInGoogleDto, signInGoogleSchema} from "./schema";
import * as controller from "./controller";

@Router("account")
export class AccountRouter {

    @Get()
    findAll(): string {
        return "This action returns all cats"
    }

    @Post("sign_in_or_up/google")
    @UsePipes(ValidationPipe(signInGoogleSchema))
    signInOrUpByGoogle(@Body() signIn: signInGoogleDto) {
        return controller.signInOrUpByGoogle(signIn.code);
    }
}