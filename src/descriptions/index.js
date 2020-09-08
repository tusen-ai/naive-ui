/* istanbul ignore file */
import Descriptions from './src/Descriptions.vue'
import DescriptionsItem from './src/DescriptionsItem.vue'

Descriptions.install = function (app, naive) {
  app.component(naive.componentPrefix + Descriptions.name, Descriptions)
  app.component(naive.componentPrefix + DescriptionsItem.name, DescriptionsItem)
}

export default Descriptions
