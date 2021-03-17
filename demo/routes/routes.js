import { withPrefix } from './utils'

export const docChildRoutes = withPrefix('/:lang/:theme/docs', [
  // basic docs
  {
    path: '/installation',
    component: () => import('../pages/docs/installation/index.entry')
  },
  {
    path: '/usage',
    component: () => import('../pages/docs/usage/index.entry')
  },
  {
    path: '/supported-platforms',
    component: () => import('../pages/docs/supported-platforms/index.entry')
  },
  {
    path: '/from-v1',
    component: () => import('../pages/docs/vue3/index.entry')
  },
  {
    path: '/experimental-features',
    component: () => import('../pages/docs/experimental-features/index.entry')
  },
  {
    path: '/changelog',
    component: () => import('../pages/docs/changelog/index.entry')
  },
  {
    path: '/theme',
    component: () => import('../pages/docs/theme/index.entry')
  }
])

export const componentChildRoutes = withPrefix('/:lang/:theme/components', [
  // components
  {
    path: '/n-layout',
    component: () => import('../../src/layout/demos/index.entry')
  },
  {
    path: '/n-gradient-text',
    component: () => import('../../src/gradient-text/demos/index.entry')
  },
  {
    path: '/n-icon',
    component: () => import('../../src/icon/demos/index.entry')
  },
  {
    path: '/n-checkbox',
    component: () => import('../../src/checkbox/demos/index.entry')
  },
  {
    path: '/n-button',
    component: () => import('../../src/button/demos/index.entry')
  },
  {
    path: '/n-switch',
    component: () => import('../../src/switch/demos/index.entry')
  },
  {
    path: '/n-data-table',
    component: () => import('../../src/data-table/demos/index.entry')
  },
  {
    path: '/n-input',
    component: () => import('../../src/input/demos/index.entry')
  },
  {
    path: '/n-select',
    component: () => import('../../src/select/demos/index.entry')
  },
  {
    path: '/n-cascader',
    component: () => import('../../src/cascader/demos/index.entry')
  },
  {
    path: '/n-dynamic-input',
    component: () => import('../../src/dynamic-input/demos/index.entry')
  },
  {
    path: '/n-modal',
    component: () => import('../../src/modal/demos/index.entry')
  },
  {
    path: '/n-message',
    component: () => import('../../src/message/demos/index.entry')
  },
  {
    path: '/n-tooltip',
    component: () => import('../../src/tooltip/demos/index.entry')
  },
  {
    path: '/n-popover',
    component: () => import('../../src/popover/demos/index.entry')
  },
  {
    path: '/n-notification',
    component: () => import('../../src/notification/demos/index.entry')
  },
  {
    path: '/n-pagination',
    component: () => import('../../src/pagination/demos/index.entry')
  },
  {
    path: '/n-alert',
    component: () => import('../../src/alert/demos/index.entry')
  },
  {
    path: '/n-date-picker',
    component: () => import('../../src/date-picker/demos/index.entry')
  },
  {
    path: '/n-input-number',
    component: () => import('../../src/input-number/demos/index.entry')
  },
  {
    path: '/n-radio',
    component: () => import('../../src/radio/demos/index.entry')
  },
  {
    path: '/n-form',
    component: () => import('../../src/form/demos/index.entry')
  },
  {
    path: '/n-tabs',
    component: () => import('../../src/tabs/demos/index.entry')
  },
  {
    path: '/n-time-picker',
    component: () => import('../../src/time-picker/demos/index.entry')
  },
  {
    path: '/n-dialog',
    component: () => import('../../src/dialog/demos/index.entry')
  },
  {
    path: '/n-badge',
    component: () => import('../../src/badge/demos/index.entry')
  },
  {
    path: '/n-steps',
    component: () => import('../../src/steps/demos/index.entry')
  },
  {
    path: '/n-collapse',
    component: () => import('../../src/collapse/demos/index.entry')
  },
  {
    path: '/n-progress',
    component: () => import('../../src/progress/demos/index.entry')
  },
  {
    path: '/n-tag',
    component: () => import('../../src/tag/demos/index.entry')
  },
  {
    path: '/n-menu',
    component: () => import('../../src/menu/demos/index.entry')
  },
  {
    path: '/n-timeline',
    component: () => import('../../src/timeline/demos/index.entry')
  },
  {
    path: '/n-back-top',
    component: () => import('../../src/back-top/demos/index.entry')
  },
  {
    path: '/n-divider',
    component: () => import('../../src/divider/demos/index.entry')
  },
  {
    path: '/n-popconfirm',
    component: () => import('../../src/popconfirm/demos/index.entry')
  },
  {
    path: '/n-anchor',
    component: () => import('../../src/anchor/demos/index.entry')
  },
  {
    path: '/n-dropdown',
    component: () => import('../../src/dropdown/demos/index.entry')
  },
  {
    path: '/n-popselect',
    component: () => import('../../src/popselect/demos/index.entry')
  },
  {
    path: '/n-config-provider',
    component: () => import('../../src/config-provider/demos/index.entry')
  },
  {
    path: '/n-transfer',
    component: () => import('../../src/transfer/demos/index.entry')
  },
  {
    path: '/n-spin',
    component: () => import('../../src/spin/demos/index.entry')
  },
  {
    path: '/n-drawer',
    component: () => import('../../src/drawer/demos/index.entry')
  },
  {
    path: '/n-loading-bar',
    component: () => import('../../src/loading-bar/demos/index.entry')
  },
  {
    path: '/n-time',
    component: () => import('../../src/time/demos/index.entry')
  },
  {
    path: '/n-slider',
    component: () => import('../../src/slider/demos/index.entry')
  },
  {
    path: '/n-tree',
    component: () => import('../../src/tree/demos/index.entry')
  },
  {
    path: '/n-affix',
    component: () => import('../../src/affix/demos/index.entry')
  },
  {
    path: '/n-statistic',
    component: () => import('../../src/statistic/demos/index.entry')
  },
  {
    path: '/n-legacy-grid',
    component: () => import('../../src/legacy-grid/demos/index.entry')
  },
  {
    path: '/n-grid',
    component: () => import('../../src/grid/demos/index.entry')
  },
  {
    path: '/n-breadcrumb',
    component: () => import('../../src/breadcrumb/demos/index.entry')
  },
  {
    path: '/n-descriptions',
    component: () => import('../../src/descriptions/demos/index.entry')
  },
  {
    path: '/n-list',
    component: () => import('../../src/list/demos/index.entry')
  },
  {
    path: '/n-card',
    component: () => import('../../src/card/demos/index.entry')
  },
  {
    path: '/n-avatar',
    component: () => import('../../src/avatar/demos/index.entry')
  },
  {
    path: '/n-result',
    component: () => import('../../src/result/demos/index.entry')
  },
  {
    path: '/n-thing',
    component: () => import('../../src/thing/demos/index.entry')
  },
  {
    path: '/n-auto-complete',
    component: () => import('../../src/auto-complete/demos/index.entry')
  },
  {
    path: '/n-empty',
    component: () => import('../../src/empty/demos/index.entry')
  },
  {
    path: '/n-element',
    component: () => import('../../src/element/demos/index.entry')
  },
  {
    path: '/n-log',
    component: () => import('../../src/log/demos/index.entry')
  },
  {
    path: '/n-code',
    component: () => import('../../src/code/demos/index.entry')
  },
  {
    path: '/n-typography',
    component: () => import('../../src/typography/demos/index.entry')
  },
  {
    path: '/n-upload',
    component: () => import('../../src/upload/demos/index.entry')
  },
  {
    path: '/n-table',
    component: () => import('../../src/table/demos/index.entry')
  },
  {
    path: '/n-space',
    component: () => import('../../src/space/demos/index.entry')
  },
  {
    path: '/n-rate',
    component: () => import('../../src/rate/demos/index.entry')
  },
  {
    path: '/n-dynamic-tags',
    component: () => import('../../src/dynamic-tags/demos/index.entry')
  },
  // deprecated
  {
    path: '/n-nimbus-service-layout',
    component: () =>
      import('../pages/docs/deprecated/nimbus-service-layout/index.entry')
  }
])

export const routes = [
  {
    name: 'home',
    path: '/:lang/:theme',
    component: () => import('../pages/home/index.vue')
  },
  {
    name: 'docs',
    path: '/:lang/:theme/docs',
    component: () => import('../pages/Layout.vue'),
    children: docChildRoutes
  },
  {
    name: 'components',
    path: '/:lang/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: componentChildRoutes
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
      params: {
        lang: 'zh-CN',
        theme: 'os-theme'
      }
    }
  }
]
