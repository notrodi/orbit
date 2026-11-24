export const PRIORITIES = ['low', 'medium', 'high'] as const;

export type Priority = (typeof PRIORITIES)[number];
