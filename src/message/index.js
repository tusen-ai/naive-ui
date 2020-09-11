import MessageController from './src/MessageController'

MessageController.install = function (app, naive) {
  app.component(naive.componentPrefix + MessageController.name, MessageController)
}

export default MessageController
