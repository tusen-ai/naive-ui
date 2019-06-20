import Tooltip from './src/main.vue'

Tooltip.install = function (Vue) {
  Vue.component(Tooltip.name, Tooltip)
}

export default Tooltip
