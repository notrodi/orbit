import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProjectsStore } from '@features/projects/projects-store';

export const projectTitleResolver: ResolveFn<string> = (route) => {
  const projectId = route.paramMap.get('projectId') ?? '';
  const project = inject(ProjectsStore).getById(projectId);

  return `${project?.name ?? 'Project'} | Orbit`;
};
