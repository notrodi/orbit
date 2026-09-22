import { Component, computed, input } from '@angular/core';
import { Icon } from '@shared/ui/icon/icon';

type LogoSize = 'medium' | 'large';

@Component({
  selector: 'app-logo',
  template: `
    <app-icon name="orbit-logo" [size]="iconSize()"></app-icon>
    <span>RBIT</span>
  `,
  styleUrl: './logo.scss',
  imports: [Icon],
  host: { '[class.logo_large]': `size() === 'large'` },
})
export class Logo {
  readonly size = input<LogoSize>('medium');

  protected readonly iconSize = computed(() => (this.size() === 'medium' ? 32 : 64));
}
