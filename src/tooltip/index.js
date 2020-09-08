import Tooltip from './src/main.js'

Tooltip.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Tooltip.name, Tooltip)
}

export default Tooltip
