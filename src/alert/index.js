/* istanbul ignore file */
import Alert from './src/main.vue'

Alert.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Alert.name, Alert)
}

export default Alert
