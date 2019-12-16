import MessagePlugin from './src/MessagePlugin'
import { install } from '../../utils/installThemeAwarableProperty'

MessagePlugin.install = function (Vue) {
  MessagePlugin.Vue = Vue
  install(Vue, MessagePlugin, '$NMessage')
}

export default MessagePlugin
