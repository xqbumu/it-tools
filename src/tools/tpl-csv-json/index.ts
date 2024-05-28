import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.tpl-csv-json.title'),
  path: '/tpl-csv-json',
  description: translate('tools.tpl-csv-json.description'),
  keywords: ['csv', 'to', 'json'],
  component: () => import('./tpl-csv-json.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-05-28'),
});