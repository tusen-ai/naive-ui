/* istanbul ignore file */
import ConfigConsumer from './src/ConfigConsumer.vue'

ConfigConsumer.install = function (app, naive) {
  app.component(naive.componentPrefix + ConfigConsumer.name, ConfigConsumer)
}

export default ConfigConsumer
