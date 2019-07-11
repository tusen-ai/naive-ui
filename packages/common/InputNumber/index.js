/* istanbul ignore file */
import NInputNumber from './src/main.vue'

NInputNumber.install = function (Vue) {
  Vue.component(NInputNumber.name, NInputNumber)
}

export default NInputNumber
