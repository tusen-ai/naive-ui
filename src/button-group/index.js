/* istanbul ignore file */
import ButtonGroup from './src/ButtonGroup'

ButtonGroup.install = function (Vue) {
  Vue.component(ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup
