/* istanbul ignore file */
import DynamicInput from './src/main.vue'

DynamicInput.install = function (Vue) {
  Vue.component(DynamicInput.name, DynamicInput)
  Vue.component('NDynamicInput', DynamicInput)
}

export default DynamicInput
