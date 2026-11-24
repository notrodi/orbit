import { Directive } from '@angular/core';

/**
 * Stops the element from taking focus on mouse press,
 * so the currently focused field doesn't blur.
 */
@Directive({
  selector: '[appKeepFocus]',
  host: {
    '(mousedown)': '$event.preventDefault()',
  },
})
export class KeepFocus {}
