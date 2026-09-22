import { Component, computed, input } from '@angular/core';
import { IconName } from './icon.types';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label()"
    >
      <use [attr.href]="href()" />
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(24);
  readonly label = input<string>();

  protected readonly href = computed(() => `icons/sprite.svg#${this.name()}`);
}
