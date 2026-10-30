import { Component, input } from '@angular/core';
import { Icon } from '@shared/ui/icon/icon';
import { IconName } from '@shared/ui/icon/icon.types';

type ButtonVariant = 'default' | 'primary';

@Component({
  selector: 'button[appButton]',
  imports: [Icon],
  template: `
    @if (icon(); as icon) {
      <app-icon [name]="icon" [size]="18"></app-icon>
    }

    <ng-content></ng-content>
  `,
  host: {
    '[class]': 'variant()',
  },
  styleUrl: './button.scss',
})
export class Button {
  readonly variant = input<ButtonVariant>('default');
  readonly icon = input<IconName>();
}
