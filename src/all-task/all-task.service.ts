import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateAllTaskDto } from './dto/create-all-task.dto';
import { GetTaskListDto } from './dto/get-all-task.dto';
import { UpdateAllTaskDto } from './dto/update-all-task.dto';
import { TaskListModel } from './models/all-task.model';

@Injectable()
export class AllTaskService {
  private AllTaskList: TaskListModel[] = [
    {
      User_ClientId: uuid(),
      User_FirstName: 'علیرضا',
      User_LastName: 'حق شناس'
    }
  ];

  findAll(): TaskListModel[] {
    return this.AllTaskList;
  }

  find(getTaskListDto: GetTaskListDto): TaskListModel[] {
    let Tasks = this.findAll();

    const { User_FirstName, User_LastName } = getTaskListDto;

    if (User_FirstName) {
      Tasks = Tasks.filter((task) => task.User_FirstName.toLowerCase().includes(User_FirstName));
    }

    if (User_LastName) {
      Tasks = Tasks.filter((task) => task.User_LastName.toLowerCase().includes(User_LastName));
    }

    return Tasks;
  }

  create(createAllTaskDto: CreateAllTaskDto): TaskListModel {
    const { User_FirstName, User_LastName } = createAllTaskDto;
    const Task: TaskListModel = {
      User_ClientId: uuid(),
      User_FirstName,
      User_LastName
    }

    this.AllTaskList.push(Task);

    return Task;
  }

  findOne(ClientId: string): TaskListModel {
    return this.AllTaskList.find((task) => task.User_ClientId === ClientId);
  }

  update(id: number, updateAllTaskDto: UpdateAllTaskDto) {
    return `This action updates a #${id} allTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} allTask`;
  }
}
