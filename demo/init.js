import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import '../styles/index.scss'
import './styles/atom-one-dark-reasonable.scss'
import './styles/atom-one-light.scss'
import './styles/markdown.scss'
import './styles/font.scss'
import NaiveUI from '../index'
import VueI18n from 'vue-i18n'

import intro from './documentation/intro/intro'
import start from './documentation/intro/start'
import devGuildlines from './documentation/intro/devGuidelines'
import status from './documentation/intro/status'

import nimbusServiceLayoutDemo from './documentation/components/nimbusServiceLayoutDemo'
import homeDemo from './documentation/components/homeDemo'
import gradientText from './documentation/components/gradientText'
import checkbox from './documentation/components/checkbox'
import button from './documentation/components/button'
import switchDemo from './documentation/components/switch'
import input from './documentation/components/input'
import select from './documentation/components/select'
import cascader from './documentation/components/cascader'
import customInput from './documentation/components/customInput'
import modal from './documentation/components/modal'
import nimbusFormCardDemo from './documentation/components/nimbusFormCardDemo'
import message from './documentation/components/message'
import tooltip from './documentation/components/tooltip'
import popover from './documentation/components/popover'
import alert from './documentation/components/alert'
import datePicker from './documentation/components/datePicker'
import inputNumber from './documentation/components/inputNumber'
import radio from './documentation/components/radio'
import form from './documentation/components/form'
import tabs from './documentation/components/tabs'
import timePicker from './documentation/components/timePicker'
import confirm from './documentation/components/confirm'
import backTop from './documentation/components/backTop'
import dropdown from './documentation/components/dropdown'
import scrollbarDebug from './debugComponents/scrollbarDebug'
import scrollbarDebug2 from './debugComponents/scrollbarDebug2'
import badge from './documentation/components/badge'
import steps from './documentation/components/steps'
import notification from './documentation/components/notification'
import nimbusConfirmCardDemo from './documentation/components/nimbusConfirmCardDemo'
import pagination from './documentation/components/pagination'
import collapse from './documentation/components/collapse'
import tag from './documentation/components/tag'
import timeline from './documentation/components/timeline'
import progress from './documentation/components/progress'
import divider from './documentation/components/divider'
import popconfirm from './documentation/components/popconfirm'
import anchor from './documentation/components/anchor'
import popselect from './documentation/components/popselect'
import app from './documentation/components/app'
import advancedTable from './documentation/components/advancedTable'
import transfer from './documentation/components/transfer'
import spin from './documentation/components/spin'
import drawer from './documentation/components/drawer'
import loadingBar from './documentation/components/loadingBar'
import time from './documentation/components/time'
import slider from './documentation/components/slider'
import tree from './documentation/components/tree'
import affix from './documentation/components/affix'
import statistic from './documentation/components/statistic'
import grid from './documentation/components/grid'
import breadcrumb from './documentation/components/breadcrumb'
import themeConsumer from './documentation/components/themeConsumer'

import demo from './demo'
import ComponentDemo from './utils/ComponentDemo'
import ComponentDemos from './utils/ComponentDemos'
import ComponentDocumentation from './utils/ComponentDocumentation'
import DocumentationWrapper from './utils/DocumentationWrapper'
import './styles/ComponentDemo.scss'
import './styles/demo.scss'

import popoverDebug from './debugComponents/popoverDebug'
import routerDebug from './debugComponents/routerDebug'
import modalDebug from './debugComponents/modalDebug'
import datePickerDebug from './debugComponents/datePickerDebug'
import backTopDebug from './debugComponents/backTopDebug'
import cancelMarkDebug from './debugComponents/cancelMarkDebug'
import cascaderDebug from './debugComponents/cascaderDebug'
import verticalAlignDebug from './debugComponents/verticalAlignDebug'
import ThemeConsumer from '../packages/common/ThemeConsumer'

Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(NaiveUI)

const i18n = new VueI18n({
  locale: 'en-us'
})

Vue.component('ComponentDemo', ComponentDemo)
Vue.component('ComponentDemos', ComponentDemos)
Vue.component('DocumentationWrapper', DocumentationWrapper)
Vue.component('ComponentDocumentation', ComponentDocumentation)

const withPrefix = (prefix, routes) =>
  routes.map((route) => {
    route.path = prefix + route.path
    return route
  })

const routes = [
  {
    path: '/home-demo',
    component: homeDemo
  },
  {
    path: '/:lang/:theme/n-popover-debug',
    component: popoverDebug
  },
  {
    path: '/n-back-top-debug',
    component: backTopDebug
  },
  {
    path: '/n-cascader-debug',
    component: cascaderDebug
  },
  {
    path: '/:lang/:theme/start',
    component: demo,
    children: withPrefix('/:lang/:theme', [
      { path: '/intro', component: intro },
      { path: '/start', component: start },
      { path: '/dev-guildlines', component: devGuildlines },
      { path: '/status', component: status },
      { path: '/n-nimbus-service-layout', component: nimbusServiceLayoutDemo },
      { path: '/n-nimbus-home-layout', component: homeDemo },
      { path: '/n-gradient-text', component: gradientText },
      { path: '/n-icon', component: () => import('./documentation/components/icon') },
      { path: '/n-checkbox', component: checkbox },
      { path: '/n-button', component: button },
      { path: '/n-switch', component: switchDemo },
      // { path: '/n-table', component: tableDemo },
      { path: '/n-advance-table', component: advancedTable },
      { path: '/n-input', component: input },
      { path: '/n-select', component: select },
      { path: '/n-cascader', component: cascader },
      { path: '/n-custom-input', component: customInput },
      { path: '/n-modal', component: modal },
      { path: '/n-nimbus-form-card', component: nimbusFormCardDemo },
      { path: '/n-message', component: message },
      { path: '/n-tooltip', component: tooltip },
      { path: '/n-popover', component: popover },
      { path: '/n-notification', component: notification },
      { path: '/n-nimbus-confirm-card', component: nimbusConfirmCardDemo },
      { path: '/n-pagination', component: pagination },
      { path: '/n-alert', component: alert },
      { path: '/n-date-picker', component: datePicker },
      { path: '/n-input-number', component: inputNumber },
      { path: '/n-radio', component: radio },
      { path: '/n-form', component: form},
      { path: '/n-tabs', component: tabs },
      { path: '/n-time-picker', component: timePicker },
      { path: '/n-confirm', component: confirm },
      { path: '/n-router-debug', component: routerDebug },
      { path: '/n-modal-debug', component: modalDebug },
      { path: '/n-scrollbar-debug', component: scrollbarDebug },
      { path: '/n-badge', component: badge },
      { path: '/n-steps', component: steps },
      { path: '/n-collapse', component: collapse },
      { path: '/n-progress', component: progress },
      { path: '/n-tag', component: tag },
      { path: '/n-timeline', component: timeline },
      { path: '/n-scrollbar-debug2', component: scrollbarDebug2 },
      { path: '/n-back-top', component: backTop },
      { path: '/n-date-picker-debug', component: datePickerDebug },
      { path: '/n-divider', component: divider },
      { path: '/n-popconfirm', component: popconfirm },
      { path: '/n-anchor', component: anchor },
      { path: '/n-dropdown', component: dropdown },
      { path: '/n-popselect', component: popselect },
      { path: '/n-app', component: app },
      { path: '/n-cancel-mark-debug', component: cancelMarkDebug },
      { path: '/n-transfer', component: transfer },
      { path: '/n-spin', component: spin },
      { path: '/n-drawer', component: drawer },
      { path: '/n-loading-bar', component: loadingBar },
      { path: '/n-time', component: time },
      { path: '/n-slider', component: slider },
      { path: '/n-tree', component: tree },
      { path: '/n-vertical-align-debug', component: verticalAlignDebug },
      { path: '/n-affix', component: affix },
      { path: '/n-statistic', component: statistic },
      { path: '/n-grid', component: grid },
      { path: '/n-breadcrumb', component: breadcrumb },
      { path: '/n-theme-consumer', component: themeConsumer }
    ])
  },
  {
    path: '/*',
    redirect: '/en-us/dark/start'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(function (to, from, next) {
  Vue.prototype.$NLoadingBar.theme = to.params.theme
  if (to.path !== from.path) {
    Vue.prototype.$NLoadingBar.start()
  }
  next()
})

router.afterEach(function (to, from) {
  if (to.path !== from.path) {
    Vue.prototype.$NLoadingBar.finish()
  }
})

export { Vue, router, i18n }
