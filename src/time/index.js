/* istanbul ignore file */
import Time from './src/main.js'

Time.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Time.name, Time)
}

export default Time
