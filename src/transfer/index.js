/* istanbul ignore file */
import Transfer from './src/Transfer.vue'

Transfer.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Transfer.name, Transfer)
}

export default Transfer
