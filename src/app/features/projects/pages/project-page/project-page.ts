import { Component, computed, effect, inject, input } from '@angular/core';
import { ProjectsStore } from '@features/projects/projects-store';
import { TasksStore } from '@features/projects/tasks/tasks-store';
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
  private readonly tasksStore = inject(TasksStore);

  protected readonly project = computed(() => this.projectsStore.getById(this.projectId()));
  protected readonly tasks = this.tasksStore.tasks;

  constructor() {
    effect(() => this.tasksStore.load(this.projectId()));
  }
}
