import { Component, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemoData } from '@core/demo/demo-data';
import { Button } from '@shared/ui/button/button';
import { Dialog } from '@shared/ui/dialog/dialog';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-demo-banner',
  imports: [Icon, Button, Dialog],
  template: `
    <h2>
      <app-icon name="stars" [size]="20"></app-icon>
      Demo data
    </h2>

    <p>
      The app was filled with demo data. Edit it freely or clear everything to start from scratch.
    </p>

    <button type="button" appButton (click)="dialog().open()">Clear all data</button>

    <app-dialog heading="Clear all data?">
      <p>
        All projects and tasks will be permanently deleted, including anything you created yourself.
        This can’t be undone.
      </p>

      <footer>
        <button type="button" appButton (click)="close()">Cancel</button>
        <button type="button" appButton variant="danger" (click)="clearAllData()">
          Clear all data
        </button>
      </footer>
    </app-dialog>
  `,
  styleUrl: './demo-banner.scss',
})
export class DemoBanner {
  private readonly demoData = inject(DemoData);
  private readonly router = inject(Router);
  protected readonly dialog = viewChild.required(Dialog);

  protected close(): void {
    this.dialog().close();
  }

  protected async clearAllData(): Promise<void> {
    await this.demoData.clear();
    this.close();
    await this.router.navigateByUrl('/');
  }
}
