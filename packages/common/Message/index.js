import Message from './src/main.js'
import install from '../../utils/installThemeableComponent'

Message.install = function (Vue) {
  Message.Vue = Vue
  install(Vue, Message, '$NMessage')
}

export default Message
