import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import '../styles/index.scss'
// import Demo from './demo.vue'
import Card from 'packages/common/Card'
import Icon from 'packages/common/Icon'
import Loader from 'packages/common/Loader'
import GradientHeader from 'packages/common/GradientHeader'
import ColumnGroup from 'packages/common/ColumnGroup'
import WithPadding from 'packages/common/WithPadding'
import MasonryGroup from 'packages/common/MasonryGroup'

import ServiceCard from 'packages/nimbus/ServiceCard'
import HomeLayout from 'packages/nimbus/HomeLayout'
import Navbar from 'packages/nimbus/Navbar'
import ServiceLayout from 'packages/nimbus/ServiceLayout'

import sideMenuDemo from './components/sideMenuDemo'
import homeDemo from './components/homeDemo'

Vue.use(VueRouter)

Card.install(Vue)
Icon.install(Vue)
ServiceLayout.install(Vue)
Navbar.install(Vue)
Loader.install(Vue)
HomeLayout.install(Vue)
GradientHeader.install(Vue)
ColumnGroup.install(Vue)
WithPadding.install(Vue)
ServiceCard.install(Vue)
MasonryGroup.install(Vue)

const routes = [
  { path: '/sidemenu', component: sideMenuDemo },
  { path: '/', component: homeDemo }
]

const router = new VueRouter({
  routes
})

;(new Vue({
  router
})).$mount('#app')

console.log('...')
