import {Router} from 'src/utils/http';
import {Get, UseInterceptors} from '@nestjs/common';
import * as controller from './controller';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {DashboardInterceptor} from './interceptor';

@ApiTags('Dashboard')
@UseInterceptors(new DashboardInterceptor())
@Router('dashboard')
export class DashBoardRouter {
  @Get('users')
  @ApiBearerAuth('access-token')
  async getUsers() {
    return controller.getUsers();
  }

  @Get('users/overview')
  @ApiBearerAuth('access-token')
  async getUserOverview() {
    return controller.getUserOverview();
  }
}
