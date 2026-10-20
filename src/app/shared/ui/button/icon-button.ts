import { Component, input } from '@angular/core';
import { Icon } from '@shared/ui/icon/icon';
import { IconName } from '@shared/ui/icon/icon.types';

@Component({
  selector: 'button[appIconButton]',
  imports: [Icon],
  template: `<app-icon [name]="icon()" [size]="size()"></app-icon>`,
  host: {
    type: 'button',
    '[attr.aria-label]': 'label()',
  },
  styleUrl: './icon-button.scss',
})
export class IconButton {
  readonly icon = input.required<IconName>();
  readonly label = input.required<string>();
  readonly size = input(24);
}
