import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseWeekEntity } from './case-week.entity';
import { ProjectEntity } from '../project/project.entity';

@Injectable()
export class CaseWeekService {
  constructor(
    @InjectRepository(CaseWeekEntity)
    private caseWeekRepository: Repository<CaseWeekEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAllByProject(projectId: number): Promise<CaseWeekEntity[]> {
    // Проверяем существует ли проект
    const project = await this.projectRepository.findOne({
      where: { id: projectId, isDeleted: false },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Возвращаем все case-years для проекта
    return this.caseWeekRepository.find({
      where: { project: { id: projectId }, isDeleted: false },
      // relations: ['project'],
    });
  }

  async findOneByProject(
    projectId: number,
    id: number,
  ): Promise<CaseWeekEntity> {
    const caseYear = await this.caseWeekRepository.findOne({
      where: {
        id: id,
        project: { id: projectId },
        isDeleted: false,
      },
      relations: ['project'],
    });

    if (!caseYear) {
      throw new NotFoundException(
        `CaseYear with ID ${id} not found for project ${projectId}`,
      );
    }

    return caseYear;
  }

  async create(
    projectId: number,
    data: { name: string; day: number },
  ): Promise<CaseWeekEntity> {
    // Проверяем существует ли проект
    const project = await this.projectRepository.findOne({
      where: { id: projectId, isDeleted: false },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Создаем новый case-year и связываем с проектом
    const caseYear = this.caseWeekRepository.create({
      name: data.name,
      day: data.day,
      project: project, // связываем с проектом
      isDeleted: false,
    });

    return this.caseWeekRepository.save(caseYear);
  }

  async update(
    projectId: number,
    id: number,
    updateDto: { name?: string },
  ): Promise<CaseWeekEntity> {
    // Находим case-year
    const caseYear = await this.findOneByProject(projectId, id);

    // Обновляем поля
    if (updateDto.name) {
      caseYear.name = updateDto.name;
    }

    return this.caseWeekRepository.save(caseYear);
  }

  async remove(projectId: number, id: number): Promise<void> {
    const caseYear = await this.findOneByProject(projectId, id);

    // Soft delete (рекомендуется)
    caseYear.isDeleted = true;
    await this.caseWeekRepository.save(caseYear);

    // Или жесткое удаление:
    // await this.caseYearRepository.remove(caseYear);
  }
}
