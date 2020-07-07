/* istanbul ignore file */
import InputGroup from './src/InputGroup.vue'

InputGroup.install = function (Vue) {
  Vue.component(InputGroup.name, InputGroup)
}

export default InputGroup
