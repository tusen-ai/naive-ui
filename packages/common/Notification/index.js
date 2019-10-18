import Notification from './src/main.js'

Notification.install = function(Vue) {
  Vue.prototype.$NNotification = Notification
  Vue.prototype.$nNotify = Notification.notify
}

export default Notification
