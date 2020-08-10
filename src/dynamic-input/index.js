/* istanbul ignore file */
import DynamicInput from './src/DynamicInput.vue'

DynamicInput.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + DynamicInput.name, DynamicInput)
}

export default DynamicInput
