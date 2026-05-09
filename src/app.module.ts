import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckHealthController } from './check-health.controller';

//module example
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/todo.entity';

//
import { ProjectModule } from './project/project.module';
import { ProjectEntity } from './project/project.entity';

import { CaseYearModule } from './case-year/case-year.module';
import { CaseYearEntity } from './case-year/case-year.entity';

import { CaseYearTargetsModule } from './case-year-target/case-year-targets.module';
import { CaseYearTargetsEntity } from './case-year-target/case-year-targets.entity';

import { CaseWeekModule } from './case-week/case-week.module';
import { CaseWeekEntity } from './case-week/case-week.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [
        TodoEntity,
        ProjectEntity,
        CaseYearEntity,
        CaseYearTargetsEntity,
        CaseWeekEntity,
      ],
      synchronize: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true, // автоматическое создание схемы (только для разработки!)
      // logging: true, // логирование SQL запросов
    }),

    TodoModule,
    ProjectModule,
    CaseYearModule,
    CaseYearTargetsModule,
    CaseWeekModule,
  ],
  controllers: [AppController, CheckHealthController],
  providers: [AppService],
})
export class AppModule {}
