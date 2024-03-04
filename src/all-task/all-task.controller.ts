import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllTaskService } from './all-task.service';
import { CreateAllTaskDto } from './dto/create-all-task.dto';
import { UpdateAllTaskDto } from './dto/update-all-task.dto';
import { TaskListModel } from './models/all-task.model';
import { GetTaskListDto } from './dto/get-all-task.dto';

@ApiTags('AllTask')
@Controller('AllTask')
export class AllTaskController {
  constructor(private allTaskService: AllTaskService) { }

  @Get()
  find(@Query() getTaskListDto: GetTaskListDto): TaskListModel[] {
    if (Object.keys(getTaskListDto) && Object.keys(getTaskListDto).length) {
      return this, this.allTaskService.find(getTaskListDto);
    }

    else { return this.allTaskService.findAll(); }
  }

  @Post()
  create(@Body() createAllTaskDto: CreateAllTaskDto): TaskListModel {
    return this.allTaskService.create(createAllTaskDto);
  }

  @Get(':ClientId')
  findOne(@Param('ClientId') ClientId: string): TaskListModel {
    return this.allTaskService.findOne(ClientId);
  }

  @Put(':ClientId')
  update(@Param('ClientId') ClientId: string, @Body() updateAllTaskDto: UpdateAllTaskDto) {
    return this.allTaskService.update(ClientId, updateAllTaskDto);
  }

  @Delete(':ClientId')
  remove(@Param('ClientId') ClientId: string) {
    return this.allTaskService.remove(ClientId);
  }
}
