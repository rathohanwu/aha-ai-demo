import {z} from "zod";
import {ApiProperty} from "@nestjs/swagger";

export const AccountNameUpdateSchema = z.object({
    name: z.string(),
}).required()

export class AccountNameUpdateDTO {
    @ApiProperty()
    name: string
}

export const AccountPasswordUpdateSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string()
}).required();

export class AccountPasswordUpdateDTO {

    @ApiProperty()
    oldPassword: string
    @ApiProperty()
    newPassword: string

}
