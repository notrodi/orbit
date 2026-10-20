import { Component } from '@angular/core';
import { ProjectNav } from '@features/projects/ui/project-nav/project-nav';
import { NavItem } from '@layout/sidebar/nav-item/nav-item';
import { NAV_ITEMS } from '@layout/sidebar/sidebar.config';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [Logo, NavItem, ProjectNav],
  template: `
    <app-logo></app-logo>

    <div>
      <app-project-nav></app-project-nav>

      <nav aria-label="Main">
        <ul>
          @for (item of navItems; track item.link) {
            <li>
              <app-nav-item [item]="item"></app-nav-item>
            </li>
          }
        </ul>
      </nav>
    </div>
  `,
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly navItems = NAV_ITEMS;
}
