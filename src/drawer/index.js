/* istanbul ignore file */
import Drawer from './src/Drawer.vue'

Drawer.install = function (app, naive) {
  app.component(naive.componentPrefix + Drawer.name, Drawer)
}

export default Drawer
