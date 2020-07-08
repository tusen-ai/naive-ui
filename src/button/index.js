/* istanbul ignore file */
import Button from './src/Button.vue'

Button.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Button.name, Button)
}

export default Button
