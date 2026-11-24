import { NavItemConfig } from '@layout/sidebar/nav-item/nav-item.types';

export const NAV_ITEMS: readonly NavItemConfig[] = [
  {
    link: '/todos',
    label: 'To-dos',
    iconName: 'checklist',
    inDevelopment: true,
  },
  {
    link: '/habits',
    label: 'Habits',
    iconName: 'circular-arrow',
    inDevelopment: true,
  },
];
