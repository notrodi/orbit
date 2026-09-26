import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  template: `
    <nav aria-label="Main"></nav>

    <main>
      <router-outlet />
    </main>

    <aside aria-label="Widgets"></aside>
  `,
  styleUrl: './shell.scss',
})
export class Shell {}
