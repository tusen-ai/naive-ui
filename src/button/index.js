/* istanbul ignore file */
import Button from './src/Button.vue'

Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

export default Button
