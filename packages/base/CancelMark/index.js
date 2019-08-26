/* istanbul ignore file */
import CancelMark from './src/main.vue'

CancelMark.install = function (Vue) {
  Vue.component(CancelMark.name, CancelMark)
}

export default CancelMark
