/* istanbul ignore file */
import Thing from './src/Thing.vue'

Thing.install = function (app, naive) {
  app.component(naive.componentPrefix + Thing.name, Thing)
}

export default Thing
