import { booleanAttribute, Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

let nextId = 0;

@Component({
  selector: 'app-text-field',
  imports: [FormField],
  template: `
    <label [for]="id">{{ label() }}</label>

    @if (multiline()) {
      <textarea
        [id]="id"
        [formField]="field()"
        [rows]="rows()"
        [attr.autofocus]="autofocus() || null"
        [attr.aria-invalid]="showError() || null"
        [attr.aria-describedby]="showError() ? errorId : null"
      ></textarea>
    } @else {
      <input
        [id]="id"
        [formField]="field()"
        [attr.autofocus]="autofocus() || null"
        [attr.aria-invalid]="showError() || null"
        [attr.aria-describedby]="showError() ? errorId : null"
      />
    }

    @if (showError()) {
      <p [id]="errorId">{{ errorMessage() }}</p>
    }
  `,
  styleUrl: './text-field.scss',
})
export class TextField {
  readonly field = input.required<FieldTree<string>>();
  readonly label = input.required<string>();
  readonly rows = input(4);
  readonly multiline = input(false, { transform: booleanAttribute });
  readonly autofocus = input(false, { transform: booleanAttribute });

  protected readonly id = `text-field-${nextId++}`;
  protected readonly errorId = `${this.id}-error`;

  protected readonly state = computed(() => this.field()());
  protected readonly showError = computed(() => this.state().touched() && this.state().invalid());
  protected readonly errorMessage = computed(() => this.state().errors()[0]?.message);
}
