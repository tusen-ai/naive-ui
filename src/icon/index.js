/* istanbul ignore file */
import Icon from './src/Icon.vue'

export default {
  install (app, naive) {
    app.component(naive.componentPrefix + Icon.name, Icon)
  }
}
