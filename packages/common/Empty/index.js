/* istanbul ignore file */
import Empty from './src/main.vue'

Empty.install = function (Vue) {
  Vue.component(Empty.name, Empty)
}

export default Empty
