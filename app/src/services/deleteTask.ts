import { toDo } from "@/library/HTTP/APIs";
import Task from "@/types/Task";

const deleteTask = async (id: Task["id"]) => {
  await toDo.delete(`/tasks/${id}`).catch((err) => console.error(err));
};

export default deleteTask;
