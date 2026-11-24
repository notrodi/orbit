import { Component, inject } from '@angular/core';
import { DemoData } from '@core/demo/demo-data';
import { ProjectNav } from '@features/projects/ui/project-nav/project-nav';
import { DemoBanner } from '@layout/sidebar/demo-banner/demo-banner';
import { NavItem } from '@layout/sidebar/nav-item/nav-item';
import { NAV_ITEMS } from '@layout/sidebar/sidebar.config';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [Logo, NavItem, ProjectNav, DemoBanner],
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

    @if (demoData.isActive()) {
      <footer>
        <app-demo-banner></app-demo-banner>
      </footer>
    }
  `,
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly navItems = NAV_ITEMS;
  protected readonly demoData = inject(DemoData);
}
