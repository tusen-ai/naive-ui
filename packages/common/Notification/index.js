import Notification from './src/main.js'

Notification.install = function (Vue) {
  Notification.Vue = Vue
  Vue.prototype.$NNotification = Notification
  Vue.prototype.$nNotify = Notification.notify
}

export default Notification
