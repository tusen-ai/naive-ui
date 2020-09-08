/* istanbul ignore file */
import InputNumber from './src/InputNumber.vue'

InputNumber.install = function (app, naive) {
  app.component(naive.componentPrefix + InputNumber.name, InputNumber)
}

export default InputNumber
