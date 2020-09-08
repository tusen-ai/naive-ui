/* istanbul ignore file */
import ScrollBar from './src/ScrollBar.vue'

ScrollBar.install = function (app, naive) {
  app.component(naive.componentPrefix + ScrollBar.name, ScrollBar)
}

export default ScrollBar
