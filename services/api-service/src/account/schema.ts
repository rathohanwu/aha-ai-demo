import {z} from "zod";

export const signInGoogleSchema = z.object({
    code: z.string()
}).required();


export type signInGoogleDto = z.infer<typeof signInGoogleSchema>;

export const signUpUserPasswordSchema = z.object({
    name: z.string(),
    mail: z.string(),
    password: z.string()
}).required()

export type signUpUserPasswordDto = z.infer<typeof signUpUserPasswordSchema>;