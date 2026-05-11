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
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CaseYearEntity } from '../case-year/case-year.entity';

@Controller('project/:projectId/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<{
    data: TodoEntity[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const offsetNum = offset ? parseInt(offset, 10) : 0;

    return this.todoService.findAll(projectId, limitNum, offsetNum);
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() body: { name: string },
  ): Promise<CaseYearEntity> {
    if (!body.name) {
      throw new Error('Поле name обязательно');
    }

    return this.todoService.create(projectId, body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: any,
  ): Promise<TodoEntity> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<any> {
    await this.todoService.remove(id);

    // @ts-ignore
    return response.status(HttpStatus.OK).json({
      message: `Todo with ID ${id} successfully deleted`,
      id: id,
    });
  }
}
