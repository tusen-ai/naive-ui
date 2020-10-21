/* istanbul ignore file */
import Icon from './src/Icon.js'

Icon.install = function (app, naive) {
  app.component(naive.componentPrefix + Icon.name, Icon)
}

export default Icon
