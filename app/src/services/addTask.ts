import { toDo } from "@/library/HTTP/APIs";
import Task from "@/types/Task";

const addTask = async (
  title: Task["title"],
  parent: Task["parent"],
): Promise<Task | null> => {
  try {
    const task = await toDo
      .post<Task>("/tasks/", { title, parent })
      .then((res) => res.data);

    return task;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default addTask;
