/* istanbul ignore file */
import Icon from './src/Icon.vue'

Icon.install = function (app, naive) {
  app.component(naive.componentPrefix + Icon.name, Icon)
}

export default Icon
