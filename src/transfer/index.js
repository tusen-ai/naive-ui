/* istanbul ignore file */
import Transfer from './src/Transfer.vue'

Transfer.install = function (app, naive) {
  app.component(naive.componentPrefix + Transfer.name, Transfer)
}

export default Transfer
