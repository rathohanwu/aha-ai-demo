import {Router} from "src/utils/http";
import {Body, Get, Post, UsePipes} from "@nestjs/common";
import {ValidationPipe} from "../utils/validation";
import {signInGoogleDto, signInGoogleSchema} from "./schema";


@Router("account")
export class AccountRouter {

    @Get()
    findAll(): string {
        return "This action returns all cats"
    }

    @Post("sign_in/google")
    @UsePipes(ValidationPipe(signInGoogleSchema))
    signIn(@Body() signIn: signInGoogleDto) {
        console.log("this is hte code ", signIn.code)
        return "thanks for sign in"
    }
}