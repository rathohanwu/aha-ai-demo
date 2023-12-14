import {Router} from "src/utils/http";
import {Body, Get, Post, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../utils/validation";
import {signInGoogleDto, signInGoogleSchema, signUpUserPasswordDto, signUpUserPasswordSchema} from "./schema";
import * as controller from "./controller";

@Router("account")
export class AccountRouter {

    @Get()
    findAll(): string {
        return "This action returns all cats"
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