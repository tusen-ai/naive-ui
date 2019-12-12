import Notification from './src/NotificationPlugin'
import { install } from '../../utils/installThemeAwarableProperty'

Notification.install = function (Vue) {
  Notification.Vue = Vue
  install(Vue, Notification, '$NNotification')
}

export default Notification
