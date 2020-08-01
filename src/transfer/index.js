/* istanbul ignore file */
import Transfer from './src/Transfer.vue'

Transfer.install = function (Vue) {
  Vue.component(Transfer.name, Transfer)
}

export default Transfer
