/* istanbul ignore file */
import Tag from './src/Tag.vue'
import DynamicTags from './src/DynamicTags.vue'

Tag.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Tag.name, Tag)
  Vue.component(naive.componentPrefix + DynamicTags.name, DynamicTags)
}

export default Tag
