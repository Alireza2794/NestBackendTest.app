import { Injectable } from '@nestjs/common';
import { CreateAllTaskDto } from './dto/create-all-task.dto';
import { GetTaskListDto } from './dto/get-all-task.dto';
import { UpdateAllTaskDto } from './dto/update-all-task.dto';
import { TaskListModel } from './models/all-task.model';
import { InjectRepository } from '@nestjs/typeorm';
import { AllTask } from './entities/all-task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AllTaskService {

  constructor(
    @InjectRepository(AllTask)
    private readonly allTask_repository: Repository<AllTask>
  ) { }

  async findAll(): Promise<TaskListModel[]> {
    return await this.allTask_repository.find();
  }

  async find(getTaskListDto: GetTaskListDto): Promise<TaskListModel[]> {
    let Tasks = await this.findAll();

    const { User_FirstName, User_LastName } = getTaskListDto;

    if (User_FirstName) {
      Tasks = Tasks.filter((task) => task.User_FirstName.toLowerCase().includes(User_FirstName));
    }

    if (User_LastName) {
      Tasks = Tasks.filter((task) => task.User_LastName.toLowerCase().includes(User_LastName));
    }

    return Tasks;
  }

  async create(createAllTaskDto: CreateAllTaskDto): Promise<TaskListModel> {

    const Task = await this.allTask_repository.create(createAllTaskDto);

    this.allTask_repository.save(Task);

    return Task;
  }

  findOne(Id: number): TaskListModel {
    // return this.AllTaskList.find((task) => task.User_ClientId === ClientId);

    return null
  }

  update(ClientId: string, updateAllTaskDto: UpdateAllTaskDto): TaskListModel {
    // const Task = this.findOne(ClientId);
    let Task: any;
    const { User_FirstName, User_LastName } = updateAllTaskDto;

    Task.User_FirstName = User_FirstName;
    Task.User_LastName = User_LastName;

    return Task;
  }

  remove(ClientId: string): boolean {
    // this.AllTaskList = this.AllTaskList.filter((task) => task.User_ClientId !== ClientId);

    return true;
  }
}
