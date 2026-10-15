import { Service } from '@angular/core';

@Service()
export class BrowserStorage {
  /**
   * Parsed value, or `null` when the key is missing, unreadable or not valid JSON.
   * Never throws.
   */
  read(key: string): unknown {
    try {
      const raw = localStorage.getItem(key);

      return raw === null ? null : JSON.parse(raw);
    } catch (error) {
      console.error(`Failed to read ${key} from storage`, error);

      return null;
    }
  }

  write(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to write ${key} to storage`, error);
    }
  }
}
