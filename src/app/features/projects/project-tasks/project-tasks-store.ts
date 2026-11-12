import { inject, Service, signal } from '@angular/core';
import { ProjectTasksRepository } from '@features/projects/project-tasks/data/project-tasks-repository';
import { ProjectTask, ProjectTaskInput } from '@features/projects/project-tasks/project-task.model';
import { ProjectsStore } from '@features/projects/projects-store';

@Service()
export class ProjectTasksStore {
  private readonly repository = inject(ProjectTasksRepository);
  private readonly projectsStore = inject(ProjectsStore);
  private readonly state = signal<readonly ProjectTask[]>([]);

  private projectId: string | null = null;

  readonly tasks = this.state.asReadonly();

  async load(projectId: string): Promise<void> {
    this.projectId = projectId;
    this.state.set([]);

    const tasks = await this.repository.getByProjectId(projectId);

    if (this.projectId === projectId) {
      this.state.set(tasks);
    }
  }

  async create(input: ProjectTaskInput): Promise<ProjectTask> {
    const projectId = this.projectId;

    if (!projectId) {
      throw new Error('No project is loaded');
    }

    const number = await this.projectsStore.issueTaskNumber(projectId);
    const createdTask = await this.repository.create({ ...input, projectId, number });

    if (this.projectId === projectId) {
      this.state.update((tasks) => [...tasks, createdTask]);
    }

    return createdTask;
  }
}
