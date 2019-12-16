/* istanbul ignore file */
import ScrollBar from './src/main.vue'

ScrollBar.install = function (Vue) {
  Vue.component(ScrollBar.name, ScrollBar)
}

export default ScrollBar
