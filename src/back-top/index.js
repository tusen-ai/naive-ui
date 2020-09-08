/* istanbul ignore file */
import BackTop from './src/BackTop.vue'

BackTop.install = function (app, naive) {
  app.component(naive.componentPrefix + BackTop.name, BackTop)
}

export default BackTop
