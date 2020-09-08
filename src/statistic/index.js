/* istanbul ignore file */
import Statistic from './src/Statistic.vue'

Statistic.install = function (app, naive) {
  app.component(naive.componentPrefix + Statistic.name, Statistic)
}

export default Statistic
