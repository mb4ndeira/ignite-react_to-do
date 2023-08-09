import Task from '../../../../types/Task';

interface ITasksRepository {
  selectAll(): Promise<Task[]>;
  create(title: Task['title'], parent: Task['parent']): Promise<Task>;
  findById(id: Task['id']): Promise<Task | null>;
}

export { ITasksRepository };
