/* istanbul ignore file */
import Tag from './src/main.vue'

Tag.install = function (Vue) {
  Vue.component(Tag.name, Tag)
}

export default Tag
