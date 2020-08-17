/* istanbul ignore file */
import Cascader from './src/Cascader.vue'

Cascader.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Cascader.name, Cascader)
}

export default Cascader
