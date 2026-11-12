import { Component, input } from '@angular/core';
import { Priority } from '@shared/models/priority.model';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-priority-icon',
  imports: [Icon],
  template: '<app-icon name="chevrons-down" [size]="12" [label]="label()"></app-icon>',
  host: {
    '[class]': 'priority()',
  },
  styleUrl: './priority-icon.scss',
})
export class PriorityIcon {
  readonly priority = input.required<Priority>();
  readonly label = input<string>();
}
