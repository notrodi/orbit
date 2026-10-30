import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { IconButton } from '@shared/ui/icon-button/icon-button';

@Component({
  selector: 'app-dialog',
  imports: [IconButton],
  template: `
    <dialog #dialog (close)="closed.emit()">
      <header>
        <h2>{{ heading() }}</h2>
        <button appIconButton icon="cross" label="Close" (click)="close()"></button>
      </header>
      <ng-content></ng-content>
    </dialog>
  `,
  styleUrl: './dialog.scss',
})
export class Dialog {
  readonly heading = input.required<string>();
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }
}
