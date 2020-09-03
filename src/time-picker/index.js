/* istanbul ignore file */
import Scaffold from './src/TimePicker.vue'

Scaffold.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Scaffold.name, Scaffold)
}

export default Scaffold
