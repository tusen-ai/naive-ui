/* istanbul ignore file */
import Empty from './src/Empty.vue'

Empty.install = function (Vue) {
  Vue.component(Empty.name, Empty)
}

export default Empty
