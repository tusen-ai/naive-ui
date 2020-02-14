import Notification from './src/NotificationPlugin'
import { install } from '../_utils/naive/installThemeAwarableProperty'

Notification.install = function (Vue) {
  Notification.Vue = Vue
  install(Vue, Notification, '$NNotification')
}

export default Notification
