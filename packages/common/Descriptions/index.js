/* istanbul ignore file */
import Descriptions from './src/main.vue'
import DescriptionsItem from './src/DescriptionsItem.vue'

Descriptions.install = function (Vue) {
  Vue.component(Descriptions.name, Descriptions)
  Vue.component(DescriptionsItem.name, DescriptionsItem)
}

export default Descriptions
