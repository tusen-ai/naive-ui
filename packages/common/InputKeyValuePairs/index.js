/* istanbul ignore file */
import InputKeyValuePairs from './src/main.vue'

InputKeyValuePairs.install = function (Vue) {
  Vue.component(InputKeyValuePairs.name, InputKeyValuePairs)
  Vue.component('NInputKeyValuePairs', InputKeyValuePairs)
}

export default InputKeyValuePairs
