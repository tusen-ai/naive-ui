/* istanbul ignore file */
import TimePicker from './src/TimePicker.vue'

TimePicker.install = function (app, naive) {
  app.component(naive.componentPrefix + TimePicker.name, TimePicker)
}

export default TimePicker
