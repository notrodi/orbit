import { inject, Service, signal } from '@angular/core';
import { ProjectsStore } from '@features/projects/projects-store';
import { TasksRepository } from '@features/projects/tasks/data/tasks-repository';
import { Task, TaskInput } from '@features/projects/tasks/task.model';

@Service()
export class TasksStore {
  private readonly repository = inject(TasksRepository);
  private readonly projectsStore = inject(ProjectsStore);
  private readonly state = signal<readonly Task[]>([]);

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

  async create(input: TaskInput): Promise<Task> {
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
