/* istanbul ignore file */
import Statistic from './src/Statistic.vue'

Statistic.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Statistic.name, Statistic)
}

export default Statistic
