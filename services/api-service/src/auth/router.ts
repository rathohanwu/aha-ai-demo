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

import {JWT_TOKEN_NAME} from "../utils/jwt";

@Router("auth")
export class AuthRouter {

    @Get("verify")
    @UsePipes(ValidationPipe(verifyEmailCodeSchema))
    verifyEmail(@Query() verifyEmail: verifyEmailCodeDto) {
        return controller.verifyEmail(verifyEmail.code);
    }

    @Post("google")
    @UsePipes(ValidationPipe(signInGoogleSchema))
    async signByGoogle(@Body() signIn: signInGoogleDto, @Res({passthrough: true}) response: Response) {
        const jwtToken = await controller.signGoogle(signIn.code);
        this.setJwtCookie(response, jwtToken);
    }

    @Post("signup")
    @UsePipes(ValidationPipe(signUpUserPasswordSchema))
    async signUp(@Body() signUp: signUpUserPasswordDto, @Res({passthrough: true}) response: Response) {
        const jwtToken = await controller.signUp(signUp);
        this.setJwtCookie(response, jwtToken);
    }

    @Post("signin")
    @UsePipes(ValidationPipe(signInUserPasswordSchema))
    async signIn(@Body() signIn: signInUserPasswordDto, @Res({passthrough: true}) response: Response) {
        const jwtToken = await controller.signIn(signIn);
        this.setJwtCookie(response, jwtToken);
    }

    private setJwtCookie(response: Response, jwtToken: string) {
        return response.cookie(JWT_TOKEN_NAME, jwtToken, {
            sameSite: 'lax',
        });
    }

}