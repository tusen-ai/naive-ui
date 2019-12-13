import ConfirmPlugin from './src/ConfirmPlugin.js'
import Confirm from './src/Confirm'
import { install } from '../../utils/installThemeAwarableProperty'

ConfirmPlugin.install = function (Vue) {
  ConfirmPlugin.Vue = Vue
  install(Vue, ConfirmPlugin, '$NConfirm')
  Vue.component(Confirm.name, Confirm)
  /** deprecated names */
  Vue.component('NNimbusConfirmCard', Confirm)
  install(Vue, ConfirmPlugin, '$NModal')
}

export default ConfirmPlugin
