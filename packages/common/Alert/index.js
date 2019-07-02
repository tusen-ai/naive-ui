/* istanbul ignore file */
import Alert from './src/main.vue'

Alert.install = function (Vue) {
  Vue.component(Alert.name, Alert)
}

export default Alert
