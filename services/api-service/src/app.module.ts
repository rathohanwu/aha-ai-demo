import {Module} from '@nestjs/common';
import {AccountRouter} from "./account/router";
import {AuthRouter} from "./auth/router";

@Module({
    imports: [],
    controllers: [AccountRouter, AuthRouter],
})
export class AppModule {
}
