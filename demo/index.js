import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import '../styles/index.scss'
import 'codemirror/lib/codemirror.css'
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
import RoundButton from 'packages/common/Button'
import Switch from '../packages/common/Switch'
import Input from '../packages/common/Input'
import Select from '../packages/common/Select'
import Modal from '../packages/common/Modal'
import Message from '../packages/common/Message'
import Tooltip from '../packages/common/Tooltip'
import Notification from '../packages/common/Notification'
import Pagination from '../packages/common/Pagination'

import ServiceCard from 'packages/nimbus/ServiceCard'
import HomeLayout from 'packages/nimbus/HomeLayout'
import Navbar from 'packages/nimbus/Navbar'
import ServiceLayout from 'packages/nimbus/ServiceLayout'
import NimbusFormCard from 'packages/nimbus/FormCard'
import NimbusConfirmCard from '../packages/nimbus/ConfirmCard'

import sideMenuDemo from './components/sideMenuDemo'
import homeDemo from './components/homeDemo'
import gradientTextDemo from './components/gradientTextDemo'
import iconDemo from './components/iconDemo'
import checkboxDemo from './components/checkboxDemo'
import buttonDemo from './components/buttonDemo'
import switchDemo from './components/switchDemo'
import tableDemo from './components/tableDemo'
import inputDemo from './components/inputDemo'
import selectDemo from './components/selectDemo'
import modalDemo from './components/modalDemo'
import nimbusFormCardDemo from './components/nimbusFormCardDemo'
import messageDemo from './components/messageDemo'
import tooltipDemo from './components/tooltipDemo'
import notificationDemo from './components/notificationDemo'
import nimbusConfirmCardDemo from './components/nimbusConfirmCardDemo'
import paginationDemo from './components/paginationDemo'
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
Input.install(Vue)
Select.install(Vue)
Modal.install(Vue)
NimbusFormCard.install(Vue)
Message.install(Vue)
Tooltip.install(Vue)
Notification.install(Vue)
NimbusConfirmCard.install(Vue)
Pagination.install(Vue)

const routes = [
  { path: '/',
    component: demo,
    children: [
      { path: '/n-nimbus-service-layout', component: sideMenuDemo },
      { path: '/n-nimbus-home-layout', component: homeDemo },
      { path: '/n-gradient-text', component: gradientTextDemo },
      { path: '/n-icon', component: iconDemo },
      { path: '/n-checkbox', component: checkboxDemo },
      { path: '/n-button', component: buttonDemo },
      { path: '/n-switch', component: switchDemo },
      { path: '/n-table', component: tableDemo },
      { path: '/n-input', component: inputDemo },
      { path: '/n-select', component: selectDemo },
      { path: '/n-modal', component: modalDemo },
      { path: '/n-nimbus-form-card', component: nimbusFormCardDemo },
      { path: '/n-message', component: messageDemo },
      { path: '/n-tooltip', component: tooltipDemo },
      { path: '/n-notification', component: notificationDemo },
      { path: '/n-nimbus-confirm-card', component: nimbusConfirmCardDemo },
      { path: '/n-pagination', component: paginationDemo }
    ]
  }
]

const router = new VueRouter({
  routes
})

;(new Vue({
  router
})).$mount('#app')
