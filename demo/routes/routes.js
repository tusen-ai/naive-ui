export const enDocRoutes = [
  // basic docs
  {
    path: 'introduction',
    component: () => import('../pages/docs/introduction/enUS/index.md')
  },
  {
    path: 'installation',
    component: () => import('../pages/docs/installation/enUS/index.md')
  },
  {
    path: 'usage-sfc',
    component: () => import('../pages/docs/usage-sfc/enUS/index.md')
  },
  {
    path: 'supported-platforms',
    component: () => import('../pages/docs/supported-platforms/enUS/index.md')
  },
  // {
  //   path: 'from-v1',
  //   component: () => import('../pages/docs/vue3/enUS/index.vue')
  // },
  // {
  //   path: 'experimental-features',
  //   component: () => import('../pages/docs/experimental-features/enUS/index.md')
  // },
  {
    path: 'customize-theme',
    component: () => import('../pages/docs/customize-theme/enUS/index.md')
  },
  {
    path: 'community',
    component: () => import('../pages/docs/community/enUS/index.md')
  },
  {
    path: 'i18n',
    component: () => import('../pages/docs/i18n/enUS/index.md')
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
  },
  {
    path: 'ssr',
    component: () => import('../pages/docs/ssr/enUS/index.md')
  },
  {
    path: 'common-issues',
    component: () => import('../pages/docs/common-issues/enUS/index.md')
  },
  {
    path: 'fonts',
    component: () => import('../pages/docs/fonts/enUS/index.md')
  },
  {
    path: 'import-on-demand',
    component: () => import('../pages/docs/import-on-demand/enUS/index.md')
  },
  {
    path: 'style-conflict',
    component: () => import('../pages/docs/style-conflict/enUS/index.md')
  },
  {
    path: 'controlled-uncontrolled',
    component: () =>
      import('../pages/docs/controlled-uncontrolled/enUS/index.md')
  },
  {
    path: 'umd',
    component: () => import('../pages/docs/umd/enUS/index.md')
  }
]

export const zhDocRoutes = [
  // basic docs
  {
    path: 'introduction',
    component: () => import('../pages/docs/introduction/zhCN/index.md')
  },
  {
    path: 'installation',
    component: () => import('../pages/docs/installation/zhCN/index.md')
  },
  {
    path: 'usage-sfc',
    component: () => import('../pages/docs/usage-sfc/zhCN/index.md')
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
    path: 'customize-theme',
    component: () => import('../pages/docs/customize-theme/zhCN/index.md')
  },
  {
    path: 'community',
    component: () => import('../pages/docs/community/zhCN/index.md')
  },
  {
    path: 'i18n',
    component: () => import('../pages/docs/i18n/zhCN/index.md')
  },
  // {
  //   path: 'experimental-features',
  //   component: () => import('../pages/docs/experimental-features/zhCN/index.md')
  // },
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
  },
  {
    path: 'ssr',
    component: () => import('../pages/docs/ssr/zhCN/index.md')
  },
  {
    path: 'common-issues',
    component: () => import('../pages/docs/common-issues/zhCN/index.md')
  },
  {
    path: 'fonts',
    component: () => import('../pages/docs/fonts/zhCN/index.md')
  },
  {
    path: 'import-on-demand',
    component: () => import('../pages/docs/import-on-demand/zhCN/index.md')
  },
  {
    path: 'style-conflict',
    component: () => import('../pages/docs/style-conflict/zhCN/index.md')
  },
  {
    path: 'controlled-uncontrolled',
    component: () =>
      import('../pages/docs/controlled-uncontrolled/zhCN/index.md')
  },
  {
    path: 'umd',
    component: () => import('../pages/docs/umd/zhCN/index.md')
  }
]

export const enComponentRoutes = [
  // components
  {
    path: 'layout',
    component: () => import('../../src/layout/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'gradient-text',
    component: () =>
      import('../../src/gradient-text/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'icon',
    component: () => import('../../src/icon/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'checkbox',
    component: () => import('../../src/checkbox/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'button',
    component: () => import('../../src/button/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'switch',
    component: () => import('../../src/switch/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'data-table',
    component: () =>
      import('../../src/data-table/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'input',
    component: () => import('../../src/input/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'select',
    component: () => import('../../src/select/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'cascader',
    component: () => import('../../src/cascader/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dynamic-input',
    component: () =>
      import('../../src/dynamic-input/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'modal',
    component: () => import('../../src/modal/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'message',
    component: () => import('../../src/message/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tooltip',
    component: () => import('../../src/tooltip/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'popover',
    component: () => import('../../src/popover/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'notification',
    component: () =>
      import('../../src/notification/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'pagination',
    component: () =>
      import('../../src/pagination/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'alert',
    component: () => import('../../src/alert/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'date-picker',
    component: () =>
      import('../../src/date-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'input-number',
    component: () =>
      import('../../src/input-number/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'radio',
    component: () => import('../../src/radio/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'form',
    component: () => import('../../src/form/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tabs',
    component: () => import('../../src/tabs/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'time-picker',
    component: () =>
      import('../../src/time-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dialog',
    component: () => import('../../src/dialog/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'badge',
    component: () => import('../../src/badge/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'steps',
    component: () => import('../../src/steps/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'collapse',
    component: () => import('../../src/collapse/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'progress',
    component: () => import('../../src/progress/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tag',
    component: () => import('../../src/tag/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'menu',
    component: () => import('../../src/menu/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'timeline',
    component: () => import('../../src/timeline/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'back-top',
    component: () => import('../../src/back-top/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'divider',
    component: () => import('../../src/divider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'popconfirm',
    component: () =>
      import('../../src/popconfirm/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'anchor',
    component: () => import('../../src/anchor/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dropdown',
    component: () => import('../../src/dropdown/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'popselect',
    component: () =>
      import('../../src/popselect/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'config-provider',
    component: () =>
      import('../../src/config-provider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'transfer',
    component: () => import('../../src/transfer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'legacy-transfer',
    component: () =>
      import('../../src/legacy-transfer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'spin',
    component: () => import('../../src/spin/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'drawer',
    component: () => import('../../src/drawer/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'loading-bar',
    component: () =>
      import('../../src/loading-bar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'time',
    component: () => import('../../src/time/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'slider',
    component: () => import('../../src/slider/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tree',
    component: () => import('../../src/tree/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'affix',
    component: () => import('../../src/affix/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'statistic',
    component: () =>
      import('../../src/statistic/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'legacy-grid',
    component: () =>
      import('../../src/legacy-grid/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'grid',
    component: () => import('../../src/grid/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'breadcrumb',
    component: () =>
      import('../../src/breadcrumb/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'descriptions',
    component: () =>
      import('../../src/descriptions/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'list',
    component: () => import('../../src/list/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'card',
    component: () => import('../../src/card/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'avatar',
    component: () => import('../../src/avatar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'result',
    component: () => import('../../src/result/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'thing',
    component: () => import('../../src/thing/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'auto-complete',
    component: () =>
      import('../../src/auto-complete/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'empty',
    component: () => import('../../src/empty/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'element',
    component: () => import('../../src/element/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'log',
    component: () => import('../../src/log/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'code',
    component: () => import('../../src/code/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'typography',
    component: () =>
      import('../../src/typography/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'upload',
    component: () => import('../../src/upload/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'table',
    component: () => import('../../src/table/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'space',
    component: () => import('../../src/space/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'rate',
    component: () => import('../../src/rate/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'dynamic-tags',
    component: () =>
      import('../../src/dynamic-tags/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'ellipsis',
    component: () => import('../../src/ellipsis/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'mention',
    component: () => import('../../src/mention/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'page-header',
    component: () =>
      import('../../src/page-header/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'global-style',
    component: () =>
      import('../../src/global-style/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'image',
    component: () => import('../../src/image/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'skeleton',
    component: () => import('../../src/skeleton/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'calendar',
    component: () => import('../../src/calendar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'color-picker',
    component: () =>
      import('../../src/color-picker/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'tree-select',
    component: () =>
      import('../../src/tree-select/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'carousel',
    component: () => import('../../src/carousel/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'collapse-transition',
    component: () =>
      import('../../src/collapse-transition/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'scrollbar',
    component: () =>
      import('../../src/scrollbar/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'countdown',
    component: () =>
      import('../../src/countdown/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'number-animation',
    component: () =>
      import('../../src/number-animation/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'watermark',
    component: () =>
      import('../../src/watermark/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'discrete',
    component: () => import('../../src/discrete/demos/enUS/index.demo-entry.md')
  },
  {
    path: 'equation',
    component: () => import('../../src/equation/demos/enUS/index.demo-entry.md')
  }
]

export const zhComponentRoutes = [
  // components
  {
    path: 'layout',
    component: () => import('../../src/layout/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'gradient-text',
    component: () =>
      import('../../src/gradient-text/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'icon',
    component: () => import('../../src/icon/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'checkbox',
    component: () => import('../../src/checkbox/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'button',
    component: () => import('../../src/button/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'switch',
    component: () => import('../../src/switch/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'data-table',
    component: () =>
      import('../../src/data-table/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'input',
    component: () => import('../../src/input/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'select',
    component: () => import('../../src/select/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'cascader',
    component: () => import('../../src/cascader/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'dynamic-input',
    component: () =>
      import('../../src/dynamic-input/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'modal',
    component: () => import('../../src/modal/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'message',
    component: () => import('../../src/message/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'tooltip',
    component: () => import('../../src/tooltip/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'popover',
    component: () => import('../../src/popover/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'notification',
    component: () =>
      import('../../src/notification/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'pagination',
    component: () =>
      import('../../src/pagination/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'alert',
    component: () => import('../../src/alert/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'date-picker',
    component: () =>
      import('../../src/date-picker/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'input-number',
    component: () =>
      import('../../src/input-number/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'radio',
    component: () => import('../../src/radio/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'form',
    component: () => import('../../src/form/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'tabs',
    component: () => import('../../src/tabs/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'time-picker',
    component: () =>
      import('../../src/time-picker/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'dialog',
    component: () => import('../../src/dialog/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'badge',
    component: () => import('../../src/badge/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'steps',
    component: () => import('../../src/steps/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'collapse',
    component: () => import('../../src/collapse/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'progress',
    component: () => import('../../src/progress/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'tag',
    component: () => import('../../src/tag/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'menu',
    component: () => import('../../src/menu/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'timeline',
    component: () => import('../../src/timeline/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'back-top',
    component: () => import('../../src/back-top/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'divider',
    component: () => import('../../src/divider/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'popconfirm',
    component: () =>
      import('../../src/popconfirm/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'anchor',
    component: () => import('../../src/anchor/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'dropdown',
    component: () => import('../../src/dropdown/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'popselect',
    component: () =>
      import('../../src/popselect/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'config-provider',
    component: () =>
      import('../../src/config-provider/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'transfer',
    component: () => import('../../src/transfer/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'legacy-transfer',
    component: () =>
      import('../../src/legacy-transfer/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'spin',
    component: () => import('../../src/spin/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'drawer',
    component: () => import('../../src/drawer/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'loading-bar',
    component: () =>
      import('../../src/loading-bar/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'time',
    component: () => import('../../src/time/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'slider',
    component: () => import('../../src/slider/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'tree',
    component: () => import('../../src/tree/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'affix',
    component: () => import('../../src/affix/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'statistic',
    component: () =>
      import('../../src/statistic/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'legacy-grid',
    component: () =>
      import('../../src/legacy-grid/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'grid',
    component: () => import('../../src/grid/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'breadcrumb',
    component: () =>
      import('../../src/breadcrumb/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'descriptions',
    component: () =>
      import('../../src/descriptions/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'list',
    component: () => import('../../src/list/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'card',
    component: () => import('../../src/card/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'avatar',
    component: () => import('../../src/avatar/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'result',
    component: () => import('../../src/result/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'thing',
    component: () => import('../../src/thing/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'auto-complete',
    component: () =>
      import('../../src/auto-complete/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'empty',
    component: () => import('../../src/empty/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'element',
    component: () => import('../../src/element/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'log',
    component: () => import('../../src/log/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'code',
    component: () => import('../../src/code/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'typography',
    component: () =>
      import('../../src/typography/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'upload',
    component: () => import('../../src/upload/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'table',
    component: () => import('../../src/table/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'space',
    component: () => import('../../src/space/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'rate',
    component: () => import('../../src/rate/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'dynamic-tags',
    component: () =>
      import('../../src/dynamic-tags/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'ellipsis',
    component: () => import('../../src/ellipsis/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'mention',
    component: () => import('../../src/mention/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'page-header',
    component: () =>
      import('../../src/page-header/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'global-style',
    component: () =>
      import('../../src/global-style/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'image',
    component: () => import('../../src/image/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'skeleton',
    component: () => import('../../src/skeleton/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'calendar',
    component: () => import('../../src/calendar/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'color-picker',
    component: () =>
      import('../../src/color-picker/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'tree-select',
    component: () =>
      import('../../src/tree-select/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'carousel',
    component: () => import('../../src/carousel/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'collapse-transition',
    component: () =>
      import('../../src/collapse-transition/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'scrollbar',
    component: () =>
      import('../../src/scrollbar/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'countdown',
    component: () =>
      import('../../src/countdown/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'number-animation',
    component: () =>
      import('../../src/number-animation/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'watermark',
    component: () =>
      import('../../src/watermark/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'discrete',
    component: () => import('../../src/discrete/demos/zhCN/index.demo-entry.md')
  },
  {
    path: 'equation',
    component: () => import('../../src/equation/demos/zhCN/index.demo-entry.md')
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
        lang: navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US',
        theme: 'os-theme'
      }
    }
  }
]
