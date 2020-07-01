/* istanbul ignore file */
import NInputNumber from './src/InputNumber.vue'

NInputNumber.install = function (Vue) {
  Vue.component(NInputNumber.name, NInputNumber)
}

export default NInputNumber
