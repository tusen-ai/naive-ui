/* istanbul ignore file */
import Result from './src/Result.vue'

Result.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Result.name, Result)
}

export default Result
