import {Module} from '@nestjs/common';
import {AccountRouter} from './account/router';
import {AuthRouter} from './auth/router';
import {DashBoardRouter} from './dashboard/router';

@Module({
  imports: [],
  controllers: [AccountRouter, AuthRouter, DashBoardRouter],
})
export class AppModule {}
