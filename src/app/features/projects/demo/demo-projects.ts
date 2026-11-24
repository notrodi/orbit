import { Project } from '@features/projects/project.model';

export const GLIPHIX_ID = '6cef34be-fa4e-4d30-981b-8ffdb3bb810e';
export const NOTRODIRU_ID = 'f2296872-f500-4ad7-9c06-72c442fcdd32';

export const DEMO_PROJECTS: readonly Project[] = [
  {
    id: GLIPHIX_ID,
    name: 'Gliphix',
    description:
      'Браузерная студия ретро-эффектов для изображений: дизеринг, пленочное зерно, полутон и ASCII',
    createdAt: '2026-07-11T08:32:32.336Z',
    lastTaskNumber: 12,
  },
  {
    id: NOTRODIRU_ID,
    name: 'notrodi.ru',
    description:
      'Сайт-портфолио: проекты, навыки и контакты. Акцент на интерактивную визуализацию навыков',
    createdAt: '2026-05-14T23:27:03.194Z',
    lastTaskNumber: 7,
  },
];
