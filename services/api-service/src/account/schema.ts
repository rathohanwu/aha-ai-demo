import {z} from "zod";
import {ApiProperty} from "@nestjs/swagger";

export const AccountNameUpdateSchema = z.object({
    name: z.string()
}).required();

export class AccountNameUpdateDTO {
    @ApiProperty()
    name: string
}
