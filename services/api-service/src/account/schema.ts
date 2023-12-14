import {z} from "zod";

export const signInGoogleSchema = z.object({
    code: z.string()
}).required();


export type signInGoogleDto = z.infer<typeof signInGoogleSchema>;

export const signUpUserPasswordSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
}).required()

export type signUpUserPasswordDto = z.infer<typeof signUpUserPasswordSchema>;

export const signInUserPasswordSchema = z.object({
    email: z.string(),
    password: z.string()
}).required()

export type signInUserPasswordDto = z.infer<typeof signInUserPasswordSchema>;

export const verifyEmailCodeSchema = z.object({
    code: z.string()
}).required();

export type verifyEmailCodeDto = z.infer<typeof verifyEmailCodeSchema>;
