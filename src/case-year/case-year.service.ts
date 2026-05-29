import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseYearEntity } from './case-year.entity';
import { ProjectEntity } from '../project/project.entity';

@Injectable()
export class CaseYearService {
  constructor(
    @InjectRepository(CaseYearEntity)
    private caseYearRepository: Repository<CaseYearEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAllByProject(projectId: number): Promise<CaseYearEntity[]> {
    // Проверяем существует ли проект
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    const project = await this.projectRepository.findOne({
      where: { id: projectId, isDeleted: false },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Возвращаем все case-years для проекта
    return this.caseYearRepository.find({
      where: { project: { id: projectId }, isDeleted: false },
      // relations: ['project'],
    });
  }

  async findOneByProject(
    projectId: number,
    id: number,
  ): Promise<CaseYearEntity> {
    const caseYear = await this.caseYearRepository.findOne({
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
    data: { name: string; keyQ: string; month: number },
  ): Promise<CaseYearEntity> {
    // Проверяем существует ли проект
    const project = await this.projectRepository.findOne({
      where: { id: projectId, isDeleted: false },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Создаем новый case-year и связываем с проектом
    const caseYear = this.caseYearRepository.create({
      name: data.name,
      project: project, // связываем с проектом
      keyQ: data.keyQ,
      month: data.month,
      isDeleted: false,
    });

    return this.caseYearRepository.save(caseYear);
  }

  async update(
    projectId: number,
    id: number,
    updateDto: { name?: string; keyQ: string; month: number },
  ): Promise<CaseYearEntity> {
    // Находим case-year
    const caseYear = await this.findOneByProject(projectId, id);

    // Обновляем поля
    if (updateDto.name && updateDto.keyQ && updateDto.month) {
      caseYear.name = updateDto.name;
      caseYear.keyQ = updateDto.keyQ;
      caseYear.month = updateDto.month;
    }

    return this.caseYearRepository.save(caseYear);
  }

  async remove(projectId: number, id: number): Promise<void> {
    const caseYear = await this.findOneByProject(projectId, id);

    // Soft delete (рекомендуется)
    caseYear.isDeleted = true;
    await this.caseYearRepository.save(caseYear);

    // Или жесткое удаление:
    // await this.caseYearRepository.remove(caseYear);
  }
}
