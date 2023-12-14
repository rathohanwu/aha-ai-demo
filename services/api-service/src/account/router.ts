import {Router} from "src/utils/http";
import {Get} from "@nestjs/common";


@Router("account")
export class AccountRouter {

    @Get()
    findAll(): string {
        return "This  action returns all cats"
    }
}