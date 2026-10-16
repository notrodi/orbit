import { Routes } from '@angular/router';
import { desktopOnlyGuard } from '@core/guards/desktop-only-guard';
import { Shell } from '@layout/shell/shell';
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
        redirectTo: 'projects',
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
      import('./pages/under-construction/under-construction').then((m) => m.UnderConstruction),
  },
  {
    path: '**',
    redirectTo: () => (isTouchDevice() ? '/under-construction' : '/'),
  },
];
