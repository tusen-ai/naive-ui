/* istanbul ignore file */
import Popconfirm from './src/Popconfirm.vue'

Popconfirm.install = function (Vue) {
  Vue.component(Popconfirm.name, Popconfirm)
}

export default Popconfirm
