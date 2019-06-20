import Notification from './src/main.js'

Notification.install = function (Vue) {
  Vue.prototype.$NNotification = Notification
}

export default Notification
