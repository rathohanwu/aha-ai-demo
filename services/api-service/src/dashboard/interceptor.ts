import {CallHandler, ExecutionContext, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {verifyJwt} from '../utils/jwt';
import * as accountController from 'src/account/controller';
import {throwHttpException} from '../utils/errors';

export class DashboardInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const jwtTokenText = context.switchToHttp().getRequest().headers[
      'authorization'
    ];
    const jwtToken = verifyJwt(jwtTokenText);
    const account = await accountController.findAccountAndVerifiedStatus(
      jwtToken.email,
      jwtToken.signMethod
    );
    if (!account.verified) {
      throwHttpException('the account is wrong or not verified');
    }

    return next.handle();
  }
}
