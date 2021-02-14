import { withPrefix } from './utils'

const rootDebugRoutes = [
  {
    path: '/n-popover-debug',
    component: () => import('../debug-pages/popoverDebug.vue')
  },
  {
    path: '/n-back-top-debug',
    component: () => import('../debug-pages/backTopDebug/index.vue')
  },
  {
    path: '/n-cascader-debug',
    component: () => import('../debug-pages/cascaderDebug/index.vue')
  }
]

const childDebugRoutes = [
  {
    path: '/n-scrollbar-debug2',
    component: () => import('../debug-pages/scrollbarDebug2/index.vue')
  },
  {
    path: '/n-date-picker-debug',
    component: () => import('../debug-pages/datePickerDebug/index.vue')
  },
  {
    path: '/n--debug',
    component: () => import('../debug-pages/suffixDebug/index.vue')
  },
  {
    path: '/n-vertical-align-debug',
    component: () => import('../debug-pages/verticalAlignDebug.vue')
  },
  {
    path: '/n-icon-transition-debug',
    component: () => import('../debug-pages/iconTransitionDebug.vue')
  },
  {
    path: '/n-select-debug',
    component: () => import('../debug-pages/selectDebug.vue')
  },
  {
    path: '/n-router-debug',
    component: () => import('../debug-pages/routerDebug.vue')
  },
  {
    path: '/n-modal-debug',
    component: () => import('../debug-pages/modalDebug/index.vue')
  },
  {
    path: '/n-scrollbar-debug',
    component: () => import('../debug-pages/scrollbarDebug/index.vue')
  }
]

export default function debugRouteMixin (routes, childRoutes) {
  childRoutes.unshift(...withPrefix('/:lang/:theme/docs', childDebugRoutes))
  // routes[0].children[1].children = childRoutes
  routes.unshift(...rootDebugRoutes)
}
