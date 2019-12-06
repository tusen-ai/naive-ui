/* istanbul ignore file */
import ScrollBar from './src/Scrollbar.vue'

ScrollBar.install = function (Vue) {
  Vue.component(ScrollBar.name, ScrollBar)
}

export default ScrollBar
