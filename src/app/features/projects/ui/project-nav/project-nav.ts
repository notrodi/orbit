import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectsStore } from '@features/projects/projects-store';

@Component({
  selector: 'app-project-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav aria-labelledby="project-nav-heading">
      <h2 id="project-nav-heading">My projects</h2>

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
  `,
  styleUrl: './project-nav.scss',
})
export class ProjectNav {
  protected readonly projects = inject(ProjectsStore).projects;
}
