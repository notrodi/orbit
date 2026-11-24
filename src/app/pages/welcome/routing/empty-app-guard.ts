import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { ProjectsStore } from '@features/projects/projects-store';

export const emptyAppGuard: CanMatchFn = () => inject(ProjectsStore).projects().length === 0;
