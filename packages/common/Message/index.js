import Message from './src/main.js'

Message.install = function (Vue) {
  Vue.prototype.$NMessage = Message
}

export default Message
