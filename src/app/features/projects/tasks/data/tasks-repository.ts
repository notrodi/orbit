import { NewTask, Task, TaskStatus } from '@features/projects/tasks/task.model';

/**
 * Storage contract for tasks. Implemented with localStorage for now;
 * an HTTP implementation will replace it once the backend exists.
 */
export abstract class TasksRepository {
  abstract getByProjectId(projectId: string): Promise<Task[]>;

  abstract create(task: NewTask): Promise<Task>;

  abstract move(taskId: string, status: TaskStatus, index: number): Promise<void>;
}
