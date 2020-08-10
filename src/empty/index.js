/* istanbul ignore file */
import Empty from './src/Empty.vue'

Empty.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Empty.name, Empty)
}

export default Empty
