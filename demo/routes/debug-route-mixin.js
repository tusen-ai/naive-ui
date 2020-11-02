import { withPrefix } from './utils'

const rootDebugRoutes = [
  { path: '/n-popover-debug', component: () => import('../debug-components/popoverDebug.vue') },
  { path: '/n-back-top-debug', component: () => import('../debug-components/backTopDebug/index.vue') },
  { path: '/n-cascader-debug', component: () => import('../debug-components/cascaderDebug/index.vue') }
]

const childDebugRoutes = [
  { path: '/n-scrollbar-debug2', component: () => import('../debug-components/scrollbarDebug2/index.vue') },
  { path: '/n-date-picker-debug', component: () => import('../debug-components/datePickerDebug/index.vue') },
  { path: '/n--debug', component: () => import('../debug-components/suffixDebug/index.vue') },
  { path: '/n-vertical-align-debug', component: () => import('../debug-components/verticalAlignDebug.vue') },
  { path: '/n-icon-transition-debug', component: () => import('../debug-components/iconTransitionDebug.vue') },
  { path: '/n-select-debug', component: () => import('../debug-components/selectDebug.vue') },
  { path: '/n-router-debug', component: () => import('../debug-components/routerDebug.vue') },
  { path: '/n-modal-debug', component: () => import('../debug-components/modalDebug/index.vue') },
  { path: '/n-scrollbar-debug', component: () => import('../debug-components/scrollbarDebug/index.vue') }
]

export default function debugRouteMixin (routes, childRoutes) {
  childRoutes.unshift(...withPrefix('/:lang/:theme/doc', childDebugRoutes))
  // routes[0].children[1].children = childRoutes
  routes.unshift(...rootDebugRoutes)
}
