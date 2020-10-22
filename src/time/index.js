/* istanbul ignore file */
import Time from './src/Time.js'

Time.install = function (app, naive) {
  app.component(naive.componentPrefix + Time.name, Time)
}

export default Time
