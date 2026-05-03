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
import { CaseYearService } from './case-year.service';
import { CaseYearEntity } from './case-year.entity';

@Controller('project/:projectId/case-year')
export class CaseYearController {
  constructor(private readonly caseYearService: CaseYearService) {}

  // Получить все case-years для конкретного проекта
  @Get()
  async findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<CaseYearEntity[]> {
    return this.caseYearService.findAllByProject(projectId);
  }

  // Получить один case-year по id (проверяя принадлежность проекту)
  @Get(':id')
  async findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CaseYearEntity> {
    return this.caseYearService.findOneByProject(projectId, id);
  }

  // Создать новый case-year для проекта
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: { name: string; keyQ: string; month: number },
  ): Promise<CaseYearEntity> {
    if (!body.name || !body.keyQ) {
      throw new Error('Поле name обязательно');
    }

    return this.caseYearService.create(projectId, body);
  }

  // Обновить case-year
  @Put(':id')
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: { name?: string },
  ): Promise<CaseYearEntity> {
    return this.caseYearService.update(projectId, id, updateDto);
  }

  // Удалить case-year
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Res() response: any,
  ): Promise<any> {
    await this.caseYearService.remove(projectId, id);

    return response.status(HttpStatus.OK).json({
      message: `CaseYear with ID ${id} successfully deleted from project ${projectId}`,
      id: id,
      projectId: projectId,
    });
  }
}
