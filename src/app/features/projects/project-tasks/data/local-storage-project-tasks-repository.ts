import { inject, Injectable } from '@angular/core';
import { BrowserStorage } from '@core/storage/browser-storage';
import { ProjectTasksRepository } from '@features/projects/project-tasks/data/project-tasks-repository';
import { NewProjectTask, ProjectTask } from '@features/projects/project-tasks/project-task.model';

const STORAGE_KEY = 'orbit:project-tasks:v1';

@Injectable()
export class LocalStorageProjectTasksRepository extends ProjectTasksRepository {
  private readonly storage = inject(BrowserStorage);

  override async getByProjectId(projectId: string): Promise<ProjectTask[]> {
    return this.readProjectTasks().filter((task) => task.projectId === projectId);
  }

  override async create(input: NewProjectTask): Promise<ProjectTask> {
    const task: ProjectTask = {
      ...input,
      id: crypto.randomUUID(),
      status: 'todo',
      createdAt: new Date().toISOString(),
    };

    this.storage.write(STORAGE_KEY, [...this.readProjectTasks(), task]);

    return task;
  }

  private readProjectTasks(): ProjectTask[] {
    const data = this.storage.read(STORAGE_KEY);

    return Array.isArray(data) ? (data as ProjectTask[]) : [];
  }
}
