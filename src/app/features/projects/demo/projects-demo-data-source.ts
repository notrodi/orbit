import { inject, Injectable } from '@angular/core';
import { DemoDataSource } from '@core/demo/demo-data-source';
import { ProjectsRepository } from '@features/projects/data/projects-repository';
import { DEMO_PROJECTS } from '@features/projects/demo/demo-projects';
import { DEMO_TASKS } from '@features/projects/demo/demo-tasks';
import { ProjectsStore } from '@features/projects/projects-store';
import { TasksRepository } from '@features/projects/tasks/data/tasks-repository';

@Injectable()
export class ProjectsDemoDataSource implements DemoDataSource {
  private readonly projectsRepository = inject(ProjectsRepository);
  private readonly tasksRepository = inject(TasksRepository);
  private readonly projectsStore = inject(ProjectsStore);

  async seed(): Promise<void> {
    await this.projectsRepository.addMany(DEMO_PROJECTS);
    await this.tasksRepository.addMany(DEMO_TASKS);
    await this.projectsStore.load();
  }

  async clear(): Promise<void> {
    await this.projectsRepository.deleteAll();
    await this.tasksRepository.deleteAll();
    await this.projectsStore.load();
  }
}
