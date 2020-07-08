/* istanbul ignore file */
import InputNumber from './src/InputNumber.vue'

InputNumber.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + InputNumber.name, InputNumber)
}

export default InputNumber
