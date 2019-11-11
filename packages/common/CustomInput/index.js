/* istanbul ignore file */
import CustomInput from './src/main.vue'

CustomInput.install = function (Vue) {
  Vue.component(CustomInput.name, CustomInput)
  Vue.component('NCustomInput', CustomInput)
}

export default CustomInput
