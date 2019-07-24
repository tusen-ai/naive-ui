import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import '../styles/index.scss'
import 'codemirror/lib/codemirror.css'
import NaiveUI from '../index'
import SourceBlock from './SourceBlock'

import nimbusServiceLayoutDemo from './components/nimbusServiceLayoutDemo'
import homeDemo from './components/homeDemo'
import gradientTextDemo from './components/gradientTextDemo'
import iconDemo from './components/iconDemo'
import checkboxDemo from './components/checkboxDemo'
import buttonDemo from './components/buttonDemo'
import switchDemo from './components/switchDemo'
import tableDemo from './components/tableDemo'
import advanceTableDemo from './components/advanceTableDemo'
import inputDemo from './components/inputDemo'
import selectDemo from './components/selectDemo'
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
import timePickerDemo from './components/timePickerDemo'

import notificationDemo from './components/notificationDemo'
import nimbusConfirmCardDemo from './components/nimbusConfirmCardDemo'
import paginationDemo from './components/paginationDemo'
import startPage from './components/startPage'
import demo from './demo'

import popoverDebug from './debugComponents/popoverDebug'

Vue.use(NaiveUI)
Vue.use(VueRouter)

Vue.component(SourceBlock.name, SourceBlock)

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
      { path: '/n-advance-table', component: advanceTableDemo },
      { path: '/n-input', component: inputDemo },
      { path: '/n-select', component: selectDemo },
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
      { path: '/n-time-picker', component: timePickerDemo }
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

new Vue({
  router
}).$mount('#app')
