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
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly todoService: ProjectService) {}

  @Get()
  async findAll(): Promise<ProjectEntity[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectEntity> {
    return this.todoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any): Promise<any> {
    if (!body.name) {
      throw new Error('Поле name обязательно');
    }

    return this.todoService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: any,
  ): Promise<ProjectEntity> {
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
