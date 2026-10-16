import { Routes } from '@angular/router';
import { projectExistsGuard } from '@features/projects/routing/project-exists-guard';
import { projectTitleResolver } from '@features/projects/routing/project-title-resolver';
import { redirectToFirstProjectGuard } from '@features/projects/routing/redirect-to-first-project-guard';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [redirectToFirstProjectGuard],
    title: 'Projects | Orbit',
    loadComponent: () =>
      import('@features/projects/pages/no-projects-page/no-projects-page').then(
        (m) => m.NoProjectsPage,
      ),
  },
  {
    path: ':projectId',
    canActivate: [projectExistsGuard],
    title: projectTitleResolver,
    loadComponent: () =>
      import('@features/projects/pages/project-page/project-page').then((m) => m.ProjectPage),
  },
];
