import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '@layout/sidebar/sidebar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Sidebar],
  template: `
    <app-sidebar></app-sidebar>

    <main>
      <router-outlet />
    </main>

    <aside aria-label="Widgets"></aside>
  `,
  styleUrl: './shell.scss',
})
export class Shell {}
