import ConfirmPlugin from './src/ConfirmPlugin.js'
import Confirm from './src/Confirm'
import { install } from '../_utils/naive/installThemeAwarableProperty'

ConfirmPlugin.install = function (Vue, naive) {
  ConfirmPlugin.Vue = Vue
  install(Vue, ConfirmPlugin, '$NConfirm')
  Vue.component(naive.componentPrefix + Confirm.name, Confirm)
  /** deprecated names */
  Vue.component('NNimbusConfirmCard', Confirm)
  install(Vue, ConfirmPlugin, '$NModal')
}

export default ConfirmPlugin
