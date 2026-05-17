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
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<{
    data: ProjectEntity[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const offsetNum = offset ? parseInt(offset, 10) : 0;

    return this.projectService.findAll(limitNum, offsetNum);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectEntity> {
    return this.projectService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any): Promise<any> {
    if (!body.name) {
      throw new Error('Поле name обязательно');
    }

    return this.projectService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: any,
  ): Promise<ProjectEntity> {
    return this.projectService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<any> {
    await this.projectService.remove(id);

    // @ts-ignore
    return response.status(HttpStatus.OK).json({
      message: `Todo with ID ${id} successfully deleted`,
      id: id,
    });
  }
}
