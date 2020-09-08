/* istanbul ignore file */
import Scaffold from './src/TimePicker.vue'

Scaffold.install = function (app, naive) {
  app.component(naive.componentPrefix + Scaffold.name, Scaffold)
}

export default Scaffold
