import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/uni-flower-mall',
  name: 'uni-flower-mall',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.uni-flower-mall',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/uni-flower-mall/workplace/index.vue'),
      meta: {
        locale: 'menu.uni-flower-mall.workplace',
        requiresAuth: true,
        roles: ['*'],
      },
    },

    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/uni-flower-mall/monitor/index.vue'),
      meta: {
        locale: 'menu.uni-flower-mall.monitor',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
