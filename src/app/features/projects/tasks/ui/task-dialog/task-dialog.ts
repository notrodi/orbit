import { Component, inject, signal, viewChild } from '@angular/core';
import { form, FormRoot, pattern, required } from '@angular/forms/signals';
import { TaskInput } from '@features/projects/tasks/task.model';
import { TasksStore } from '@features/projects/tasks/tasks-store';
import { KeepFocus } from '@shared/directives/keep-focus';
import { Button } from '@shared/ui/button/button';
import { Dialog } from '@shared/ui/dialog/dialog';
import { TextField } from '@shared/ui/text-field/text-field';

const EMPTY_INPUT: TaskInput = { title: '', description: '', priority: 'medium' };

@Component({
  selector: 'app-task-dialog',
  imports: [Dialog, TextField, FormRoot, Button, KeepFocus],
  template: `
    <app-dialog heading="Create task" (closed)="reset()">
      <form [formRoot]="taskForm">
        <app-text-field label="Title" [field]="taskForm.title" autofocus></app-text-field>
        <app-text-field
          label="Description"
          [field]="taskForm.description"
          multiline
        ></app-text-field>

        <footer>
          <button type="button" appButton appKeepFocus (click)="close()">Cancel</button>
          <button type="submit" appButton variant="primary">Create</button>
        </footer>
      </form>
    </app-dialog>
  `,
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  private readonly store = inject(TasksStore);
  private readonly dialog = viewChild.required(Dialog);

  protected readonly taskModel = signal<TaskInput>({ ...EMPTY_INPUT });
  protected readonly taskForm = form(
    this.taskModel,
    (path) => {
      required(path.title, { message: 'Enter the task title' });
      pattern(path.title, /\S/, { message: 'Enter the task title' });
    },
    {
      submission: {
        action: () => this.createTask(),
      },
    },
  );

  open(): void {
    this.dialog().open();
  }

  protected close(): void {
    this.dialog().close();
  }

  protected reset(): void {
    this.taskForm().reset({ ...EMPTY_INPUT });
  }

  private async createTask(): Promise<void> {
    const { title, description, priority } = this.taskModel();
    await this.store.create({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    this.close();
  }
}
