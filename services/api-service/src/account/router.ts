import {Router} from "src/utils/http";
import {Body, Get, Post, Query, Res, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../utils/validation";
import {
    signInGoogleDto,
    signInGoogleSchema, signInUserPasswordDto, signInUserPasswordSchema,
    signUpUserPasswordDto,
    signUpUserPasswordSchema,
    verifyEmailCodeDto, verifyEmailCodeSchema
} from "./schema";
import * as controller from "./controller";
import {Response} from "express";

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
    async signUp(@Body() signUp: signUpUserPasswordDto, @Res() response: Response) {
        const jwtToken = await controller.signUp(signUp);
        response.cookie("JWT_TOKEN", jwtToken);
    }

    @Post("signin")
    @UsePipes(ValidationPipe(signInUserPasswordSchema))
    signIn(@Body() signIn: signInUserPasswordDto) {
        return controller.signIn(signIn);
    }

}