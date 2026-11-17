import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Task } from '@features/projects/tasks/task.model';
import { IconButton } from '@shared/ui/icon-button/icon-button';
import { PriorityIcon } from '@shared/ui/priority-icon/priority-icon';

@Component({
  selector: 'app-task-card',
  imports: [PriorityIcon, IconButton, DatePipe],
  template: `
    <header>
      <app-priority-icon [priority]="task().priority" [label]="priorityLabel()"></app-priority-icon>
      <span>{{ code() }}</span>
      <button appIconButton icon="dots" label="Task actions" disabled></button>
    </header>

    <div>
      <h3>{{ task().title }}</h3>

      @if (task().description) {
        <p>{{ task().description }}</p>
      }

      <time [attr.datetime]="task().createdAt">{{ task().createdAt | date: 'dd.MM.yyyy' }}</time>
    </div>
  `,
  styleUrl: './task-card.scss',
})
export class TaskCard {
  readonly task = input.required<Task>();

  protected readonly priorityLabel = computed(() => `${this.task().priority} priority`);
  protected readonly code = computed(() => `US-${this.task().number}`);
}
