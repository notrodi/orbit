import { Project, ProjectInput } from '@features/projects/project.model';

/**
 * Storage contract for projects. Implemented with localStorage for now;
 * an HTTP implementation will replace it once the backend exists.
 */
export abstract class ProjectsRepository {
  abstract getAll(): Promise<Project[]>;

  abstract create(input: ProjectInput): Promise<Project>;

  /** Increments the project's task counter and returns the new number. */
  abstract issueTaskNumber(projectId: string): Promise<number>;

  /**
   * Saves ready-made projects as they are; unlike `create`, assigns nothing.
   * The caller keeps `lastTaskNumber` consistent with the tasks.
   */
  abstract addMany(projects: readonly Project[]): Promise<void>;

  abstract deleteAll(): Promise<void>;
}
