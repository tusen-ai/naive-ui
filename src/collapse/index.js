/* istanbul ignore file */
import Collapse from './src/Collapse.vue'
import CollapseItem from './src/CollapseItem.vue'

Collapse.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Collapse.name, Collapse)
  Vue.component(naive.componentPrefix + CollapseItem.name, CollapseItem)
}

export default Collapse
