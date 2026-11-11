import { Priority } from '@shared/models/priority.model';

export const PROJECT_TASK_STATUSES = ['todo', 'in-progress', 'done'] as const;

export type ProjectTaskStatus = (typeof PROJECT_TASK_STATUSES)[number];

export interface ProjectTask {
  id: string;

  projectId: string;

  /** Number in the task code (US-n), unique within the project. */
  number: number;

  status: ProjectTaskStatus;

  priority: Priority;

  title: string;

  description: string;

  /** ISO 8601 */
  createdAt: string;
}

export type ProjectTaskInput = Pick<ProjectTask, 'title' | 'description' | 'priority'>;

/** Data needed to create a task; the rest is assigned by the repository. */
export type NewProjectTask = ProjectTaskInput & Pick<ProjectTask, 'projectId' | 'number'>;
