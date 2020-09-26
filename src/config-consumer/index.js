/* istanbul ignore file */
import ConfigConsumer from './src/ConfigConsumer.js'

ConfigConsumer.install = function (app, naive) {
  app.component(naive.componentPrefix + ConfigConsumer.name, ConfigConsumer)
}

export default ConfigConsumer
