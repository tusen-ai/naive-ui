/* istanbul ignore file */
import Rate from './src/Rate.vue'

Rate.install = function (app, naive) {
  app.component(naive.componentPrefix + Rate.name, Rate)
}

export default Rate
