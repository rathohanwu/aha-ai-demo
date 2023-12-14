import {Router} from "src/utils/http";
import {Body, Get, Post, Query, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../utils/validation";
import {
    signInGoogleDto,
    signInGoogleSchema,
    signUpUserPasswordDto,
    signUpUserPasswordSchema,
    verifyEmailCodeDto, verifyEmailCodeSchema
} from "./schema";
import * as controller from "./controller";

@Router("account")
export class AccountRouter {

    @Get("verify")
    @UsePipes(ValidationPipe(verifyEmailCodeSchema))
    verifyEmail(@Query() verifyEmail: verifyEmailCodeDto) {
        return controller.verifyEmail(verifyEmail.code);
    }

    @Post("google")
    @UsePipes(ValidationPipe(signInGoogleSchema))
    signByGoogle(@Body() signIn: signInGoogleDto) {
        return controller.signGoogle(signIn.code);
    }

    @Post("signup")
    @UsePipes(ValidationPipe(signUpUserPasswordSchema))
    signUp(@Body() signUp: signUpUserPasswordDto) {
        return controller.signUp(signUp);
    }

}