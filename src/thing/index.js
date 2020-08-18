/* istanbul ignore file */
import Thing from './src/Thing.vue'

Thing.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Thing.name, Thing)
}

export default Thing
