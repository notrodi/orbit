import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { ProjectsStore } from '@features/projects/projects-store';

export const projectExistsGuard: CanActivateFn = (route) => {
  const store = inject(ProjectsStore);
  const router = inject(Router);
  const projectId = route.paramMap.get('projectId');

  return projectId && store.getById(projectId)
    ? true
    : new RedirectCommand(router.createUrlTree(['/projects']));
};
