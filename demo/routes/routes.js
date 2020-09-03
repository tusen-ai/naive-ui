
import LandingPage from '../documentation/landing'
import Entry from '../Entry'

import intro from '../documentation/intro/intro'
import start from '../documentation/intro/start'
// import devGuildlines from '../documentation/intro/devGuidelines'
import experimentalFeatures from '../documentation/intro/experimental-features'
import changelog from '../documentation/intro/changelog'

import nimbusServiceLayout from '../documentation/deprecated/nimbus-service-layout'
import gradientText from '../documentation/components/gradient-text'
import checkbox from '../documentation/components/checkbox'
import button from '../documentation/components/button'
import nswitch from '../documentation/components/switch'
import input from '../documentation/components/input'
import select from '../documentation/components/select'
import cascader from '../documentation/components/cascader'
import dynamicInput from '../documentation/components/dynamic-input'
import modal from '../documentation/components/modal'
import message from '../documentation/components/message'
import tooltip from '../documentation/components/tooltip'
import popover from '../documentation/components/popover'
import alert from '../documentation/components/alert'
import datePicker from '../documentation/components/date-picker'
import inputNumber from '../documentation/components/input-number'
import icon from '../documentation/components/icon'
import radio from '../documentation/components/radio'
import form from '../documentation/components/form'
import tabs from '../documentation/components/tabs'
import timePicker from '../documentation/components/time-picker'
import confirm from '../documentation/components/confirm'
import backTop from '../documentation/components/back-top'
import dropdown from '../documentation/components/dropdown'
import badge from '../documentation/components/badge'
import steps from '../documentation/components/steps'
import notification from '../documentation/components/notification'
import pagination from '../documentation/components/pagination'
import collapse from '../documentation/components/collapse'
import tag from '../documentation/components/tag'
import menu from '../documentation/components/menu'
import timeline from '../documentation/components/timeline'
import progress from '../documentation/components/progress'
import divider from '../documentation/components/divider'
import popconfirm from '../documentation/components/popconfirm'
import anchor from '../documentation/components/anchor'
import popselect from '../documentation/components/popselect'
import configProvider from '../documentation/components/config-provider'
import dataTable from '../documentation/components/data-table'
import typography from '../documentation/components/typography'
import transfer from '../documentation/components/transfer'
import spin from '../documentation/components/spin'
import drawer from '../documentation/components/drawer'
import loadingBar from '../documentation/components/loading-bar'
import time from '../documentation/components/time'
import slider from '../documentation/components/slider'
import tree from '../documentation/components/tree'
import affix from '../documentation/components/affix'
import statistic from '../documentation/components/statistic'
import grid from '../documentation/components/grid'
import breadcrumb from '../documentation/components/breadcrumb'
import configConsumer from '../documentation/components/config-consumer'
import descriptions from '../documentation/components/descriptions'
import list from '../documentation/components/list'
import card from '../documentation/components/card'
import layout from '../documentation/components/layout'
import avatar from '../documentation/components/avatar'
import result from '../documentation/components/result'
import thing from '../documentation/components/thing'
import autoComplete from '../documentation/components/auto-complete'
import empty from '../documentation/components/empty'
import theme from '../documentation/theme'
import element from '../documentation/components/element'
import log from '../documentation/components/log'
import code from '../documentation/components/code'
import upload from '../documentation/components/upload'
import table from '../documentation/components/table'

import DocEntry from '../DocEntry'

import { withPrefix } from './utils'

export const childRoutes = withPrefix('/:lang/:theme/doc', [
  // basic docs
  { path: '/intro', component: intro },
  { path: '/start', component: start },
  { path: '/experimental-features', component: experimentalFeatures },
  { path: '/changelog', component: changelog },
  // { path: '/dev-guildlines', component: devGuildlines },
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
  { path: '/n-confirm', component: confirm },
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
        component: DocEntry,
        children: childRoutes
      }
    ]
  },
  {
    path: '/*',
    redirect: '/zh-CN/os-theme'
  }
]
