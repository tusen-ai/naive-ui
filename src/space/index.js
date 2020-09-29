/* istanbul ignore file */
import Space from './src/Space.js'

Space.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Space.name, Space)
}

export default Space
