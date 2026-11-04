import { Component, inject, signal, viewChild } from '@angular/core';
import { form, FormRoot, pattern, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ProjectInput } from '@features/projects/project.model';
import { ProjectsStore } from '@features/projects/projects-store';
import { KeepFocus } from '@shared/directives/keep-focus';
import { Button } from '@shared/ui/button/button';
import { Dialog } from '@shared/ui/dialog/dialog';
import { TextField } from '@shared/ui/text-field/text-field';

const EMPTY_INPUT: ProjectInput = { name: '', description: '' };

@Component({
  selector: 'app-project-dialog',
  imports: [Dialog, Button, FormRoot, TextField, KeepFocus],
  template: `
    <app-dialog heading="Create project" (closed)="reset()">
      <form [formRoot]="projectForm">
        <app-text-field label="Name" [field]="projectForm.name" autofocus></app-text-field>
        <app-text-field
          label="Description"
          [field]="projectForm.description"
          multiline
        ></app-text-field>

        <footer>
          <button type="button" appButton appKeepFocus (click)="close()">Cancel</button>
          <button type="submit" appButton variant="primary">Create</button>
        </footer>
      </form>
    </app-dialog>
  `,
  styleUrl: './project-dialog.scss',
})
export class ProjectDialog {
  private readonly store = inject(ProjectsStore);
  private readonly router = inject(Router);
  private readonly dialog = viewChild.required(Dialog);

  protected readonly projectModel = signal<ProjectInput>({ ...EMPTY_INPUT });
  protected readonly projectForm = form(
    this.projectModel,
    (path) => {
      required(path.name, { message: 'Enter the project name' });
      pattern(path.name, /\S/, { message: 'Enter the project name' });
    },
    {
      submission: {
        action: () => this.createProject(),
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
    this.projectForm().reset({ ...EMPTY_INPUT });
  }

  private async createProject(): Promise<void> {
    const { name, description } = this.projectModel();
    const project = await this.store.create({
      name: name.trim(),
      description: description.trim(),
    });

    this.close();
    await this.router.navigate(['/projects', project.id]);
  }
}
