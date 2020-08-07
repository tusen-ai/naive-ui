/* istanbul ignore file */
import NCode from './src/Code.vue'

NCode.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + NCode.name, NCode)
}

export default NCode
