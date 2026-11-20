import { booleanAttribute, Component, input } from '@angular/core';
import { Icon } from '@shared/ui/icon/icon';
import { IconName } from '@shared/ui/icon/icon.types';

@Component({
  selector: 'app-action-card',
  imports: [Icon],
  template: `
    <header>
      <app-icon [name]="icon()" [size]="20"></app-icon>
      <h3>{{ heading() }}</h3>
    </header>

    <p>{{ description() }}</p>

    <footer>
      <ng-content></ng-content>
    </footer>
  `,
  host: {
    '[class.highlighted]': 'highlighted()',
  },
  styleUrl: './action-card.scss',
})
export class ActionCard {
  readonly icon = input.required<IconName>();
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
  readonly highlighted = input(false, { transform: booleanAttribute });
}
