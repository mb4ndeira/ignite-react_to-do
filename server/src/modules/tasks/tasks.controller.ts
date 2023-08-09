import { Body, Controller, NotFoundException, Post } from '@nestjs/common';

import { TasksService } from './providers/tasks.service';

import Task from '../../types/Task';

const errors = { noParent: { message: 'Invalid parent task', code: 404 } };

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Get()
  // async list() {
  //   return this.tasksService.list();
  // }

  @Post()
  async create(@Body() data: { title: Task['title']; parent: Task['parent'] }) {
    try {
      const task = await this.tasksService.create(data.title, data.parent);

      return task;
    } catch (err) {
      if (err.message === errors.noParent.message)
        throw new NotFoundException({ message: err.message });
    }
  }
}
