/* istanbul ignore file */
import Alert from './src/Alert.vue'

Alert.install = function (app, naive) {
  app.component(naive.componentPrefix + Alert.name, Alert)
}

export default Alert
