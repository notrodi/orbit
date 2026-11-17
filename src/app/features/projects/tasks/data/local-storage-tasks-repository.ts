import { inject, Injectable } from '@angular/core';
import { BrowserStorage } from '@core/storage/browser-storage';
import { TasksRepository } from '@features/projects/tasks/data/tasks-repository';
import { moveTask } from '@features/projects/tasks/task-position';
import { NewTask, Task, TaskStatus } from '@features/projects/tasks/task.model';

const STORAGE_KEY = 'orbit:tasks:v1';

@Injectable()
export class LocalStorageTasksRepository extends TasksRepository {
  private readonly storage = inject(BrowserStorage);

  override async getByProjectId(projectId: string): Promise<Task[]> {
    return this.readTasks().filter((task) => task.projectId === projectId);
  }

  override async create(input: NewTask): Promise<Task> {
    const tasks = this.readTasks();
    const todoCount = tasks.filter(
      (task) => task.projectId === input.projectId && task.status === 'todo',
    ).length;
    const createdTask: Task = {
      ...input,
      id: crypto.randomUUID(),
      status: 'todo',
      position: todoCount,
      createdAt: new Date().toISOString(),
    };

    this.storage.write(STORAGE_KEY, [...tasks, createdTask]);

    return createdTask;
  }

  override async move(taskId: string, status: TaskStatus, index: number): Promise<void> {
    this.storage.write(STORAGE_KEY, moveTask(this.readTasks(), taskId, status, index));
  }

  private readTasks(): Task[] {
    const data = this.storage.read(STORAGE_KEY);

    return Array.isArray(data) ? (data as Task[]) : [];
  }
}
