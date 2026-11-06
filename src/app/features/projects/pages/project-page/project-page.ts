import { Component, computed, inject, input } from '@angular/core';
import { ProjectsStore } from '@features/projects/projects-store';
import { ProjectHeader } from '@features/projects/ui/project-header/project-header';

@Component({
  selector: 'app-project-page',
  imports: [ProjectHeader],
  template: `
    @if (project(); as project) {
      <app-project-header [project]="project"></app-project-header>
    }
  `,
})
export class ProjectPage {
  readonly projectId = input.required<string>();

  private readonly store = inject(ProjectsStore);

  protected readonly project = computed(() => this.store.getById(this.projectId()));
}
