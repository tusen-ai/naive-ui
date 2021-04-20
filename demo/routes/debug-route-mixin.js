const rootDebugRoutes = [
  {
    path: '/popover-debug',
    component: () => import('../debug-pages/popoverDebug.vue')
  },
  {
    path: '/back-top-debug',
    component: () => import('../debug-pages/backTopDebug/index.vue')
  },
  {
    path: '/cascader-debug',
    component: () => import('../debug-pages/cascaderDebug/index.vue')
  }
]

const childDebugRoutes = [
  {
    path: 'scrollbar-debug2',
    component: () => import('../debug-pages/scrollbarDebug2/index.vue')
  },
  {
    path: 'date-picker-debug',
    component: () => import('../debug-pages/datePickerDebug/index.vue')
  },
  {
    path: 'suffix-debug',
    component: () => import('../debug-pages/suffixDebug/index.vue')
  },
  {
    path: 'vertical-align-debug',
    component: () => import('../debug-pages/verticalAlignDebug.vue')
  },
  {
    path: 'icon-transition-debug',
    component: () => import('../debug-pages/iconTransitionDebug.vue')
  },
  {
    path: 'select-debug',
    component: () => import('../debug-pages/selectDebug.vue')
  },
  {
    path: 'router-debug',
    component: () => import('../debug-pages/routerDebug.vue')
  },
  {
    path: 'modal-debug',
    component: () => import('../debug-pages/modalDebug/index.vue')
  },
  {
    path: 'scrollbar-debug',
    component: () => import('../debug-pages/scrollbarDebug/index.vue')
  }
]

export default function debugRouteMixin (routes, childRoutes) {
  childRoutes.push(...childDebugRoutes)
  routes.push(...rootDebugRoutes)
}
