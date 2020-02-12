/* istanbul ignore file */
import Input from './src/Input.vue'
import InputGroup from './src/InputGroup.vue'
import InpugGroupLabel from './src/InputGroupLabel.vue'

Input.install = function (Vue) {
  Vue.component(Input.name, Input)
  Vue.component(InputGroup.name, InputGroup)
  Vue.component(InpugGroupLabel.name, InpugGroupLabel)
}

export default Input
