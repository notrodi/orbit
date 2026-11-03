import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectsStore } from '@features/projects/projects-store';
import { ProjectDialog } from '@features/projects/ui/project-dialog/project-dialog';
import { IconButton } from '@shared/ui/icon-button/icon-button';

@Component({
  selector: 'app-project-nav',
  imports: [RouterLink, RouterLinkActive, IconButton, ProjectDialog],
  template: `
    <nav aria-labelledby="project-nav-heading">
      <header>
        <h2 id="project-nav-heading">My projects</h2>

        <button
          appIconButton
          variant="primary"
          icon="plus-square"
          label="Create project"
          [iconSize]="24"
          (click)="projectDialog.open()"
        ></button>
      </header>

      @if (projects().length) {
        <ul>
          @for (project of projects(); track project.id) {
            <li>
              <a
                [routerLink]="['/projects', project.id]"
                routerLinkActive
                ariaCurrentWhenActive="page"
              >
                {{ project.name }}
              </a>
            </li>
          }
        </ul>
      } @else {
        <p>No projects yet</p>
      }
    </nav>

    <app-project-dialog #projectDialog></app-project-dialog>
  `,
  styleUrl: './project-nav.scss',
})
export class ProjectNav {
  protected readonly projects = inject(ProjectsStore).projects;
}
