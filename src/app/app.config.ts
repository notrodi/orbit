import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { LocalStorageProjectsRepository } from '@features/projects/data/local-storage-projects-repository';
import { ProjectsRepository } from '@features/projects/data/projects-repository';
import { ProjectsStore } from '@features/projects/projects-store';
import { LocalStorageTasksRepository } from '@features/projects/tasks/data/local-storage-tasks-repository';
import { TasksRepository } from '@features/projects/tasks/data/tasks-repository';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: ProjectsRepository, useClass: LocalStorageProjectsRepository },
    { provide: TasksRepository, useClass: LocalStorageTasksRepository },
    provideAppInitializer(() => inject(ProjectsStore).load()),
  ],
};
