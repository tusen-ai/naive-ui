import ConfirmPlugin from './src/ConfirmPlugin.js'
import Confirm from './src/Confirm'
import { install } from '../../utils/installThemeAwarableProperty'

ConfirmPlugin.install = function (Vue) {
  ConfirmPlugin.Vue = Vue
  install(Vue, ConfirmPlugin, '$NModal')
  Vue.component(Confirm.name, Confirm)
  Vue.component('NNimbusConfirmCard', Confirm)
}

export default ConfirmPlugin
