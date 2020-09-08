/* istanbul ignore file */
import Descriptions from './src/Descriptions.vue'
import DescriptionsItem from './src/DescriptionsItem.vue'

Descriptions.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Descriptions.name, Descriptions)
  Vue.component(naive.componentPrefix + DescriptionsItem.name, DescriptionsItem)
}

export default Descriptions
