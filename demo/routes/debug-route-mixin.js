import routerDebug from '../debug-components/routerDebug'
import modalDebug from '../debug-components/modalDebug'
import datePickerDebug from '../debug-components/datePickerDebug'
import backTopDebug from '../debug-components/backTopDebug'
import suffixDebug from '../debug-components/suffixDebug'
import cascaderDebug from '../debug-components/cascaderDebug'
import verticalAlignDebug from '../debug-components/verticalAlignDebug'
import iconTransitionDebug from '../debug-components/iconTransitionDebug'
import selectDebug from '../debug-components/selectDebug'
import popoverDebug from '../debug-components/popoverDebug'
import scrollbarDebug from '../debug-components/scrollbarDebug'
import scrollbarDebug2 from '../debug-components/scrollbarDebug2'

import { withPrefix } from './utils'

const rootDebugRoutes = [
  { path: '/n-popover-debug', component: popoverDebug },
  { path: '/n-back-top-debug', component: backTopDebug },
  { path: '/n-cascader-debug', component: cascaderDebug }
]

const childDebugRoutes = [
  { path: '/n-scrollbar-debug2', component: scrollbarDebug2 },
  { path: '/n-date-picker-debug', component: datePickerDebug },
  { path: '/n--debug', component: suffixDebug },
  { path: '/n-vertical-align-debug', component: verticalAlignDebug },
  { path: '/n-icon-transition-debug', component: iconTransitionDebug },
  { path: '/n-select-debug', component: selectDebug },
  { path: '/n-router-debug', component: routerDebug },
  { path: '/n-modal-debug', component: modalDebug },
  { path: '/n-scrollbar-debug', component: scrollbarDebug }
]

export default function debugRouteMixin (routes, childRoutes) {
  childRoutes.unshift(...withPrefix('/:lang/:theme/doc', childDebugRoutes))
  // routes[0].children[1].children = childRoutes
  routes.unshift(...rootDebugRoutes)
}
