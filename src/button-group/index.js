/* istanbul ignore file */
import ButtonGroup from './src/ButtonGroup'

ButtonGroup.install = function (app, naive) {
  app.component(naive.componentPrefix + ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup
