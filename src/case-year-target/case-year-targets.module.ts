import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseYearTargetsController } from './case-year-targets.controller';
import { CaseYearTargetsService } from './case-year-targets.service';
import { CaseYearTargetsEntity } from './case-year-targets.entity';

import { ProjectEntity } from '../project/project.entity'; // импортируем Project

@Module({
  imports: [TypeOrmModule.forFeature([CaseYearTargetsEntity, ProjectEntity])],
  controllers: [CaseYearTargetsController],
  providers: [CaseYearTargetsService],
  exports: [CaseYearTargetsService],
})
export class CaseYearTargetsModule {}
