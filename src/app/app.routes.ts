import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { desktopOnlyGuard } from '@core/guards/desktop-only-guard';
import { ProjectsStore } from '@features/projects/projects-store';
import { Shell } from '@layout/shell/shell';
import { emptyAppGuard } from '@pages/welcome/routing/empty-app-guard';
import { isTouchDevice } from '@shared/utils/is-touch-device';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    canMatch: [desktopOnlyGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        canMatch: [emptyAppGuard],
        title: 'Welcome | Orbit',
        loadComponent: () => import('@pages/welcome/welcome').then((m) => m.Welcome),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: () => `/projects/${inject(ProjectsStore).projects()[0].id}`,
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('@features/projects/projects.routes').then((m) => m.PROJECTS_ROUTES),
      },
    ],
  },
  {
    path: 'under-construction',
    title: 'Under construction | Orbit',
    loadComponent: () =>
      import('@pages/under-construction/under-construction').then((m) => m.UnderConstruction),
  },
  {
    path: '**',
    redirectTo: () => (isTouchDevice() ? '/under-construction' : '/'),
  },
];
