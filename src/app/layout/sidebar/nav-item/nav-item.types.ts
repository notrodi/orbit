import { IconName } from '@shared/ui/icon/icon.types';

export interface NavItemConfig {
  readonly link: `/${string}`;

  readonly label: string;

  readonly iconName: IconName;

  /** Section is not ready yet: rendered as a disabled item with a wrench icon. */
  readonly inDevelopment?: boolean;
}
