/* istanbul ignore file */
import Popconfirm from './src/Popconfirm.vue'

Popconfirm.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Popconfirm.name, Popconfirm)
}

export default Popconfirm
