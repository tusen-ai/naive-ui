/* istanbul ignore file */
import Time from './src/main.js'

Time.install = function (Vue) {
  Vue.component(Time.name, Time)
}

export default Time
