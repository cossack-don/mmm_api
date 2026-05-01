import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckHealthController } from './check-health.controller';

//module example
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Todo],
      synchronize: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true, // автоматическое создание схемы (только для разработки!)
      // logging: true, // логирование SQL запросов
    }),

    TodoModule,
  ],
  controllers: [AppController, CheckHealthController],
  providers: [AppService],
})
export class AppModule {}
