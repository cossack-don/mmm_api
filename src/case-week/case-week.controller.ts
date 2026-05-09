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
import { CaseWeekService } from './case-week.service';
import { CaseWeekEntity } from './case-week.entity';

@Controller('project/:projectId/case-week')
export class CaseWeekController {
  constructor(private readonly caseWeekService: CaseWeekService) {}

  // Получить все case-years для конкретного проекта
  @Get()
  async findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<CaseWeekEntity[]> {
    return this.caseWeekService.findAllByProject(projectId);
  }

  // Получить один case-year по id (проверяя принадлежность проекту)
  @Get(':id')
  async findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CaseWeekEntity> {
    return this.caseWeekService.findOneByProject(projectId, id);
  }

  // Создать новый case-year для проекта
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: { name: string; day: number },
  ): Promise<CaseWeekEntity> {
    if (!body.name || !body.day) {
      throw new Error('Поле name обязательно');
    }

    return this.caseWeekService.create(projectId, body);
  }

  // Обновить case-year
  @Put(':id')
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: { name?: string },
  ): Promise<CaseWeekEntity> {
    return this.caseWeekService.update(projectId, id, updateDto);
  }

  // Удалить case-year
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Res() response: any,
  ): Promise<any> {
    await this.caseWeekService.remove(projectId, id);

    return response.status(HttpStatus.OK).json({
      message: `CaseYear with ID ${id} successfully deleted from project ${projectId}`,
      id: id,
      projectId: projectId,
    });
  }
}
