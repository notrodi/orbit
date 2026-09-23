import { Component } from '@angular/core';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-under-construction',
  imports: [Logo],
  template: `
    <app-logo size="large"></app-logo>
    <p>under construction</p>
  `,
  styleUrl: './under-construction.scss',
})
export class UnderConstruction {}
