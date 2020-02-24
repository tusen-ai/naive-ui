import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

import intro from './documentation/intro/intro'
import start from './documentation/intro/start'
import devGuildlines from './documentation/intro/devGuidelines'

import nimbusServiceLayoutDemo from './documentation/deprecated/nimbusServiceLayout'
import gradientText from './documentation/components/gradientText'
import checkbox from './documentation/components/checkbox'
import button from './documentation/components/button'
import nswitch from './documentation/components/switch'
import input from './documentation/components/input'
import select from './documentation/components/select'
import cascader from './documentation/components/cascader'
import customInput from './documentation/components/customInput'
import modal from './documentation/components/modal'
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
import badge from './documentation/components/badge'
import steps from './documentation/components/steps'
import notification from './documentation/components/notification'
import pagination from './documentation/components/pagination'
import collapse from './documentation/components/collapse'
import tag from './documentation/components/tag'
import menu from './documentation/components/menu'
import timeline from './documentation/components/timeline'
import progress from './documentation/components/progress'
import divider from './documentation/components/divider'
import popconfirm from './documentation/components/popconfirm'
import anchor from './documentation/components/anchor'
import popselect from './documentation/components/popselect'
import configProvider from './documentation/components/configProvider'
import dataTable from './documentation/components/dataTable'
import typography from './documentation/components/typography'
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
import configConsumer from './documentation/components/configConsumer'
import descriptions from './documentation/components/descriptions'
import list from './documentation/components/list'
import card from './documentation/components/card'
import layout from './documentation/components/layout'
import avatar from './documentation/components/avatar'
import result from './documentation/components/result'
import thing from './documentation/components/thing'
import autoComplete from './documentation/components/autoComplete'
import empty from './documentation/components/empty'
import theme from './documentation/theme'
import element from './documentation/components/element'
import log from './documentation/components/log'
import code from './documentation/components/code'
import upload from './documentation/components/upload'
import table from './documentation/components/table'

import demo from './demo'
import ComponentDemo from './utils/ComponentDemo'
import ComponentDemos from './utils/ComponentDemos'
import ComponentDocumentation from './utils/ComponentDocumentation'
import DocumentationWrapper from './utils/DocumentationWrapper'
import './styles/demo.scss'

import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import cpp from 'highlight.js/lib/languages/cpp'

const env = process.env.NODE_ENV
let routerDebug
let modalDebug
let datePickerDebug
let backTopDebug
let suffixDebug
let cascaderDebug
let verticalAlignDebug
let iconTransitionDebug
let selectDebug
let popoverDebug
let scrollbarDebug
let scrollbarDebug2
if (env === 'development') {
  routerDebug = () => ('./debugComponents/routerDebug')
  modalDebug = () => ('./debugComponents/modalDebug')
  datePickerDebug = () => ('./debugComponents/datePickerDebug')
  backTopDebug = () => ('./debugComponents/backTopDebug')
  suffixDebug = () => ('./debugComponents/suffixDebug')
  cascaderDebug = () => ('./debugComponents/cascaderDebug')
  verticalAlignDebug = () => ('./debugComponents/verticalAlignDebug')
  iconTransitionDebug = () => ('./debugComponents/iconTransitionDebug')
  selectDebug = () => ('./debugComponents/selectDebug')
  popoverDebug = () => ('./debugComponents/popoverDebug')
  scrollbarDebug = () => ('./debugComponents/scrollbarDebug')
  scrollbarDebug2 = () => ('./debugComponents/scrollbarDebug2')
}

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('naive-log', () => ({
  contains: [
    {
      className: 'number',
      begin: /\d+/
    }
  ]
}))

Vue.use(VueI18n)
Vue.use(VueRouter)

const i18n = new VueI18n({
  locale: 'en-US'
})

Vue.component('ComponentDemo', ComponentDemo)
Vue.component('ComponentDemos', ComponentDemos)
Vue.component('DocumentationWrapper', DocumentationWrapper)
Vue.component('ComponentDocumentation', ComponentDocumentation)

const withPrefix = (prefix, routes) =>
  routes.map(route => {
    route.path = prefix + route.path
    return route
  })

const routes = [
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
      { path: '/n-nimbus-service-layout', component: nimbusServiceLayoutDemo },
      { path: '/n-layout', component: layout },
      { path: '/n-gradient-text', component: gradientText },
      {
        path: '/n-icon',
        component: () => import('./documentation/components/icon')
      },
      { path: '/n-checkbox', component: checkbox },
      { path: '/n-button', component: button },
      { path: '/n-switch', component: nswitch },
      // { path: '/n-table', component: tableDemo },
      { path: '/n-data-table', component: dataTable },
      { path: '/n-input', component: input },
      { path: '/n-select', component: select },
      { path: '/n-cascader', component: cascader },
      { path: '/n-custom-input', component: customInput },
      { path: '/n-modal', component: modal },
      { path: '/n-message', component: message },
      { path: '/n-tooltip', component: tooltip },
      { path: '/n-popover', component: popover },
      { path: '/n-notification', component: notification },
      { path: '/n-pagination', component: pagination },
      { path: '/n-alert', component: alert },
      { path: '/n-date-picker', component: datePicker },
      { path: '/n-input-number', component: inputNumber },
      { path: '/n-radio', component: radio },
      { path: '/n-form', component: form },
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
      { path: '/n-menu', component: menu },
      { path: '/n-timeline', component: timeline },
      { path: '/n-scrollbar-debug2', component: scrollbarDebug2 },
      { path: '/n-back-top', component: backTop },
      { path: '/n-date-picker-debug', component: datePickerDebug },
      { path: '/n-divider', component: divider },
      { path: '/n-popconfirm', component: popconfirm },
      { path: '/n-anchor', component: anchor },
      { path: '/n-dropdown', component: dropdown },
      { path: '/n-popselect', component: popselect },
      { path: '/n-config-provider', component: configProvider },
      { path: '/n--debug', component: suffixDebug },
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
      { path: '/n-config-consumer', component: configConsumer },
      { path: '/n-descriptions', component: descriptions },
      { path: '/n-list', component: list },
      { path: '/n-card', component: card },
      { path: '/n-avatar', component: avatar },
      { path: '/n-result', component: result },
      { path: '/n-thing', component: thing },
      { path: '/n-auto-complete', component: autoComplete },
      { path: '/n-empty', component: empty },
      { path: '/n-theme', component: theme },
      { path: '/n-element', component: element },
      { path: '/n-log', component: log },
      { path: '/n-code', component: code },
      { path: '/n-typography', component: typography },
      { path: '/n-upload', component: upload },
      { path: '/n-table', component: table },
      {
        path: '/n-icon-transition-debug',
        component: iconTransitionDebug
      },
      { path: '/n-select-debug', component: selectDebug }
    ])
  },
  {
    path: '/*',
    redirect: '/zh-CN/light/start'
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

export { Vue, router, i18n, hljs }
