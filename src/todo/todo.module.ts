import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';

import { ProjectEntity } from '../project/project.entity'; // импортируем Project

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, ProjectEntity])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
