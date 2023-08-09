import { Injectable } from '@nestjs/common';

import Task from '../../../types/Task';
import { ITasksRepository } from './repositories/ITasksRepository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: ITasksRepository) {}

  // async list() {
  //   const tasks = await this.tasksRepository.getAll();
  //   return tasks;
  // }

  async create(title: Task['title'], parent: Task['parent']) {
    if (parent) {
      const parentTask = await this.tasksRepository.findById(parent);

      if (!parentTask) throw new Error('Invalid parent task');
    }

    const task = await this.tasksRepository.create(title, parent);

    return task;
  }
}
