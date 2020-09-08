/* istanbul ignore file */
import Time from './src/main.js'

Time.install = function (app, naive) {
  app.component(naive.componentPrefix + Time.name, Time)
}

export default Time
