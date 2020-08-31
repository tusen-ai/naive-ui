import MessagePlugin from './src/MessagePlugin'
import { install } from '../_utils/naive/installThemeAwarableProperty'

MessagePlugin.install = function (Vue, naive) {
  MessagePlugin.Vue = Vue
  install(Vue, MessagePlugin, `$${naive.componentPrefix}Message`)
}

export default MessagePlugin
