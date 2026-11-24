import { Priority } from '@shared/models/priority.model';

export const TASK_STATUSES = ['todo', 'in-progress', 'done'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
};

export interface Task {
  id: string;

  projectId: string;

  /** Number in the task code (US-n), unique within the project. */
  number: number;

  status: TaskStatus;

  /** Order within the status column, starting with 0. */
  position: number;

  priority: Priority;

  title: string;

  description: string;

  /** ISO 8601 */
  createdAt: string;
}

export type TaskInput = Pick<Task, 'title' | 'description' | 'priority'>;

/** Data needed to create a task; the rest is assigned by the repository. */
export type NewTask = TaskInput & Pick<Task, 'projectId' | 'number'>;

/** Where a task was dropped on the board. */
export interface TaskMove {
  taskId: string;

  status: TaskStatus;

  index: number;
}
