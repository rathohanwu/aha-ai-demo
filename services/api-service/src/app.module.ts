import { Module } from '@nestjs/common';
import {AccountRouter} from "./account/router";

@Module({
  imports: [],
  controllers: [AccountRouter],
})
export class AppModule {}
