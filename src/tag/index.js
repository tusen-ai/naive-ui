/* istanbul ignore file */
import Tag from './src/Tag.vue'

Tag.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Tag.name, Tag)
}

export default Tag
