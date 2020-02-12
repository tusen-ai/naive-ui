import Tooltip from './src/main.js'

Tooltip.install = function (Vue) {
  Vue.component(Tooltip.name, Tooltip)
}

export default Tooltip
