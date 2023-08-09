import { z } from 'zod';

export const subtaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  completed: z.boolean(),
  parent: z.string().uuid(),
  subtasks: z.null(),
});

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  completed: z.boolean(),
  parent: z.string().nullable(),
  subtasks: z.array(subtaskSchema),
});

type Task = z.infer<typeof taskSchema>;
// & z.infer<typeof subtaskSchema>;

export default Task;
