import Notification from './src/NotificationPlugin'
import { install } from '../_utils/naive/installThemeAwarableProperty'

Notification.install = function (Vue, naive) {
  Notification.Vue = Vue
  install(Vue, Notification, `$${naive.componentPrefix}Notification`)
}

export default Notification
