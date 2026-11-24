import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ApplicationRef, Component, computed, inject, input, output } from '@angular/core';
import { byPosition } from '@features/projects/tasks/task-position';
import {
  Task,
  TASK_STATUS_LABELS,
  TASK_STATUSES,
  TaskMove,
  TaskStatus,
} from '@features/projects/tasks/task.model';
import { TaskCard } from '@features/projects/tasks/ui/task-card/task-card';

@Component({
  selector: 'app-task-board',
  imports: [TaskCard, CdkDropList, CdkDrag],
  hostDirectives: [CdkDropListGroup],
  template: `
    @for (column of columns(); track column.status) {
      <section>
        <h2>{{ column.label }}</h2>

        <ul
          cdkDropList
          [cdkDropListData]="column.status"
          (cdkDropListExited)="renderNow()"
          (cdkDropListDropped)="drop($event)"
        >
          @for (task of column.tasks; track task.id) {
            <li cdkDrag [cdkDragData]="task.id">
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
  private readonly appRef = inject(ApplicationRef);

  readonly tasks = input.required<readonly Task[]>();
  readonly moveTask = output<TaskMove>();

  protected readonly columns = computed(() =>
    TASK_STATUSES.map((status) => ({
      status,
      label: TASK_STATUS_LABELS[status],
      tasks: this.tasks()
        .filter((task) => task.status === status)
        .sort(byPosition),
    })),
  );

  protected drop(event: CdkDragDrop<TaskStatus, TaskStatus, string>): void {
    const { previousContainer, container, previousIndex, currentIndex, item } = event;
    const isSamePlace = previousContainer === container && previousIndex === currentIndex;

    if (!isSamePlace) {
      this.moveTask.emit({ taskId: item.data, status: container.data, index: currentIndex });
    }

    this.renderNow();
  }

  /**
   * CDK expects the view to update right after its event, but without zone.js
   * Angular renders a frame later: the dropped card would blink in its old place,
   * and lists would keep their `cdk-drop-list-dragging` transition after exit or drop.
   */
  protected renderNow(): void {
    this.appRef.tick();
  }
}
