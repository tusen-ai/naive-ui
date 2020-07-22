/* istanbul ignore file */
import ConfigConsumer from './src/ConfigConsumer.vue'

ConfigConsumer.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + ConfigConsumer.name, ConfigConsumer)
}

export default ConfigConsumer
