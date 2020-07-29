/* istanbul ignore file */
import Drawer from './src/Drawer.vue'

Drawer.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Drawer.name, Drawer)
}

export default Drawer
