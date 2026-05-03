import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckHealthController } from './check-health.controller';

//module example
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

//
import { ProjectModule } from './project/project.module';
import { ProjectEntity } from './project/project.entity';

import { CaseYearModule } from './case-year/case-year.module';
import { CaseYearEntity } from './case-year/case-year.entity';

import { CaseYearTargetsModule } from './case-year-target/case-year-targets.module';
import { CaseYearTargetsEntity } from './case-year-target/case-year-targets.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Todo, ProjectEntity, CaseYearEntity, CaseYearTargetsEntity],
      synchronize: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true, // автоматическое создание схемы (только для разработки!)
      // logging: true, // логирование SQL запросов
    }),

    TodoModule,
    ProjectModule,
    CaseYearModule,
    CaseYearTargetsModule,
  ],
  controllers: [AppController, CheckHealthController],
  providers: [AppService],
})
export class AppModule {}
