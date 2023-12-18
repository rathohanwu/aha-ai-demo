import {Router} from 'src/utils/http';
import {Body, Get, Patch, UsePipes} from '@nestjs/common';
import * as controller from './controller';
import {JwtToken, UseJwtToken} from '../utils/jwt';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {ValidationPipe} from '../utils/validation';
import {
  AccountNameUpdateDTO,
  AccountNameUpdateSchema,
  AccountPasswordUpdateDTO,
  AccountPasswordUpdateSchema,
} from './schema';

@ApiTags('Account')
@Router('account')
export class AccountRouter {
  @Get()
  @ApiBearerAuth('access-token')
  me(@UseJwtToken() jwtToken: JwtToken) {
    return controller.findAccountAndVerifiedStatus(
      jwtToken.email,
      jwtToken.signMethod
    );
  }

  @Patch('name')
  @ApiBearerAuth('access-token')
  @UsePipes(ValidationPipe(AccountNameUpdateSchema))
  updateAccountName(
    @UseJwtToken() jwtToken: JwtToken,
    @Body() account: AccountNameUpdateDTO
  ) {
    return controller.updateAccountNameByEmail(jwtToken.email, account.name);
  }

  @Patch('password')
  @ApiBearerAuth('access-token')
  @UsePipes(ValidationPipe(AccountPasswordUpdateSchema))
  updateAccountPassword(
    @UseJwtToken() jwtToken: JwtToken,
    @Body() account: AccountPasswordUpdateDTO
  ) {
    return controller.updateAccountPasswordByEmail(
      jwtToken.email,
      account.oldPassword,
      account.newPassword
    );
  }
}
