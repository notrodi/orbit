import { CanMatchFn } from '@angular/router';
import { isTouchDevice } from '@shared/utils/is-touch-device';

export const desktopOnlyGuard: CanMatchFn = () => !isTouchDevice();
