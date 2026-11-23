import { NewTask, Task, TaskStatus } from '@features/projects/tasks/task.model';

/**
 * Storage contract for tasks. Implemented with localStorage for now;
 * an HTTP implementation will replace it once the backend exists.
 */
export abstract class TasksRepository {
  abstract getByProjectId(projectId: string): Promise<Task[]>;

  abstract create(task: NewTask): Promise<Task>;

  abstract move(taskId: string, status: TaskStatus, index: number): Promise<void>;

  /**
   * Saves ready-made tasks as they are; unlike `create`, assigns nothing.
   * The caller keeps `position` and `number` consistent.
   */
  abstract addMany(tasks: readonly Task[]): Promise<void>;

  abstract deleteAll(): Promise<void>;
}
