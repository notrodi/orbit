import { InjectionToken } from '@angular/core';

export interface DemoDataSource {
  seed(): Promise<void>;

  /** Removes all of the feature's data, demo or not. */
  clear(): Promise<void>;
}

export const DEMO_DATA_SOURCES = new InjectionToken<readonly DemoDataSource[]>('DEMO_DATA_SOURCES');
