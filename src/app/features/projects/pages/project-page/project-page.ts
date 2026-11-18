import { Component, computed, effect, inject, input } from '@angular/core';
import { ProjectsStore } from '@features/projects/projects-store';
import { TaskMove } from '@features/projects/tasks/task.model';
import { TasksStore } from '@features/projects/tasks/tasks-store';
import { TaskBoard } from '@features/projects/tasks/ui/task-board/task-board';
import { TaskDialog } from '@features/projects/tasks/ui/task-dialog/task-dialog';
import { ProjectHeader } from '@features/projects/ui/project-header/project-header';

@Component({
  selector: 'app-project-page',
  imports: [ProjectHeader, TaskDialog, TaskBoard],
  template: `
    @if (project(); as project) {
      <app-project-header [project]="project" (createTask)="taskDialog.open()"></app-project-header>

      <app-task-board [tasks]="tasks()" (moveTask)="moveTask($event)"></app-task-board>
    }

    <app-task-dialog #taskDialog></app-task-dialog>
  `,
  styleUrl: './project-page.scss',
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

  protected moveTask({ taskId, status, index }: TaskMove): void {
    this.tasksStore.move(taskId, status, index);
  }
}
