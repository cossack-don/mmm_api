import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseYearController } from './case-year.controller';
import { CaseYearService } from './case-year.service';
import { CaseYearEntity } from './case-year.entity';

import { ProjectEntity } from '../project/project.entity'; // импортируем Project

@Module({
  imports: [TypeOrmModule.forFeature([CaseYearEntity, ProjectEntity])],
  controllers: [CaseYearController],
  providers: [CaseYearService],
  exports: [CaseYearService],
})
export class CaseYearModule {}
