import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { ProjectEntity } from '../project/project.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAll(): Promise<any[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  // async create(createTodoDto: any): Promise<any> {
  //   const todo = this.todoRepository.create(createTodoDto);
  //   return await this.todoRepository.save(todo);
  // }

  async create(projectId: number, data: { name: string }): Promise<any> {
    // Проверяем существует ли проект

    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    console.log(project, data, 3333);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Создаем новый case-year и связываем с проектом
    const todo = this.todoRepository.create({
      name: data.name,
      project: project, // связываем с проектом
      isDeleted: false,
    });

    return this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: any): Promise<any> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<any> {
    const result = await this.todoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return {
      message: `Todo with ID ${id} successfully deleted`,
      id: id,
    };
  }
}
