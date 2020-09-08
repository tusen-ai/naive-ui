/* istanbul ignore file */
import Empty from './src/Empty.vue'

Empty.install = function (app, naive) {
  app.component(naive.componentPrefix + Empty.name, Empty)
}

export default Empty
