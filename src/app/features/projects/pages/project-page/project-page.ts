import { Component, computed, inject, input } from '@angular/core';
import { ProjectsStore } from '@features/projects/projects-store';

@Component({
  selector: 'app-project-page',
  template: `
    @if (project(); as project) {
      <h1>{{ project.name }}</h1>
    }
  `,
})
export class ProjectPage {
  readonly projectId = input.required<string>();

  private readonly store = inject(ProjectsStore);

  protected readonly project = computed(() => this.store.getById(this.projectId()));
}
