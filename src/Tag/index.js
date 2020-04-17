/* istanbul ignore file */
import Tag from './src/main.vue'
import DynamicTags from './src/DynamicTags.vue'

Tag.install = function (Vue) {
  Vue.component(Tag.name, Tag)
  Vue.component(DynamicTags.name, DynamicTags)
}

export default Tag
