import MessagePlugin from './src/MessagePlugin'
import { install } from '../_utils/naive/installThemeAwarableProperty'

MessagePlugin.install = function (app, naive) {
  MessagePlugin.Vue = app
  install(app, MessagePlugin, `$${naive.componentPrefix}Message`)
}

export default MessagePlugin
