import Task from '../../../../types/Task';

interface ITasksRepository {
  create(title: Task['title'], parent: Task['parent']): Promise<Task>;
  findById(id: Task['id']): Promise<Task | null>;
}

export { ITasksRepository };
