import { assertInInjectionContext, DOCUMENT, inject } from '@angular/core';

const TOUCH_DEVICE_QUERY = '(hover: none) and (pointer: coarse)';

/**
 * Checks whether the primary input is touch (phones, tablets).
 * Must be called in an injection context.
 */
export function isTouchDevice(): boolean {
  assertInInjectionContext(isTouchDevice);

  const view = inject(DOCUMENT).defaultView;

  return view?.matchMedia(TOUCH_DEVICE_QUERY).matches ?? false;
}
