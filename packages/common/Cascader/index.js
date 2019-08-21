/* istanbul ignore file */
import Cascader from './src/main.vue'

Cascader.install = function (Vue) {
  Vue.component(Cascader.name, Cascader)
}

export default Cascader
