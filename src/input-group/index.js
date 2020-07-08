/* istanbul ignore file */
import InputGroup from './src/InputGroup.vue'

InputGroup.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + InputGroup.name, InputGroup)
}

export default InputGroup
