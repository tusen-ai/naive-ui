import { withPrefix } from './utils'

export const childRoutes = withPrefix('/:lang/:theme/doc', [
  // basic docs
  { path: '/intro', component: () => import('../documentation/intro/intro/index.entry') },
  { path: '/start', component: () => import('../documentation/intro/start/index.entry') },
  { path: '/from-v1', component: () => import('../documentation/intro/vue3/index.entry') },
  { path: '/experimental-features', component: () => import('../documentation/intro/experimental-features/index.entry') },
  { path: '/changelog', component: () => import('../documentation/intro/changelog/index.entry') },
  { path: '/dev-guidelines', component: () => import('../documentation/intro/dev-guidelines/index.entry') },
  { path: '/n-theme', component: () => import('../documentation/theme/index.entry') },
  // components
  { path: '/n-layout', component: () => import('../documentation/components/layout/index.entry') },
  { path: '/n-gradient-text', component: () => import('../documentation/components/gradient-text/index.entry') },
  { path: '/n-icon', component: () => import('../documentation/components/icon/index.entry') },
  { path: '/n-checkbox', component: () => import('../documentation/components/checkbox/index.entry') },
  { path: '/n-button', component: () => import('../documentation/components/button/index.entry') },
  { path: '/n-switch', component: () => import('../documentation/components/switch/index.entry') },
  { path: '/n-data-table', component: () => import('../documentation/components/data-table/index.entry') },
  { path: '/n-input', component: () => import('../documentation/components/input/index.entry') },
  { path: '/n-select', component: () => import('../documentation/components/select/index.entry') },
  { path: '/n-cascader', component: () => import('../documentation/components/cascader/index.entry') },
  { path: '/n-dynamic-input', component: () => import('../documentation/components/dynamic-input/index.entry') },
  { path: '/n-modal', component: () => import('../documentation/components/modal/index.entry') },
  { path: '/n-message', component: () => import('../documentation/components/message/index.entry') },
  { path: '/n-tooltip', component: () => import('../documentation/components/tooltip/index.entry') },
  { path: '/n-popover', component: () => import('../documentation/components/popover/index.entry') },
  { path: '/n-notification', component: () => import('../documentation/components/notification/index.entry') },
  { path: '/n-pagination', component: () => import('../documentation/components/pagination/index.entry') },
  { path: '/n-alert', component: () => import('../documentation/components/alert/index.entry') },
  { path: '/n-date-picker', component: () => import('../documentation/components/date-picker/index.entry') },
  { path: '/n-input-number', component: () => import('../documentation/components/input-number/index.entry') },
  { path: '/n-radio', component: () => import('../documentation/components/radio/index.entry') },
  { path: '/n-form', component: () => import('../documentation/components/form/index.entry') },
  { path: '/n-tabs', component: () => import('../documentation/components/tabs/index.entry') },
  { path: '/n-time-picker', component: () => import('../documentation/components/time-picker/index.entry') },
  { path: '/n-dialog', component: () => import('../documentation/components/dialog/index.entry') },
  { path: '/n-badge', component: () => import('../documentation/components/badge/index.entry') },
  { path: '/n-steps', component: () => import('../documentation/components/steps/index.entry') },
  { path: '/n-collapse', component: () => import('../documentation/components/collapse/index.entry') },
  { path: '/n-progress', component: () => import('../documentation/components/progress/index.entry') },
  { path: '/n-tag', component: () => import('../documentation/components/tag/index.entry') },
  { path: '/n-menu', component: () => import('../documentation/components/menu/index.entry') },
  { path: '/n-timeline', component: () => import('../documentation/components/timeline/index.entry') },
  { path: '/n-back-top', component: () => import('../documentation/components/back-top/index.entry') },
  { path: '/n-divider', component: () => import('../documentation/components/divider/index.entry') },
  { path: '/n-popconfirm', component: () => import('../documentation/components/popconfirm/index.entry') },
  { path: '/n-anchor', component: () => import('../documentation/components/anchor/index.entry') },
  { path: '/n-dropdown', component: () => import('../documentation/components/dropdown/index.entry') },
  { path: '/n-popselect', component: () => import('../documentation/components/popselect/index.entry') },
  { path: '/n-config-provider', component: () => import('../documentation/components/config-provider/index.entry') },
  { path: '/n-transfer', component: () => import('../documentation/components/transfer/index.entry') },
  { path: '/n-spin', component: () => import('../documentation/components/spin/index.entry') },
  { path: '/n-drawer', component: () => import('../documentation/components/drawer/index.entry') },
  { path: '/n-loading-bar', component: () => import('../documentation/components/loading-bar/index.entry') },
  { path: '/n-time', component: () => import('../documentation/components/time/index.entry') },
  { path: '/n-slider', component: () => import('../documentation/components/slider/index.entry') },
  { path: '/n-tree', component: () => import('../documentation/components/tree/index.entry') },
  { path: '/n-affix', component: () => import('../documentation/components/affix/index.entry') },
  { path: '/n-statistic', component: () => import('../documentation/components/statistic/index.entry') },
  { path: '/n-grid', component: () => import('../documentation/components/grid/index.entry') },
  { path: '/n-breadcrumb', component: () => import('../documentation/components/breadcrumb/index.entry') },
  { path: '/n-config-consumer', component: () => import('../documentation/components/config-consumer/index.entry') },
  { path: '/n-descriptions', component: () => import('../documentation/components/descriptions/index.entry') },
  { path: '/n-list', component: () => import('../documentation/components/list/index.entry') },
  { path: '/n-card', component: () => import('../documentation/components/card/index.entry') },
  { path: '/n-avatar', component: () => import('../documentation/components/avatar/index.entry') },
  { path: '/n-result', component: () => import('../documentation/components/result/index.entry') },
  { path: '/n-thing', component: () => import('../documentation/components/thing/index.entry') },
  { path: '/n-auto-complete', component: () => import('../documentation/components/auto-complete/index.entry') },
  { path: '/n-empty', component: () => import('../documentation/components/empty/index.entry') },
  { path: '/n-element', component: () => import('../documentation/components/element/index.entry') },
  { path: '/n-log', component: () => import('../documentation/components/log/index.entry') },
  { path: '/n-code', component: () => import('../documentation/components/code/index.entry') },
  { path: '/n-typography', component: () => import('../documentation/components/typography/index.entry') },
  { path: '/n-upload', component: () => import('../documentation/components/upload/index.entry') },
  { path: '/n-table', component: () => import('../documentation/components/table/index.entry') },
  { path: '/n-space', component: () => import('../documentation/components/space/index.entry') },
  { path: '/n-rate', component: () => import('../documentation/components/rate/index.entry') },
  // deprecated
  { path: '/n-nimbus-service-layout', component: () => import('../documentation/deprecated/nimbus-service-layout/index.entry') }
])

export const routes = [
  {
    path: '/:lang/:theme',
    component: () => import('../SiteProvider.vue'),
    children: [
      {
        path: '/:lang/:theme',
        component: () => import('../documentation/landing/index.vue'),
        name: 'home'
      },
      {
        path: '/:lang/:theme/doc',
        component: () => import('../Documentation.vue'),
        children: childRoutes
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/zh-CN/os-theme'
  }
]
