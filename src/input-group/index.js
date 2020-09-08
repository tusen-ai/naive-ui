/* istanbul ignore file */
import InputGroup from './src/InputGroup.vue'

InputGroup.install = function (app, naive) {
  app.component(naive.componentPrefix + InputGroup.name, InputGroup)
}

export default InputGroup
