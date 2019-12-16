/* istanbul ignore file */
import NCode from './src/main.vue'

NCode.install = function (Vue) {
  Vue.component(NCode.name, NCode)
}

export default NCode
