import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { ProjectsStore } from '@features/projects/projects-store';

export const redirectToFirstProjectGuard: CanActivateFn = () => {
  const store = inject(ProjectsStore);
  const router = inject(Router);
  const [firstProject] = store.projects();

  return firstProject
    ? new RedirectCommand(router.createUrlTree(['/projects', firstProject.id]))
    : true;
};
