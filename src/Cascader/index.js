/* istanbul ignore file */
import Cascader from './src/Cascader.vue'

Cascader.install = function (Vue) {
  Vue.component(Cascader.name, Cascader)
}

export default Cascader
