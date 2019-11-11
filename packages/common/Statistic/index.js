/* istanbul ignore file */
import Statistic from './src/main.vue'

Statistic.install = function (Vue) {
  Vue.component(Statistic.name, Statistic)
}

export default Statistic
