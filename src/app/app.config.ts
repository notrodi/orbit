import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { LocalStorageProjectsRepository } from '@features/projects/data/local-storage-projects-repository';
import { ProjectsRepository } from '@features/projects/data/projects-repository';
import { LocalStorageProjectTasksRepository } from '@features/projects/project-tasks/data/local-storage-project-tasks-repository';
import { ProjectTasksRepository } from '@features/projects/project-tasks/data/project-tasks-repository';
import { ProjectsStore } from '@features/projects/projects-store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: ProjectsRepository, useClass: LocalStorageProjectsRepository },
    { provide: ProjectTasksRepository, useClass: LocalStorageProjectTasksRepository },
    provideAppInitializer(() => inject(ProjectsStore).load()),
  ],
};
