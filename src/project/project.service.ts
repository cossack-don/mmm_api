import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>
  ) {}

  async findAll(
    limit: number,
    offset: number,
    search?: string,
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC'
  ): Promise<{
    data: ProjectEntity[];
    total: number;
    limit: number;
    offset: number;
  }> {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const allowedSortFields = ['id', 'name'];
    const sortField =
      sortBy && allowedSortFields.includes(sortBy) ? sortBy : 'id';
    const sortDirection = sortOrder === 'DESC' ? 'DESC' : 'ASC';

    const [data, total] = await this.projectRepository.findAndCount({
      where: search ? [{ name: Like(`%${search.toLowerCase()}%`) }] : undefined,
      take: limit,
      skip: offset,
      order: {
        [sortField]: sortDirection,
      },
    });

    return {
      data,
      total,
      limit,
      offset,
    };

    // return await this.projectRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const todo = await this.projectRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async create(createTodoDto: any): Promise<any> {
    const todo = this.projectRepository.create(createTodoDto);
    return await this.projectRepository.save(todo);
  }

  async update(id: number, updateTodoDto: any): Promise<any> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return await this.projectRepository.save(todo);
  }

  async remove(id: number): Promise<any> {
    const result = await this.projectRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return {
      message: `Todo with ID ${id} successfully deleted`,
      id: id,
    };
  }
}
