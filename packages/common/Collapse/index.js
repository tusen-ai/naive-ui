/* istanbul ignore file */
import Collapse from './src/Collapse.vue'
import CollapseItem from './src/CollapseItem.vue'

Collapse.install = function (Vue) {
  Vue.component(Collapse.name, Collapse)
  Vue.component(CollapseItem.name, CollapseItem)
}

export default Collapse
