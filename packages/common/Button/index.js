/* istanbul ignore file */
import Button from './src/main.vue'
import ButtonGroup from './src/ButtonGroup'

Button.install = function (Vue) {
  Vue.component(Button.name, Button)
  Vue.component(ButtonGroup.name, ButtonGroup)
}

export default Button
