import { inject, Service, signal } from '@angular/core';
import { ProjectsRepository } from '@features/projects/data/projects-repository';
import { Project, ProjectInput } from '@features/projects/project.model';

@Service()
export class ProjectsStore {
  private readonly repository = inject(ProjectsRepository);
  private readonly state = signal<readonly Project[]>([]);

  readonly projects = this.state.asReadonly();

  async load(): Promise<void> {
    this.state.set(await this.repository.getAll());
  }

  async create(input: ProjectInput): Promise<Project> {
    const project = await this.repository.create(input);

    this.state.update((projects) => [...projects, project]);

    return project;
  }

  getById(id: string): Project | undefined {
    return this.state().find((project) => project.id === id);
  }
}
