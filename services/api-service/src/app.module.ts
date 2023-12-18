import {Module} from '@nestjs/common';
import {AccountRouter} from './account/router';
import {AuthRouter} from './auth/router';
import {DashBoardRouter} from './dashboard/router';
import {HealthRouter} from './health/router';

@Module({
  imports: [],
  controllers: [AccountRouter, AuthRouter, DashBoardRouter, HealthRouter],
})
export class AppModule {}
