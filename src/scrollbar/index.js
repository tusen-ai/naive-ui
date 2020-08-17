/* istanbul ignore file */
import ScrollBar from './src/ScrollBar.vue'

ScrollBar.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + ScrollBar.name, ScrollBar)
}

export default ScrollBar
