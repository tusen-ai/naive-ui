/* istanbul ignore file */
import InputGroup from './src/InputGroup.vue'
import InpugGroupLabel from './src/InputGroupLabel.vue'

InputGroup.install = function (Vue) {
  Vue.component(InputGroup.name, InputGroup)
  Vue.component(InpugGroupLabel.name, InpugGroupLabel)
}

export default InputGroup
