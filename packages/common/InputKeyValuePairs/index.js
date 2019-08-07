/* istanbul ignore file */
import InputKeyValuePairs from './src/main.vue'

InputKeyValuePairs.install = function (Vue) {
  Vue.component(InputKeyValuePairs.name, InputKeyValuePairs)
}

export default InputKeyValuePairs
