import { Injectable } from '@nestjs/common';

import Task from '../../../types/Task';
import { ITasksRepository } from './repositories/ITasksRepository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: ITasksRepository) {}

  async getAll() {
    return await this.tasksRepository.selectAll();
  }

  async create(title: Task['title'], parent: Task['parent']) {
    if (parent) {
      const parentTask = await this.tasksRepository.findById(parent);

      if (!parentTask) throw new Error('Invalid parent task');
    }

    const task = await this.tasksRepository.create(title, parent);

    return task;
  }
}
