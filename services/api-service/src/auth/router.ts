import {Router} from 'src/utils/http';
import {Body, Get, Post, Query, Res, UsePipes} from '@nestjs/common';
import {ValidationPipe} from '../utils/validation';
import {
  SignInGoogleDTO,
  SignInGoogleSchema,
  SignInUserPasswordDTO,
  SignInUserPasswordSchema,
  SignUpUserPasswordDTO,
  SignUpUserPasswordSchema,
  VerifyEmailCodeDTO,
  VerifyEmailCodeSchema,
} from './schema';
import * as controller from './controller';
import {Response} from 'express';

import {JWT_TOKEN_NAME, JwtToken, UseJwtToken} from '../utils/jwt';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@ApiTags('Auth')
@Router('auth')
export class AuthRouter {
  @Get('verify')
  @UsePipes(ValidationPipe(VerifyEmailCodeSchema))
  async verifyEmail(
    @Query() verifyEmail: VerifyEmailCodeDTO,
    @Res() res: Response
  ) {
    const isVerified = await controller.verifyEmail(verifyEmail.code);
    isVerified
      ? res.redirect(`${process.env.CLIENT_URL}/dashboard`)
      : res.send('email verification is wrong');
  }

  @Post('google')
  @UsePipes(ValidationPipe(SignInGoogleSchema))
  async signByGoogle(
    @Body() signIn: SignInGoogleDTO,
    @Res({passthrough: true}) response: Response
  ) {
    const jwtToken = await controller.signGoogle(signIn.code);
    this.setJwtCookie(response, jwtToken);
  }

  @Post('signup')
  @UsePipes(ValidationPipe(SignUpUserPasswordSchema))
  async signUp(
    @Body() signUp: SignUpUserPasswordDTO,
    @Res({passthrough: true}) response: Response
  ) {
    const jwtToken = await controller.signUp(signUp);
    this.setJwtCookie(response, jwtToken);
  }

  @Post('signin')
  @UsePipes(ValidationPipe(SignInUserPasswordSchema))
  async signIn(
    @Body() signIn: SignInUserPasswordDTO,
    @Res({passthrough: true}) response: Response
  ) {
    const jwtToken = await controller.signIn(signIn);
    this.setJwtCookie(response, jwtToken);
  }

  @Post('mail/resend')
  @ApiBearerAuth('access-token')
  resendVerifyEmail(@UseJwtToken() jwtToken: JwtToken) {
    return controller.resendVerifyEmail(jwtToken.email, jwtToken.signMethod);
  }

  private setJwtCookie(response: Response, jwtToken: string) {
    return response.cookie(JWT_TOKEN_NAME, jwtToken, {
      sameSite: 'lax',
      // httpOnly: true
    });
  }
}
