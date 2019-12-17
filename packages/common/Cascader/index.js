/* istanbul ignore file */
import Cascader from './src/CascaderAdapter.vue'

Cascader.install = function (Vue) {
  Vue.component(Cascader.name, Cascader)
}

export default Cascader
