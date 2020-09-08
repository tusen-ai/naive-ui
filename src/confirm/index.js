import ConfirmPlugin from './src/ConfirmPlugin.js'
import Confirm from './src/Confirm'
import { install } from '../_utils/naive/installThemeAwarableProperty'

ConfirmPlugin.install = function (app, naive) {
  ConfirmPlugin.Vue = app
  install(app, ConfirmPlugin, '$NConfirm')
  app.component(naive.componentPrefix + Confirm.name, Confirm)
  /** deprecated names */
  app.component('NNimbusConfirmCard', Confirm)
  install(app, ConfirmPlugin, '$NModal')
}

export default ConfirmPlugin
