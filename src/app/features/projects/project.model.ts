export interface Project {
  id: string;

  name: string;

  description: string;

  /** ISO 8601 */
  createdAt: string;

  /**
   * Last issued task number (US-n).
   * Only grows: numbers are never reused.
   */
  lastTaskNumber: number;
}

export type ProjectInput = Pick<Project, 'name' | 'description'>;
