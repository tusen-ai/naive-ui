import MessagePrivider from './src/MessageProvider'

MessagePrivider.install = function (app, naive) {
  app.component(naive.componentPrefix + MessagePrivider.name, MessagePrivider)
}

export default MessagePrivider
