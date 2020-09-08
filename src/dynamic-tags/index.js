/* istanbul ignore file */
import DynamicTags from './src/DynamicTags.vue'

DynamicTags.install = function (app, naive) {
  app.component(naive.componentPrefix + DynamicTags.name, DynamicTags)
}

export default DynamicTags
