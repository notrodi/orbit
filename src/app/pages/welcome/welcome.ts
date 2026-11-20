import { Component } from '@angular/core';
import { ProjectDialog } from '@features/projects/ui/project-dialog/project-dialog';
import { ActionCard } from '@pages/welcome/ui/action-card/action-card';
import { Button } from '@shared/ui/button/button';

@Component({
  selector: 'app-welcome',
  imports: [ActionCard, Button, ProjectDialog],
  template: `
    <header>
      <h1>Welcome to Orbit!</h1>
      <p>Your all-in-one space for staying productive.</p>
    </header>

    <section>
      <h2>Get started</h2>

      <div>
        <app-action-card
          highlighted
          icon="stars"
          heading="Explore with demo data"
          description="Fill Orbit with sample data to see every feature in action. You can clear it anytime in one click."
        >
          <button type="button" appButton variant="primary" disabled>Add demo data</button>
        </app-action-card>

        <app-action-card
          icon="rocket"
          heading="Start your first project"
          description="Create a project and break it into tasks on a board: To do, In progress, Done."
        >
          <button type="button" appButton (click)="projectDialog.open()">Create project</button>
        </app-action-card>
      </div>
    </section>

    <app-project-dialog #projectDialog></app-project-dialog>
  `,
  styleUrl: './welcome.scss',
})
export class Welcome {}
