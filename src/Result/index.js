/* istanbul ignore file */
import Result from './src/main.vue'

Result.install = function (Vue) {
  Vue.component(Result.name, Result)
}

export default Result
