import Notification from './src/main.js'
import { install } from '../../utils/installThemeAwarableProperty'

Notification.install = function (Vue) {
  Notification.Vue = Vue
  install(Vue, Notification, '$NNotification')
}

export default Notification
