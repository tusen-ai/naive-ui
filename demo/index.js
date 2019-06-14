import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import '../styles/index.scss'
// import Demo from './demo.vue'
import Card from 'packages/common/Card'
import Icon from 'packages/common/Icon'
import Loader from 'packages/common/Loader'
import GradientText from 'packages/common/GradientText'
import ColumnGroup from 'packages/common/ColumnGroup'
import WithPadding from 'packages/common/WithPadding'
import WithMargin from 'packages/common/WithMargin'
import MasonryGroup from 'packages/common/MasonryGroup'
import Table from 'packages/common/Table'
import Checkbox from 'packages/common/Checkbox'
import RoundButton from 'packages/common/RoundButton'
import Switch from '../packages/common/Switch'

import ServiceCard from 'packages/nimbus/ServiceCard'
import HomeLayout from 'packages/nimbus/HomeLayout'
import Navbar from 'packages/nimbus/Navbar'
import ServiceLayout from 'packages/nimbus/ServiceLayout'

import sideMenuDemo from './components/sideMenuDemo'
import homeDemo from './components/homeDemo'
import gradientTextDemo from './components/gradientTextDemo'
import iconDemo from './components/iconDemo'
import checkboxDemo from './components/checkboxDemo'
import roundButtonDemo from './components/roundButtonDemo'
import switchDemo from './components/switchDemo'
import demo from './demo'

Vue.use(VueRouter)

Card.install(Vue)
Icon.install(Vue)
ServiceLayout.install(Vue)
Navbar.install(Vue)
Loader.install(Vue)
HomeLayout.install(Vue)
GradientText.install(Vue)
ColumnGroup.install(Vue)
WithPadding.install(Vue)
ServiceCard.install(Vue)
MasonryGroup.install(Vue)
Table.install(Vue)
WithMargin.install(Vue)
Checkbox.install(Vue)
RoundButton.install(Vue)
Switch.install(Vue)

const routes = [
  { path: '/', component: demo },
  { path: '/n-nimbus-service-layout', component: sideMenuDemo },
  { path: '/n-nimbus-home-layout', component: homeDemo },
  { path: '/n-gradient-text', component: gradientTextDemo },
  { path: '/n-icon', component: iconDemo },
  { path: '/n-checkbox', component: checkboxDemo },
  { path: '/n-round-button', component: roundButtonDemo },
  { path: '/n-switch', component: switchDemo }
]

const router = new VueRouter({
  routes
})

;(new Vue({
  router
})).$mount('#app')

console.log('...')
