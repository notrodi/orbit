import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItemConfig } from '@layout/sidebar/nav-item/nav-item.types';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, Icon],
  template: `
    <a
      [routerLink]="link()"
      [attr.role]="inDevelopment() ? 'link' : null"
      [attr.aria-disabled]="inDevelopment() || null"
    >
      <app-icon [name]="item().iconName"></app-icon>
      {{ item().label }}

      @if (inDevelopment()) {
        <app-icon class="wrench" name="wrench" label="In development"></app-icon>
      }
    </a>
  `,
  styleUrl: './nav-item.scss',
})
export class NavItem {
  readonly item = input.required<NavItemConfig>();

  protected readonly inDevelopment = computed(() => this.item().inDevelopment ?? false);
  protected readonly link = computed(() => (this.inDevelopment() ? null : this.item().link));
}
