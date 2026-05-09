import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseWeekController } from './case-week.controller';
import { CaseWeekService } from './case-week.service';
import { CaseWeekEntity } from './case-week.entity';

import { ProjectEntity } from '../project/project.entity'; // импортируем Project

@Module({
  imports: [TypeOrmModule.forFeature([CaseWeekEntity, ProjectEntity])],
  controllers: [CaseWeekController],
  providers: [CaseWeekService],
  exports: [CaseWeekService],
})
export class CaseWeekModule {}
