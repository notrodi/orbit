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

  private readProjects(): Project[] {
    const data = this.storage.read(STORAGE_KEY);

    return Array.isArray(data) ? (data as Project[]) : [];
  }
}
