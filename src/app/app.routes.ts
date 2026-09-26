import { Routes } from '@angular/router';
import { Shell } from '@layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [],
  },
  {
    path: 'under-construction',
    title: 'Under construction | Orbit',
    loadComponent: () =>
      import('./pages/under-construction/under-construction').then((m) => m.UnderConstruction),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
