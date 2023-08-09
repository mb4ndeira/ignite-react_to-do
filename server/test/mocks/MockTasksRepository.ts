import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { ITasksRepository } from '../../src/modules/tasks/providers/repositories/ITasksRepository';

import { fakeTasks } from '../data';

@Injectable()
class MockTasksRepository implements ITasksRepository {
  private tasks = fakeTasks;

  async selectAll() {
    return this.tasks;
  }

  async create(title: string, parent: string | null) {
    return {
      id: v4(),
      title,
      completed: false,
      subtasks: !parent ? [] : null,
      parent,
    };
  }

  async findById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  async delete() {}
}

export { MockTasksRepository };
