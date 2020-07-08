/* istanbul ignore file */
import Input from './src/Input.vue'

Input.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Input.name, Input)
}

export default Input
