import NotificationProvider from './src/NotificationProvider'

Notification.install = function (app, naive) {
  app.component(naive.componentPrefix + NotificationProvider.name, NotificationProvider)
}

export default Notification
