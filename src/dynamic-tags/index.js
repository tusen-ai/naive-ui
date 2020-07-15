/* istanbul ignore file */
import DynamicTags from './src/DynamicTags.vue'

DynamicTags.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + DynamicTags.name, DynamicTags)
}

export default DynamicTags
