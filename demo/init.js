import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import '../styles/index.scss'
import 'codemirror/lib/codemirror.css'
import './styles/atom-one-dark-reasonable.scss'
import './styles/atom-one-light.scss'
import './styles/markdown.scss'
import NaiveUI from '../index'
import SourceBlock from './SourceBlock'
import VueI18n from 'vue-i18n'
import nimbusServiceLayoutDemo from './components/nimbusServiceLayoutDemo'
import homeDemo from './components/homeDemo'
import gradientTextDemo from './components/gradientTextDemo'
import iconDemo from './components/iconDemo'
import checkboxDemo from './components/checkboxDemo'
import buttonDemo from './components/buttonDemo'
import switchDemo from './components/switchDemo'
import tableDemo from './components/tableDemo'
import inputDemo from './components/inputDemo'
import selectDemo from './components/selectDemo'
import cascaderDemo from './components/cascaderDemo'
import inputKeyValuePairsDemo from './components/inputKeyValuePairsDemo'
import modalDemo from './components/modalDemo'
import nimbusFormCardDemo from './components/nimbusFormCardDemo'
import messageDemo from './components/messageDemo'
import tooltipDemo from './components/tooltipDemo'
import popoverDemo from './components/popoverDemo'
import alertDemo from './components/alertDemo'
import datePickerDemo from './components/datePickerDemo'
import inputNumberDemo from './components/inputNumberDemo'
import nimbusIconDemo from './components/nimbusIconDemo'
import radioDemo from './components/radioDemo'
import formDemo from './components/formDemo'
import tabsDemo from './components/tabsDemo'
import timePickerDemo from './components/timePickerDemo'
import confirmDemo from './components/confirmDemo'
import backTopDemo from './components/backTopDemo'
import dropdownDemo from './components/dropdownDemo'
import scrollbarDebug from './debugComponents/scrollbarDebug'
import scrollbarDebug2 from './debugComponents/scrollbarDebug2'
import badgeDemo from './components/badgeDemo'
import stepsDemo from './components/stepsDemo'
import notificationDemo from './components/notificationDemo'
import nimbusConfirmCardDemo from './components/nimbusConfirmCardDemo'
import paginationDemo from './components/paginationDemo'
import startPage from './components/startPage'
import collapseDemo from './components/collapseDemo'
import tagDemo from './components/tagDemo'
import timelineDemo from './components/timelineDemo'
import progressDemo from './components/progressDemo'
import dividerDemo from './components/dividerDemo'
import popconfirmDemo from './components/popconfirmDemo'
import anchorDemo from './components/anchorDemo'
import popselectDemo from './components/popselectDemo'
import appDemo from './components/appDemo'
import advanceTableDemos from './components/advanceTableDemos'
import transferDemo from './components/transferDemo'
import spinDemo from './components/spinDemo'
import drawerDemo from './components/drawerDemo'
import loadingBarDemo from './components/loadingBarDemo'
import timeDemo from './components/timeDemo'
import sliderDemo from './components/sliderDemo'
import treeDemo from './components/treeDemo'

import demo from './demo'
import ComponentDemo from './utils/ComponentDemo'
import ComponentDemos from './utils/ComponentDemos'
import ComponentDocumentation from './utils/ComponentDocumentation'
import DocumentationWrapper from './utils/DocumentationWrapper'
import './styles/ComponentDemo.scss'

import popoverDebug from './debugComponents/popoverDebug'
import routerDebug from './debugComponents/routerDebug'
import modalDebug from './debugComponents/modalDebug'
import datePickerDebug from './debugComponents/datePickerDebug'
import backTopDebug from './debugComponents/backTopDebug'
import cancelMarkDebug from './debugComponents/cancelMarkDebug'
import cascaderDebug from './debugComponents/cascaderDebug'
import verticalAlignDebug from './debugComponents/verticalAlignDebug'

Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(NaiveUI)

const i18n = new VueI18n({
  locale: 'en-us'
})

Vue.component(SourceBlock.name, SourceBlock)
Vue.component('ComponentDemo', ComponentDemo)
Vue.component('ComponentDemos', ComponentDemos)
Vue.component('DocumentationWrapper', DocumentationWrapper)
Vue.component('ComponentDocumentation', ComponentDocumentation)

const routes = [
  {
    path: '/home-demo',
    component: homeDemo
  },
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
  },
  {
    path: '/start',
    component: demo,
    children: [
      { path: '/start', component: startPage },
      { path: '/n-nimbus-service-layout', component: nimbusServiceLayoutDemo },
      { path: '/n-nimbus-home-layout', component: homeDemo },
      { path: '/n-gradient-text', component: gradientTextDemo },
      { path: '/n-icon', component: iconDemo },
      { path: '/n-checkbox', component: checkboxDemo },
      { path: '/n-button', component: buttonDemo },
      { path: '/n-switch', component: switchDemo },
      { path: '/n-table', component: tableDemo },
      { path: '/n-advance-table', component: advanceTableDemos },
      // { path: '/n-advance-table', component: advanceTableDemo },
      { path: '/n-input', component: inputDemo },
      { path: '/n-select', component: selectDemo },
      { path: '/n-cascader', component: cascaderDemo },
      { path: '/n-InputKeyValuePairs', component: inputKeyValuePairsDemo },
      { path: '/n-modal', component: modalDemo },
      { path: '/n-nimbus-form-card', component: nimbusFormCardDemo },
      { path: '/n-message', component: messageDemo },
      { path: '/n-tooltip', component: tooltipDemo },
      { path: '/n-popover', component: popoverDemo },
      { path: '/n-notification', component: notificationDemo },
      { path: '/n-nimbus-confirm-card', component: nimbusConfirmCardDemo },
      { path: '/n-pagination', component: paginationDemo },
      { path: '/n-alert', component: alertDemo },
      { path: '/n-date-picker', component: datePickerDemo },
      { path: '/n-input-number', component: inputNumberDemo },
      { path: '/n-nimbus-icon', component: nimbusIconDemo },
      { path: '/n-radio', component: radioDemo },
      { path: '/n-form', component: formDemo },
      { path: '/n-tabs', component: tabsDemo },
      { path: '/n-time-picker', component: timePickerDemo },
      { path: '/n-confirm', component: confirmDemo },
      { path: '/n-router-debug', component: routerDebug },
      { path: '/n-modal-debug', component: modalDebug },
      { path: '/n-scrollbar-debug', component: scrollbarDebug },
      { path: '/n-badge', component: badgeDemo },
      { path: '/n-steps', component: stepsDemo },
      { path: '/n-collapse', component: collapseDemo },
      { path: '/n-progress', component: progressDemo },
      { path: '/n-tag', component: tagDemo },
      { path: '/n-timeline', component: timelineDemo },
      { path: '/n-scrollbar-debug2', component: scrollbarDebug2 },
      { path: '/n-back-top', component: backTopDemo },
      { path: '/n-date-picker-debug', component: datePickerDebug },
      { path: '/n-divider', component: dividerDemo },
      { path: '/n-popconfirm', component: popconfirmDemo },
      { path: '/n-anchor', component: anchorDemo },
      { path: '/n-dropdown', component: dropdownDemo },
      { path: '/n-popselect', component: popselectDemo },
      { path: '/n-app', component: appDemo },
      { path: '/n-cancel-mark-debug', component: cancelMarkDebug },
      { path: '/n-transfer', component: transferDemo },
      { path: '/n-spin', component: spinDemo },
      { path: '/n-drawer', component: drawerDemo },
      { path: '/n-loading-bar', component: loadingBarDemo },
      { path: '/n-time', component: timeDemo },
      { path: '/n-slider', component: sliderDemo },
      { path: '/n-tree', component: treeDemo },
      { path: '/n-vertical-align-debug', component: verticalAlignDebug }
    ]
  },
  {
    path: '/*',
    redirect: '/start'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  Vue.prototype.$NLoadingBar.start()
  next()
})

router.afterEach(function () {
  Vue.prototype.$NLoadingBar.finish()
})

export { Vue, router, i18n }
