/* istanbul ignore file */
import Collapse from './src/Collapse.vue'
import CollapseItem from './src/CollapseItem.vue'

Collapse.install = function (app, naive) {
  app.component(naive.componentPrefix + Collapse.name, Collapse)
  app.component(naive.componentPrefix + CollapseItem.name, CollapseItem)
}

export default Collapse
