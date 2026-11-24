import { Routes } from '@angular/router';
import { projectExistsGuard } from '@features/projects/routing/project-exists-guard';
import { projectTitleResolver } from '@features/projects/routing/project-title-resolver';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: ':projectId',
    canActivate: [projectExistsGuard],
    title: projectTitleResolver,
    loadComponent: () =>
      import('@features/projects/pages/project-page/project-page').then((m) => m.ProjectPage),
  },
];
