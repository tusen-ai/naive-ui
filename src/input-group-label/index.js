/* istanbul ignore file */
import InputGroupLabel from './src/InputGroupLabel.vue'

InputGroupLabel.install = function (app, naive) {
  app.component(naive.componentPrefix + InputGroupLabel.name, InputGroupLabel)
}

export default InputGroupLabel
