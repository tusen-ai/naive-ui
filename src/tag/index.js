/* istanbul ignore file */
import Tag from './src/Tag.vue'

Tag.install = function (app, naive) {
  app.component(naive.componentPrefix + Tag.name, Tag)
}

export default Tag
