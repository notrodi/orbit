import { Component, computed, input } from '@angular/core';
import { byPosition } from '@features/projects/tasks/task-position';
import { Task, TASK_STATUS_LABELS, TASK_STATUSES } from '@features/projects/tasks/task.model';
import { TaskCard } from '@features/projects/tasks/ui/task-card/task-card';

@Component({
  selector: 'app-task-board',
  imports: [TaskCard],
  template: `
    @for (column of columns(); track column.status) {
      <section>
        <h2>{{ column.label }}</h2>

        <ul>
          @for (task of column.tasks; track task.id) {
            <li>
              <app-task-card [task]="task"></app-task-card>
            </li>
          }
        </ul>
      </section>
    }
  `,
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  readonly tasks = input.required<readonly Task[]>();

  protected readonly columns = computed(() =>
    TASK_STATUSES.map((status) => ({
      status,
      label: TASK_STATUS_LABELS[status],
      tasks: this.tasks()
        .filter((task) => task.status === status)
        .sort(byPosition),
    })),
  );
}
