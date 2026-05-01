import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckHealthController } from './check-health.controller';

@Module({
  imports: [],
  controllers: [AppController, CheckHealthController],
  providers: [AppService],
})
export class AppModule {}
