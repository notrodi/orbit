import { inject, Injectable } from '@angular/core';
import { BrowserStorage } from '@core/storage/browser-storage';
import { TasksRepository } from '@features/projects/tasks/data/tasks-repository';
import { NewTask, Task } from '@features/projects/tasks/task.model';

const STORAGE_KEY = 'orbit:tasks:v1';

@Injectable()
export class LocalStorageTasksRepository extends TasksRepository {
  private readonly storage = inject(BrowserStorage);

  override async getByProjectId(projectId: string): Promise<Task[]> {
    return this.readTasks().filter((task) => task.projectId === projectId);
  }

  override async create(input: NewTask): Promise<Task> {
    const task: Task = {
      ...input,
      id: crypto.randomUUID(),
      status: 'todo',
      createdAt: new Date().toISOString(),
    };

    this.storage.write(STORAGE_KEY, [...this.readTasks(), task]);

    return task;
  }

  private readTasks(): Task[] {
    const data = this.storage.read(STORAGE_KEY);

    return Array.isArray(data) ? (data as Task[]) : [];
  }
}
