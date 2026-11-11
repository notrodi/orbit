import { inject, Injectable } from '@angular/core';
import { BrowserStorage } from '@core/storage/browser-storage';
import { ProjectsRepository } from '@features/projects/data/projects-repository';
import { Project, ProjectInput } from '@features/projects/project.model';

const STORAGE_KEY = 'orbit:projects:v1';

@Injectable()
export class LocalStorageProjectsRepository extends ProjectsRepository {
  private readonly storage = inject(BrowserStorage);

  override async getAll(): Promise<Project[]> {
    return this.readProjects();
  }

  override async create(input: ProjectInput): Promise<Project> {
    const project: Project = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastTaskNumber: 0,
    };

    this.storage.write(STORAGE_KEY, [...this.readProjects(), project]);

    return project;
  }

  override async issueTaskNumber(projectId: string): Promise<number> {
    const projects = this.readProjects();
    const targetProject = projects.find((project) => project.id === projectId);

    if (!targetProject) {
      throw new Error(`Project ${projectId} not found`);
    }

    const number = targetProject.lastTaskNumber + 1;

    this.storage.write(
      STORAGE_KEY,
      projects.map((project) =>
        project.id === projectId ? { ...project, lastTaskNumber: number } : project,
      ),
    );

    return number;
  }

  private readProjects(): Project[] {
    const data = this.storage.read(STORAGE_KEY);

    return Array.isArray(data) ? (data as Project[]) : [];
  }
}
