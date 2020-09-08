/* istanbul ignore file */
import Input from './src/Input.vue'

Input.install = function (app, naive) {
  app.component(naive.componentPrefix + Input.name, Input)
}

export default Input
