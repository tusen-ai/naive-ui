/* istanbul ignore file */
import Thing from './src/main.vue'

Thing.install = function (Vue) {
  Vue.component(Thing.name, Thing)
}

export default Thing
