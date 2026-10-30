import { Component, input } from '@angular/core';
import { Icon } from '@shared/ui/icon/icon';
import { IconName } from '@shared/ui/icon/icon.types';

type IconButtonVariant = 'default' | 'primary';

@Component({
  selector: 'button[appIconButton]',
  imports: [Icon],
  template: `<app-icon [name]="icon()" [size]="iconSize()"></app-icon>`,
  host: {
    type: 'button',
    '[attr.aria-label]': 'label()',
    '[class]': 'variant()',
  },
  styleUrl: './icon-button.scss',
})
export class IconButton {
  readonly variant = input<IconButtonVariant>('default');
  readonly icon = input.required<IconName>();
  readonly label = input.required<string>();
  readonly iconSize = input(14);
}
