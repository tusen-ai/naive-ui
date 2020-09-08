import Notification from './src/NotificationPlugin'
import { install } from '../_utils/naive/installThemeAwarableProperty'

Notification.install = function (app, naive) {
  Notification.Vue = app
  install(app, Notification, `$${naive.componentPrefix}Notification`)
}

export default Notification
