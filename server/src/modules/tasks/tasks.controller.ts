import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  UsePipes,
} from '@nestjs/common';
import z from 'zod';

import { ValidateParamsPipe } from '../../common/middlewares/validate-params.pipe';
import { TasksService } from './providers/tasks.service';

import Task, { taskSchema } from '../../types/Task';

const postSchema = z.object({
  title: taskSchema.shape.title,
  parent: taskSchema.shape.parent,
});

const errors = { noParent: { message: 'Invalid parent task', code: 404 } };

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/my')
  async list() {
    return this.tasksService.getAll();
  }

  @Post()
  @UsePipes(new ValidateParamsPipe(postSchema))
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
