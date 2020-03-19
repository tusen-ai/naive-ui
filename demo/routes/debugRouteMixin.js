import routerDebug from '../debugComponents/routerDebug'
import modalDebug from '../debugComponents/modalDebug'
import datePickerDebug from '../debugComponents/datePickerDebug'
import backTopDebug from '../debugComponents/backTopDebug'
import suffixDebug from '../debugComponents/suffixDebug'
import cascaderDebug from '../debugComponents/cascaderDebug'
import verticalAlignDebug from '../debugComponents/verticalAlignDebug'
import iconTransitionDebug from '../debugComponents/iconTransitionDebug'
import selectDebug from '../debugComponents/selectDebug'
import popoverDebug from '../debugComponents/popoverDebug'
import scrollbarDebug from '../debugComponents/scrollbarDebug'
import scrollbarDebug2 from '../debugComponents/scrollbarDebug2'

import { withPrefix } from './utils'

const RootDebugRoutes = [
  {
    path: '/n-popover-debug',
    component: popoverDebug
  },
  {
    path: '/n-back-top-debug',
    component: backTopDebug
  },
  {
    path: '/n-cascader-debug',
    component: cascaderDebug
  }
]

const ChildDebugRoutes = [
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
  routes.unshift(RootDebugRoutes)
  childRoutes.unshift(withPrefix('/:lang/:theme/doc', ChildDebugRoutes))
}
