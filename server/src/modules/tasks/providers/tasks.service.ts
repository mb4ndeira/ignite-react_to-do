import { Injectable } from '@nestjs/common';

import { errors } from '../tasks.controller';

import Task from '../../../common/types/Task';
import { ITasksRepository } from './repositories/ITasksRepository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: ITasksRepository) {}

  async getAll() {
    return await this.tasksRepository.selectAll();
  }

  async add(title: Task['title'], parent: Task['parent']) {
    if (parent) {
      const parentTask = await this.tasksRepository.findById(parent);

      if (!parentTask) throw new Error(errors.noParent.message);
    }

    const task = await this.tasksRepository.create(title, parent);

    return task;
  }

  async delete(id: Task['id']) {
    const task = await this.tasksRepository.findById(id);

    if (!task) throw new Error(errors.unexistentTask.message);

    const subtasksPromises = task.subtasks
      ? task.subtasks.map(({ id }) => this.tasksRepository.delete(id))
      : [];

    await Promise.all(subtasksPromises);
    await this.tasksRepository.delete(id);
  }
}
