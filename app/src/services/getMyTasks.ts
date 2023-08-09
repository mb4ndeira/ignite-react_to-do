import { toDo } from "@/library/HTTP/APIs";
import Task from "@/types/Task";

const getMyTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await toDo.get<Task[]>("/tasks/my").then((res) => res.data);

    return tasks;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getMyTasks;
