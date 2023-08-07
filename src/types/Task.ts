type Task = {
  id: string;
  title: string;
  completed: boolean;
  subtasks: Task[] | null;
  parent: string | null;
};

export default Task;
