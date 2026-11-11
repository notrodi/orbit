import { NewProjectTask, ProjectTask } from '@features/projects/project-tasks/project-task.model';

/**
 * Storage contract for project tasks. Implemented with localStorage for now;
 * an HTTP implementation will replace it once the backend exists.
 */
export abstract class ProjectTasksRepository {
  abstract getByProjectId(projectId: string): Promise<ProjectTask[]>;

  abstract create(task: NewProjectTask): Promise<ProjectTask>;
}
