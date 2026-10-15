import { Project, ProjectInput } from '@features/projects/project.model';

/**
 * Storage contract for projects. Implemented with localStorage for now;
 * an HTTP implementation will replace it once the backend exists.
 */
export abstract class ProjectsRepository {
  abstract getAll(): Promise<Project[]>;

  abstract create(input: ProjectInput): Promise<Project>;
}
