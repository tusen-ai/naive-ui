/* istanbul ignore file */
import ScrollBar from './src/ScrollbarAdaptor.vue'

ScrollBar.install = function (Vue) {
  Vue.component(ScrollBar.name, ScrollBar)
}

export default ScrollBar
