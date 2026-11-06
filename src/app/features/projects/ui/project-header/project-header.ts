import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Project } from '@features/projects/project.model';
import { Button } from '@shared/ui/button/button';
import { IconButton } from '@shared/ui/icon-button/icon-button';

@Component({
  selector: 'app-project-header',
  imports: [DatePipe, Button, IconButton],
  template: `
    <header>
      <div>
        <h1>{{ project().name }}</h1>

        @if (project().description) {
          <p>{{ project().description }}</p>
        }
      </div>

      <dl>
        <div>
          <dt>Created</dt>
          <dd>
            <time [attr.datetime]="project().createdAt">
              {{ project().createdAt | date: 'dd MMM yyyy' }}
            </time>
          </dd>
        </div>
        <div>
          <dt>Tracked time</dt>
          <dd>—</dd>
        </div>
      </dl>
    </header>

    <footer>
      <button type="button" appButton variant="primary" icon="plus-square" disabled>
        Add new task
      </button>

      <button
        appIconButton
        variant="secondary"
        icon="pencil"
        label="Edit project"
        [iconSize]="20"
        disabled
      ></button>
    </footer>
  `,
  styleUrl: './project-header.scss',
})
export class ProjectHeader {
  readonly project = input.required<Project>();
}
