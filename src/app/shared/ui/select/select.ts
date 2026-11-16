import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  ElementRef,
  input,
  model,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { Icon } from '@shared/ui/icon/icon';

let nextId = 0;

@Component({
  selector: 'app-select',
  imports: [NgTemplateOutlet, Icon],
  template: `
    <label [for]="selectId">{{ label() }}</label>

    <button type="button" class="trigger" [id]="selectId" [attr.popovertarget]="listId">
      <span>
        <ng-container
          [ngTemplateOutlet]="optionTemplate()"
          [ngTemplateOutletContext]="{ $implicit: value() }"
        ></ng-container>
      </span>

      <app-icon name="chevron-down" [size]="12"></app-icon>
    </button>

    <ul #list [id]="listId" popover>
      @for (option of options(); track option) {
        <li>
          <button
            type="button"
            (click)="select(option)"
            [attr.aria-current]="option === value() || null"
          >
            <span>
              <ng-container
                [ngTemplateOutlet]="optionTemplate()"
                [ngTemplateOutletContext]="{ $implicit: option }"
              ></ng-container>
            </span>
          </button>
        </li>
      }
    </ul>
  `,
  styleUrl: './select.scss',
})
export class Select<T> implements FormValueControl<T> {
  readonly options = input.required<readonly T[]>();
  readonly label = input.required<string>();
  readonly value = model.required<T>();

  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  protected readonly optionTemplate = contentChild.required(TemplateRef);
  protected readonly selectId = `select-${nextId++}`;
  protected readonly listId = `${this.selectId}-list`;

  protected select(option: T): void {
    this.value.set(option);
    this.list().nativeElement.hidePopover();
  }
}
