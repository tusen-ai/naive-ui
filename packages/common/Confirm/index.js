import Confirm from './src/index.js'
import { install } from '../../utils/installThemeAwarableProperty'

Confirm.install = function (Vue) {
  Confirm.Vue = Vue
  install(Vue, Confirm, '$NModal')
}

export default Confirm
