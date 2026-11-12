import { Component, computed, effect, inject, input } from '@angular/core';
import { ProjectTasksStore } from '@features/projects/project-tasks/project-tasks-store';
import { ProjectsStore } from '@features/projects/projects-store';
import { ProjectHeader } from '@features/projects/ui/project-header/project-header';

@Component({
  selector: 'app-project-page',
  imports: [ProjectHeader],
  template: `
    @if (project(); as project) {
      <app-project-header [project]="project"></app-project-header>

      <ul>
        @for (task of tasks(); track task.id) {
          <li>US-{{ task.number }} {{ task.title }}</li>
        }
      </ul>
    }
  `,
})
export class ProjectPage {
  readonly projectId = input.required<string>();

  private readonly projectsStore = inject(ProjectsStore);
  private readonly projectTasksStore = inject(ProjectTasksStore);

  protected readonly project = computed(() => this.projectsStore.getById(this.projectId()));
  protected readonly tasks = this.projectTasksStore.tasks;

  constructor() {
    effect(() => this.projectTasksStore.load(this.projectId()));
  }
}
