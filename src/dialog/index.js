import Dialog from './src/Dialog'
import DialogProvider from './src/DialogProvider'

DialogProvider.install = function (app, naive) {
  app.component(naive.componentPrefix + DialogProvider.name, DialogProvider)
  app.component(naive.componentPrefix + Dialog.name, Dialog)
  // deprecated
  app.component('NNimbusConfirmCard', Dialog)
  app.component(naive.componentPrefix + 'Confirm', Dialog)
}

export default DialogProvider
