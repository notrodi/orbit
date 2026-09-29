import { Component } from '@angular/core';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [Logo],
  template: `
    <app-logo></app-logo>

    <nav aria-label="Main"></nav>
  `,
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
