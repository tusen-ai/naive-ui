/* istanbul ignore file */
import Drawer from './src/main.vue'

Drawer.install = function (Vue) {
  Vue.component(Drawer.name, Drawer)
}

export default Drawer
