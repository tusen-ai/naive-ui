/* istanbul ignore file */
import Input from './src/Input.vue'
import InputGroup from './src/InputGroup.vue'

Input.install = function (Vue) {
  Vue.component(Input.name, Input)
  Vue.component(InputGroup.name, InputGroup)
}

export default Input
