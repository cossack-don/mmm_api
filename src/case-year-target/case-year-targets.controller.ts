import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CaseYearTargetsService } from './case-year-targets.service';
import { CaseYearTargetsEntity } from './case-year-targets.entity';

@Controller('project/:projectId/case-year-targets')
export class CaseYearTargetsController {
  constructor(private readonly caseYearTargetService: CaseYearTargetsService) {}

  // Получить все case-years для конкретного проекта
  @Get()
  async findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<CaseYearTargetsEntity[]> {
    return this.caseYearTargetService.findAllByProject(projectId);
  }

  // Получить один case-year по id (проверяя принадлежность проекту)
  @Get(':id')
  async findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CaseYearTargetsEntity> {
    return this.caseYearTargetService.findOneByProject(projectId, id);
  }

  // Создать новый case-year для проекта
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: { name: string },
  ): Promise<CaseYearTargetsEntity> {
    if (!body.name) {
      throw new Error('Поле name обязательно');
    }

    return this.caseYearTargetService.create(projectId, body);
  }

  // Обновить case-year
  @Put(':id')
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: { name?: string },
  ): Promise<CaseYearTargetsEntity> {
    return this.caseYearTargetService.update(projectId, id, updateDto);
  }

  // Удалить case-year
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Res() response: any,
  ): Promise<any> {
    await this.caseYearTargetService.remove(projectId, id);

    return response.status(HttpStatus.OK).json({
      message: `CaseYear with ID ${id} successfully deleted from project ${projectId}`,
      id: id,
      projectId: projectId,
    });
  }
}
