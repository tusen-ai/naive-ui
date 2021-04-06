export const enDocRoutes = [
  // basic docs
  {
    path: 'installation',
    component: () => import('../pages/docs/installation/enUS/index.md')
  },
  {
    path: 'usage',
    component: () => import('../pages/docs/usage/enUS/index.md')
  },
  {
    path: 'supported-platforms',
    component: () => import('../pages/docs/supported-platforms/enUS/index.md')
  },
  {
    path: 'from-v1',
    component: () => import('../pages/docs/vue3/enUS/index.vue')
  },
  {
    path: 'experimental-features',
    component: () => import('../pages/docs/experimental-features/enUS/index.md')
  },
  {
    path: 'changelog',
    component: () => import('../pages/docs/changelog/enUS/index.vue')
  },
  {
    path: 'theme',
    component: () => import('../pages/docs/theme/enUS/index.demo-entry.md')
  },
  {
    path: 'jsx',
    component: () => import('../pages/docs/jsx/enUS/index.md')
  }
]

export const zhDocRoutes = [
  // basic docs
  {
    path: 'installation',
    component: () => import('../pages/docs/installation/zhCN/index.md')
  },
  {
    path: 'usage',
    component: () => import('../pages/docs/usage/zhCN/index.md')
  },
  {
    path: 'supported-platforms',
    component: () => import('../pages/docs/supported-platforms/zhCN/index.md')
  },
  {
    path: 'from-v1',
    component: () => import('../pages/docs/vue3/zhCN/index.vue')
  },
  {
    path: 'experimental-features',
    component: () => import('../pages/docs/experimental-features/zhCN/index.md')
  },
  {
    path: 'changelog',
    component: () => import('../pages/docs/changelog/zhCN/index.vue')
  },
  {
    path: 'theme',
    component: () => import('../pages/docs/theme/zhCN/index.demo-entry.md')
  },
  {
    path: 'jsx',
    component: () => import('../pages/docs/jsx/zhCN/index.md')
  }
]

export const enComponentRoutes = [
  // components
  {
    path: 'n-layout',
    component: () => import('../../src/layout/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-gradient-text',
    component: () =>
      import('../../src/gradient-text/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-icon',
    component: () => import('../../src/icon/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-checkbox',
    component: () => import('../../src/checkbox/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-button',
    component: () => import('../../src/button/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-switch',
    component: () => import('../../src/switch/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-data-table',
    component: () =>
      import('../../src/data-table/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-input',
    component: () => import('../../src/input/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-select',
    component: () => import('../../src/select/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-cascader',
    component: () => import('../../src/cascader/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-dynamic-input',
    component: () =>
      import('../../src/dynamic-input/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-modal',
    component: () => import('../../src/modal/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-message',
    component: () => import('../../src/message/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-tooltip',
    component: () => import('../../src/tooltip/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-popover',
    component: () => import('../../src/popover/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-notification',
    component: () =>
      import('../../src/notification/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-pagination',
    component: () =>
      import('../../src/pagination/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-alert',
    component: () => import('../../src/alert/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-date-picker',
    component: () =>
      import('../../src/date-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-input-number',
    component: () =>
      import('../../src/input-number/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-radio',
    component: () => import('../../src/radio/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-form',
    component: () => import('../../src/form/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-tabs',
    component: () => import('../../src/tabs/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-time-picker',
    component: () =>
      import('../../src/time-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-dialog',
    component: () => import('../../src/dialog/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-badge',
    component: () => import('../../src/badge/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-steps',
    component: () => import('../../src/steps/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-collapse',
    component: () => import('../../src/collapse/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-progress',
    component: () => import('../../src/progress/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-tag',
    component: () => import('../../src/tag/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-menu',
    component: () => import('../../src/menu/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-timeline',
    component: () => import('../../src/timeline/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-back-top',
    component: () => import('../../src/back-top/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-divider',
    component: () => import('../../src/divider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-popconfirm',
    component: () =>
      import('../../src/popconfirm/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-anchor',
    component: () => import('../../src/anchor/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-dropdown',
    component: () => import('../../src/dropdown/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-popselect',
    component: () =>
      import('../../src/popselect/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-config-provider',
    component: () =>
      import('../../src/config-provider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-transfer',
    component: () => import('../../src/transfer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-spin',
    component: () => import('../../src/spin/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-drawer',
    component: () => import('../../src/drawer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-loading-bar',
    component: () =>
      import('../../src/loading-bar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-time',
    component: () => import('../../src/time/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-slider',
    component: () => import('../../src/slider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-tree',
    component: () => import('../../src/tree/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-affix',
    component: () => import('../../src/affix/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-statistic',
    component: () =>
      import('../../src/statistic/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-legacy-grid',
    component: () =>
      import('../../src/legacy-grid/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-grid',
    component: () => import('../../src/grid/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-breadcrumb',
    component: () =>
      import('../../src/breadcrumb/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-descriptions',
    component: () =>
      import('../../src/descriptions/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-list',
    component: () => import('../../src/list/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-card',
    component: () => import('../../src/card/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-avatar',
    component: () => import('../../src/avatar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-result',
    component: () => import('../../src/result/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-thing',
    component: () => import('../../src/thing/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-auto-complete',
    component: () =>
      import('../../src/auto-complete/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-empty',
    component: () => import('../../src/empty/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-element',
    component: () => import('../../src/element/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-log',
    component: () => import('../../src/log/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-code',
    component: () => import('../../src/code/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-typography',
    component: () =>
      import('../../src/typography/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-upload',
    component: () => import('../../src/upload/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-table',
    component: () => import('../../src/table/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-space',
    component: () => import('../../src/space/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-rate',
    component: () => import('../../src/rate/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-dynamic-tags',
    component: () =>
      import('../../src/dynamic-tags/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-ellipsis',
    component: () => import('../../src/ellipsis/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-mention',
    component: () => import('../../src/mention/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-page-header',
    component: () =>
      import('../../src/page-header/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'n-global-style',
    component: () =>
      import('../../src/global-style/demos/enUS/index.demo-entry.md')
  },
  // deprecated
  {
    path: 'n-nimbus-service-layout',
    component: () =>
      import(
        '../pages/docs/deprecated/nimbus-service-layout/enUS/index.demo-entry.md'
      )
  }
]

export const zhComponentRoutes = [
  // components
  {
    path: 'n-layout',
    component: () => import('../../src/layout/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-gradient-text',
    component: () =>
      import('../../src/gradient-text/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-icon',
    component: () => import('../../src/icon/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-checkbox',
    component: () => import('../../src/checkbox/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-button',
    component: () => import('../../src/button/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-switch',
    component: () => import('../../src/switch/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-data-table',
    component: () =>
      import('../../src/data-table/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-input',
    component: () => import('../../src/input/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-select',
    component: () => import('../../src/select/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-cascader',
    component: () => import('../../src/cascader/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-dynamic-input',
    component: () =>
      import('../../src/dynamic-input/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-modal',
    component: () => import('../../src/modal/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-message',
    component: () => import('../../src/message/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-tooltip',
    component: () => import('../../src/tooltip/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-popover',
    component: () => import('../../src/popover/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-notification',
    component: () =>
      import('../../src/notification/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-pagination',
    component: () =>
      import('../../src/pagination/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-alert',
    component: () => import('../../src/alert/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-date-picker',
    component: () =>
      import('../../src/date-picker/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-input-number',
    component: () =>
      import('../../src/input-number/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-radio',
    component: () => import('../../src/radio/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-form',
    component: () => import('../../src/form/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-tabs',
    component: () => import('../../src/tabs/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-time-picker',
    component: () =>
      import('../../src/time-picker/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-dialog',
    component: () => import('../../src/dialog/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-badge',
    component: () => import('../../src/badge/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-steps',
    component: () => import('../../src/steps/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-collapse',
    component: () => import('../../src/collapse/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-progress',
    component: () => import('../../src/progress/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-tag',
    component: () => import('../../src/tag/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-menu',
    component: () => import('../../src/menu/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-timeline',
    component: () => import('../../src/timeline/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-back-top',
    component: () => import('../../src/back-top/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-divider',
    component: () => import('../../src/divider/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-popconfirm',
    component: () =>
      import('../../src/popconfirm/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-anchor',
    component: () => import('../../src/anchor/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-dropdown',
    component: () => import('../../src/dropdown/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-popselect',
    component: () =>
      import('../../src/popselect/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-config-provider',
    component: () =>
      import('../../src/config-provider/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-transfer',
    component: () => import('../../src/transfer/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-spin',
    component: () => import('../../src/spin/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-drawer',
    component: () => import('../../src/drawer/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-loading-bar',
    component: () =>
      import('../../src/loading-bar/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-time',
    component: () => import('../../src/time/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-slider',
    component: () => import('../../src/slider/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-tree',
    component: () => import('../../src/tree/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-affix',
    component: () => import('../../src/affix/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-statistic',
    component: () =>
      import('../../src/statistic/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-legacy-grid',
    component: () =>
      import('../../src/legacy-grid/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-grid',
    component: () => import('../../src/grid/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-breadcrumb',
    component: () =>
      import('../../src/breadcrumb/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-descriptions',
    component: () =>
      import('../../src/descriptions/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-list',
    component: () => import('../../src/list/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-card',
    component: () => import('../../src/card/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-avatar',
    component: () => import('../../src/avatar/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-result',
    component: () => import('../../src/result/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-thing',
    component: () => import('../../src/thing/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-auto-complete',
    component: () =>
      import('../../src/auto-complete/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-empty',
    component: () => import('../../src/empty/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-element',
    component: () => import('../../src/element/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-log',
    component: () => import('../../src/log/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-code',
    component: () => import('../../src/code/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-typography',
    component: () =>
      import('../../src/typography/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-upload',
    component: () => import('../../src/upload/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-table',
    component: () => import('../../src/table/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-space',
    component: () => import('../../src/space/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-rate',
    component: () => import('../../src/rate/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-dynamic-tags',
    component: () =>
      import('../../src/dynamic-tags/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-ellipsis',
    component: () => import('../../src/ellipsis/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-mention',
    component: () => import('../../src/mention/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-page-header',
    component: () =>
      import('../../src/page-header/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'n-global-style',
    component: () =>
      import('../../src/global-style/demos/zhCN/index.demo-entry.md')
  },
  // deprecated
  {
    path: 'n-nimbus-service-layout',
    component: () =>
      import(
        '../pages/docs/deprecated/nimbus-service-layout/zhCN/index.demo-entry.md'
      )
  }
]

export const routes = [
  {
    name: 'home',
    path: '/:lang/:theme',
    component: () => import('../pages/home/index.vue')
  },
  {
    name: 'enDocs',
    path: '/en-US/:theme/docs',
    component: () => import('../pages/Layout.vue'),
    children: enDocRoutes
  },
  {
    name: 'zhDocs',
    path: '/zh-CN/:theme/docs',
    component: () => import('../pages/Layout.vue'),
    children: zhDocRoutes
  },
  {
    name: 'enComponents',
    path: '/en-US/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: enComponentRoutes
  },
  {
    name: 'zhComponents',
    path: '/zh-CN/:theme/components',
    component: () => import('../pages/Layout.vue'),
    children: zhComponentRoutes
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
