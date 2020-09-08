/* istanbul ignore file */
import Button from './src/Button.vue'

Button.install = function (app, naive) {
  app.component(naive.componentPrefix + Button.name, Button)
}

export default Button
