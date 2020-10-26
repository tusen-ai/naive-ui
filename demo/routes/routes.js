
import LandingPage from '../documentation/landing/index.vue'
import Entry from '../SiteProvider.vue'

import intro from '../documentation/intro/intro/index.entry'
import start from '../documentation/intro/start/index.entry'
import devGuildlines from '../documentation/intro/dev-guidelines/index.entry'
import experimentalFeatures from '../documentation/intro/experimental-features/index.entry'
import changelog from '../documentation/intro/changelog/index.entry'

import nimbusServiceLayout from '../documentation/deprecated/nimbus-service-layout/index.entry'
import gradientText from '../documentation/components/gradient-text/index.entry'
import checkbox from '../documentation/components/checkbox/index.entry'
import button from '../documentation/components/button/index.entry'
import nswitch from '../documentation/components/switch/index.entry'
import input from '../documentation/components/input/index.entry'
import select from '../documentation/components/select/index.entry'
import cascader from '../documentation/components/cascader/index.entry'
import dynamicInput from '../documentation/components/dynamic-input/index.entry'
import modal from '../documentation/components/modal/index.entry'
import message from '../documentation/components/message/index.entry'
import tooltip from '../documentation/components/tooltip/index.entry'
import popover from '../documentation/components/popover/index.entry'
import alert from '../documentation/components/alert/index.entry'
import datePicker from '../documentation/components/date-picker/index.entry'
import inputNumber from '../documentation/components/input-number/index.entry'
import icon from '../documentation/components/icon/index.entry'
import radio from '../documentation/components/radio/index.entry'
import form from '../documentation/components/form/index.entry'
import tabs from '../documentation/components/tabs/index.entry'
import timePicker from '../documentation/components/time-picker/index.entry'
import dialog from '../documentation/components/dialog/index.entry'
import backTop from '../documentation/components/back-top/index.entry'
import dropdown from '../documentation/components/dropdown/index.entry'
import badge from '../documentation/components/badge/index.entry'
import steps from '../documentation/components/steps/index.entry'
import notification from '../documentation/components/notification/index.entry'
import pagination from '../documentation/components/pagination/index.entry'
import collapse from '../documentation/components/collapse/index.entry'
import tag from '../documentation/components/tag/index.entry'
import menu from '../documentation/components/menu/index.entry'
import timeline from '../documentation/components/timeline/index.entry'
import progress from '../documentation/components/progress/index.entry'
import divider from '../documentation/components/divider/index.entry'
import popconfirm from '../documentation/components/popconfirm/index.entry'
import anchor from '../documentation/components/anchor/index.entry'
import popselect from '../documentation/components/popselect/index.entry'
import configProvider from '../documentation/components/config-provider/index.entry'
import dataTable from '../documentation/components/data-table/index.entry'
import typography from '../documentation/components/typography/index.entry'
import transfer from '../documentation/components/transfer/index.entry'
import spin from '../documentation/components/spin/index.entry'
import drawer from '../documentation/components/drawer/index.entry'
import loadingBar from '../documentation/components/loading-bar/index.entry'
import time from '../documentation/components/time/index.entry'
import slider from '../documentation/components/slider/index.entry'
import tree from '../documentation/components/tree/index.entry'
import affix from '../documentation/components/affix/index.entry'
import statistic from '../documentation/components/statistic/index.entry'
import grid from '../documentation/components/grid/index.entry'
import breadcrumb from '../documentation/components/breadcrumb/index.entry'
import configConsumer from '../documentation/components/config-consumer/index.entry'
import descriptions from '../documentation/components/descriptions/index.entry'
import list from '../documentation/components/list/index.entry'
import card from '../documentation/components/card/index.entry'
import layout from '../documentation/components/layout/index.entry'
import avatar from '../documentation/components/avatar/index.entry'
import result from '../documentation/components/result/index.entry'
import thing from '../documentation/components/thing/index.entry'
import autoComplete from '../documentation/components/auto-complete/index.entry'
import empty from '../documentation/components/empty/index.entry'
import theme from '../documentation/theme/index.entry'
import element from '../documentation/components/element/index.entry'
import log from '../documentation/components/log/index.entry'
import code from '../documentation/components/code/index.entry'
import upload from '../documentation/components/upload/index.entry'
import table from '../documentation/components/table/index.entry'
import space from '../documentation/components/space/index.entry'
import rate from '../documentation/components/rate/index.entry'

import Documentation from '../Documentation.vue'

import { withPrefix } from './utils'

export const childRoutes = withPrefix('/:lang/:theme/doc', [
  // basic docs
  { path: '/intro', component: intro },
  { path: '/start', component: start },
  { path: '/experimental-features', component: experimentalFeatures },
  { path: '/changelog', component: changelog },
  { path: '/dev-guildlines', component: devGuildlines },
  // components
  { path: '/n-layout', component: layout },
  { path: '/n-gradient-text', component: gradientText },
  { path: '/n-icon', component: icon },
  { path: '/n-checkbox', component: checkbox },
  { path: '/n-button', component: button },
  { path: '/n-switch', component: nswitch },
  { path: '/n-data-table', component: dataTable },
  { path: '/n-input', component: input },
  { path: '/n-select', component: select },
  { path: '/n-cascader', component: cascader },
  { path: '/n-dynamic-input', component: dynamicInput },
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
  { path: '/n-dialog', component: dialog },
  { path: '/n-badge', component: badge },
  { path: '/n-steps', component: steps },
  { path: '/n-collapse', component: collapse },
  { path: '/n-progress', component: progress },
  { path: '/n-tag', component: tag },
  { path: '/n-menu', component: menu },
  { path: '/n-timeline', component: timeline },
  { path: '/n-back-top', component: backTop },
  { path: '/n-divider', component: divider },
  { path: '/n-popconfirm', component: popconfirm },
  { path: '/n-anchor', component: anchor },
  { path: '/n-dropdown', component: dropdown },
  { path: '/n-popselect', component: popselect },
  { path: '/n-config-provider', component: configProvider },
  { path: '/n-transfer', component: transfer },
  { path: '/n-spin', component: spin },
  { path: '/n-drawer', component: drawer },
  { path: '/n-loading-bar', component: loadingBar },
  { path: '/n-time', component: time },
  { path: '/n-slider', component: slider },
  { path: '/n-tree', component: tree },
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
  { path: '/n-space', component: space },
  { path: '/n-rate', component: rate },
  // deprecated
  { path: '/n-nimbus-service-layout', component: nimbusServiceLayout }
])

export const routes = [
  {
    path: '/:lang/:theme',
    component: Entry,
    children: [
      {
        path: '/:lang/:theme',
        component: LandingPage,
        name: 'home'
      },
      {
        path: '/:lang/:theme/doc',
        component: Documentation,
        children: childRoutes
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/zh-CN/os-theme'
  }
]
