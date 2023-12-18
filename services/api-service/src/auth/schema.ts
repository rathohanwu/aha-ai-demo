import {z} from 'zod';
import {ApiProperty} from '@nestjs/swagger';

export const SignInGoogleSchema = z
  .object({
    code: z.string(),
  })
  .required();

export class SignInGoogleDTO {
  @ApiProperty()
  code: string;
}

export const SignUpUserPasswordSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .required();

export class SignUpUserPasswordDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export const VerifyEmailCodeSchema = z
  .object({
    code: z.string(),
  })
  .required();

export class VerifyEmailCodeDTO {
  @ApiProperty()
  code: string;
}

export const SignInUserPasswordSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .required();

export class SignInUserPasswordDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
