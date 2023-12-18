import {Router} from 'src/utils/http';
import {Get} from '@nestjs/common';

@Router('health')
export class HealthRouter {
  @Get()
  async healthCheck() {
    return 'Health Check is Good';
  }
}
