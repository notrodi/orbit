import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/under-construction/under-construction').then((m) => m.UnderConstruction),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
