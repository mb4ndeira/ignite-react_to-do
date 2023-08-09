import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UsePipes,
  Delete,
  Res,
} from '@nestjs/common';
import z from 'zod';

import { ValidateParamsPipe } from '../../common/middlewares/validate-params.pipe';
import { TasksService } from './providers/tasks.service';

import Task, { taskSchema } from '../../types/Task';

const postSchema = z.object({
  title: taskSchema.shape.title,
  parent: taskSchema.shape.parent,
});

export const errors = {
  noParent: { message: 'Invalid parent task', code: 404 },
  unexistentTask: { message: 'Resource not found', code: 404 },
};

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
      const task = await this.tasksService.add(data.title, data.parent);

      return task;
    } catch (err) {
      if (err.message === errors.noParent.message)
        throw new NotFoundException({ message: err.message });
    }
  }

  @Delete('/:id')
  @UsePipes(new ValidateParamsPipe(taskSchema.shape.id))
  async delete(@Param('id') id: Task['id'], @Res() res: Response) {
    try {
      await this.tasksService.delete(id);

      return res.status(204).send();
    } catch (err) {
      if (err.message === errors.unexistentTask.message)
        throw new NotFoundException({ message: err.message });
    }
  }
}
