import { inject, Service, signal } from '@angular/core';
import { DEMO_DATA_SOURCES } from '@core/demo/demo-data-source';
import { BrowserStorage } from '@core/storage/browser-storage';

const STORAGE_KEY = 'orbit:demo:v1';

@Service()
export class DemoData {
  private readonly sources = inject(DEMO_DATA_SOURCES);
  private readonly storage = inject(BrowserStorage);
  private readonly state = signal(this.storage.read(STORAGE_KEY) === true);

  readonly isActive = this.state.asReadonly();

  async load(): Promise<void> {
    if (this.isActive()) {
      return;
    }

    for (const source of this.sources) {
      await source.seed();
    }

    this.storage.write(STORAGE_KEY, true);
    this.state.set(true);
  }

  /** Removes all app data, not only the demo. */
  async clear(): Promise<void> {
    for (const source of this.sources) {
      await source.clear();
    }

    this.storage.write(STORAGE_KEY, false);
    this.state.set(false);
  }
}
